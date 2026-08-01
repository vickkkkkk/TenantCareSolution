import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/breadcrumb";

async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug }, include: { author: true, postCategory: true } });
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({ select: { slug: true } });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog`,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { images: post.coverImage ? [post.coverImage] : [`/api/og?title=${encodeURIComponent(post.title)}`] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await prisma.post.findMany({
    where: { published: true, id: { not: post.id }, categoryId: post.categoryId },
    take: 3,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
  };

  const paragraphs = post.content.split("\n\n");

  return (
    <main className="flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />

      <article className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 grid md:grid-cols-[1fr_240px] gap-12">
        <div>
          <p className="text-xs font-data uppercase text-moss mb-2">{post.postCategory?.name}</p>
          <h1 className="text-3xl md:text-4xl mb-4">{post.title}</h1>
          <p className="text-sm text-moss mb-8">
            By {post.author.name} &middot; {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("en-GB")}
          </p>
          {post.coverImage && (
            <div className="relative aspect-16/9 rounded-lg overflow-hidden mb-8">
              <Image src={post.coverImage} alt="" fill className="object-cover" />
            </div>
          )}
          <div className="max-w-[68ch] flex flex-col gap-4 text-ink/90 text-lg">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>

        <aside className="hidden md:block">
          <div className="sticky top-24">
            <p className="text-xs font-data uppercase tracking-wide text-moss mb-3">Related posts</p>
            <div className="flex flex-col gap-4">
              {related.map((r) => (
                <a key={r.slug} href={`/blog/${r.slug}`} className="text-sm hover:text-evergreen">
                  {r.title}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </article>
    </main>
  );
}
