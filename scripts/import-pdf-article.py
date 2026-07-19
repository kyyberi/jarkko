#!/usr/bin/env python3
"""Create an article Markdown draft from a PDF export."""

from __future__ import annotations

import argparse
import re
import shutil
import sys
from datetime import date
from pathlib import Path


ROOT = Path.cwd()
ARTICLES_DIR = ROOT / "content" / "articles"
ARTICLE_IMAGES_DIR = ROOT / "public" / "images" / "articles"


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Extract text from a PDF and create a Markdown article draft.",
    )
    parser.add_argument("pdf", type=Path, help="PDF file to import")
    parser.add_argument("--title", help="Article title. Inferred when omitted.")
    parser.add_argument("--date", default=date.today().isoformat(), help="YYYY-MM-DD")
    parser.add_argument("--category", default="Data products")
    parser.add_argument("--summary", help="One-sentence article summary.")
    parser.add_argument("--slug", help="Article slug. Inferred from title when omitted.")
    parser.add_argument(
        "--image",
        action="append",
        default=[],
        type=Path,
        help="Illustration file to copy into public/images/articles/<slug>/",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite an existing Markdown draft.",
    )
    args = parser.parse_args()

    if not args.pdf.exists():
        raise SystemExit(f"PDF not found: {args.pdf}")

    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", args.date):
        raise SystemExit("--date must use YYYY-MM-DD")

    try:
        from pypdf import PdfReader
    except ModuleNotFoundError as error:
        raise SystemExit(
            "Missing Python package pypdf. Install with: python3 -m pip install pypdf"
        ) from error

    raw_text = extract_text(args.pdf, PdfReader)
    lines = clean_lines(raw_text.splitlines())
    title = args.title or infer_title(lines)
    slug = args.slug or slugify(title)
    summary = args.summary or infer_summary(lines, title)
    body = build_body(lines, title, summary)

    if not title:
        raise SystemExit("Could not infer title. Provide --title.")
    if not summary:
        raise SystemExit("Could not infer summary. Provide --summary.")

    article_path = ARTICLES_DIR / f"{slug}.md"
    if article_path.exists() and not args.force:
        raise SystemExit(f"Article already exists: {article_path}")

    image_names = copy_images(slug, args.image)
    markdown = render_markdown(
        title=title,
        iso_date=args.date,
        category=args.category,
        summary=summary,
        status="draft",
        body=body,
        image_names=image_names,
    )

    ARTICLES_DIR.mkdir(parents=True, exist_ok=True)
    article_path.write_text(markdown, encoding="utf-8")
    print(article_path)
    if image_names:
        print(f"Copied {len(image_names)} image(s) to {ARTICLE_IMAGES_DIR / slug}")
    print("Review the draft, place image blocks at the intended paragraphs, then validate.")
    return 0


def extract_text(pdf_path: Path, pdf_reader: object) -> str:
    reader = pdf_reader(str(pdf_path))
    return "\n".join(page.extract_text() or "" for page in reader.pages)


def clean_lines(lines: list[str]) -> list[str]:
    cleaned: list[str] = []
    for line in lines:
        value = normalize_text(line.strip())
        if not value or is_medium_chrome(value):
            continue
        cleaned.append(value)
    return cleaned


def normalize_text(value: str) -> str:
    return (
        value.replace("\u2018", "'")
        .replace("\u2019", "'")
        .replace("\u201c", '"')
        .replace("\u201d", '"')
        .replace("\u2013", "-")
        .replace("\u2014", "-")
        .replace("\u2026", "...")
        .replace("\xa0", " ")
    )


def is_medium_chrome(value: str) -> bool:
    chrome_patterns = [
        r"^Maysano\s*.\s*Following$",
        r"^Member-only story$",
        r"^Dr\. Jarkko Moilanen$",
        r"^\d+\s+min read\b",
        r"^Listen Share More$",
        r"^Open in app$",
        r"^Golden Data Product Portfolio\..*https://medium\.com/",
        r"^\d+ of \d+ \d{2}/\d{2}/\d{4}, \d{1,2}:\d{2}$",
    ]
    return any(re.search(pattern, value) for pattern in chrome_patterns)


def infer_title(lines: list[str]) -> str:
    for line in lines:
        if len(line) <= 90 and not line.endswith("."):
            return line
    return ""


def infer_summary(lines: list[str], title: str) -> str:
    for line in lines:
        if line == title:
            continue
        if len(line) > 40 and line.endswith("."):
            return line
    return ""


def build_body(lines: list[str], title: str, summary: str) -> list[str]:
    body: list[str] = []
    skip_values = {title, summary}
    pending = ""

    for line in lines:
        if line in skip_values:
            continue
        if is_reference_line(line):
            pending = append_line(pending, line)
            body.append(pending)
            pending = ""
            continue
        if is_heading(line):
            if pending:
                body.append(pending)
                pending = ""
            body.append(f"## {line}")
            continue
        pending = append_line(pending, line)
        if sentence_complete(line):
            body.append(pending)
            pending = ""

    if pending:
        body.append(pending)

    return body


def append_line(current: str, line: str) -> str:
    if not current:
        return line
    if current.endswith("-"):
        return f"{current[:-1]}{line}"
    return f"{current} {line}"


def is_reference_line(line: str) -> bool:
    return bool(re.search(r"\[[^\]]+\]$", line))


def is_heading(line: str) -> bool:
    if len(line) > 86 or line.endswith("."):
        return False
    words = line.split()
    if len(words) < 3 or len(words) > 9:
        return False
    lowercase_words = sum(1 for word in words if word[:1].islower())
    return lowercase_words <= 2


def sentence_complete(line: str) -> bool:
    return line.endswith((".", "?", "!", "]"))


def copy_images(slug: str, images: list[Path]) -> list[str]:
    if not images:
        return []

    target_dir = ARTICLE_IMAGES_DIR / slug
    target_dir.mkdir(parents=True, exist_ok=True)

    names: list[str] = []
    for image in images:
        if not image.exists():
            raise SystemExit(f"Image not found: {image}")
        safe_name = slugify(image.stem) + image.suffix.lower()
        shutil.copy2(image, target_dir / safe_name)
        names.append(safe_name)
    return names


def render_markdown(
    *,
    title: str,
    iso_date: str,
    category: str,
    summary: str,
    status: str,
    body: list[str],
    image_names: list[str],
) -> str:
    frontmatter = [
        "---",
        f"title: {title}",
        f"date: {iso_date}",
        f"category: {category}",
        f"summary: {summary}",
        f"status: {status}",
        "---",
    ]
    sections = ["\n".join(frontmatter), *body]

    if image_names:
        sections.extend(
            [
                "<!-- Move these image blocks to the right article positions. -->",
                *[
                    f'![Describe this illustration]({name} "Optional caption")'
                    for name in image_names
                ],
            ]
        )

    return "\n\n".join(sections).strip() + "\n"


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "article"


if __name__ == "__main__":
    sys.exit(main())
