# Codex instructions for this repository

## Article and RSS workflow

Before every `git push` from this repository, check whether the pending changes
touch any of these paths:

- `content/articles/`
- `app/articles.ts`
- `app/insights/`
- `public/rss.xml`
- `scripts/article-utils.mjs`
- `scripts/new-article.mjs`
- `scripts/sync-articles.mjs`
- article, post, insight, or RSS copy elsewhere

If yes, use the `jarkko-articles` Codex skill before committing or pushing.
Follow its Markdown article, RSS sync, validation, commit, and push workflow.
For article intake from PDF or Markdown, the default flow is: create the raw
draft, invoke `jarkko-article-editor`, publish the reviewed article, run the
build, commit, and push. Stop at draft only when the user explicitly asks for
draft-only or review-only work.

Do not add articles by editing `app/site.tsx`; article content belongs in
Markdown files under `content/articles/`.

For unrelated pushes, explicitly confirm that the `jarkko-articles` skill was
checked and is not applicable.

## Local repository hygiene

Do not add or remove the untracked nested `jarkko/` directory unless the user
explicitly asks for cleanup. It is unrelated to the website source.
