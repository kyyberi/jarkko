import { redirect } from "next/navigation";
import { getArticles } from "../../../article-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export default async function OldArticleDetail({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/articles/${slug}`);
}
