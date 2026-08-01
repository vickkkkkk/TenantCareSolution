import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Blog | Tenant Care Solution",
  description: "Guides, market updates and landlord tips from the Tenant Care Solution team.",
  alternates: { canonical: "/blog" },
  openGraph: { images: ["/api/og?title=Blog"] },
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const page = Number(sp.page ?? "1");
  const perPage = 9;

  const where = sp.category ? { published: true, postCategory: { slug: sp.category } } : { published: true };

  const [posts, categories, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
      include: { postCategory: true, author: true },
    }),
    prisma.postCategory.findMany({ orderBy: { name: "asc" } }),
    prisma.post.count({ where }),
  ]);

  const [featured, ...rest] = posts;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <main className="flex-1">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl mb-6">Blog</h1>

        <div className="flex flex-wrap gap-2 mb-12 md:mb-16">
          <Link
            href="/blog"
            className={`text-sm px-3 py-1.5 rounded-[var(--radius-card)] border ${!sp.category ? "bg-evergreen text-bone border-evergreen" : "border-sand text-moss hover:border-evergreen"}`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/blog?category=${c.slug}`}
              className={`text-sm px-3 py-1.5 rounded-[var(--radius-card)] border ${sp.category === c.slug ? "bg-evergreen text-bone border-evergreen" : "border-sand text-moss hover:border-evergreen"}`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {featured && !sp.category && page === 1 && (
          <Link href={`/blog/${featured.slug}`} className="grid md:grid-cols-2 gap-6 mb-12 rounded-lg border border-sand overflow-hidden bg-white">
            <div className="relative aspect-16/9 md:aspect-auto">
              {featured.coverImage && <Image src={featured.coverImage} alt="" fill className="object-cover" />}
            </div>
            <div className="p-6 flex flex-col justify-center">
              <p className="text-xs font-data uppercase text-moss mb-2">{featured.postCategory?.name}</p>
              <h2 className="text-2xl font-display mb-2">{featured.title}</h2>
              <p className="text-moss text-sm">{featured.excerpt}</p>
            </div>
          </Link>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(sp.category || page > 1 ? posts : rest).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-lg border border-sand bg-white overflow-hidden hover:border-evergreen transition-colors">
              <div className="relative aspect-4/3">
                {post.coverImage && <Image src={post.coverImage} alt="" fill className="object-cover" />}
              </div>
              <div className="p-4">
                <p className="text-xs font-data uppercase text-moss mb-1.5">{post.postCategory?.name}</p>
                <h3 className="font-display text-base line-clamp-2 mb-1.5">{post.title}</h3>
                <p className="text-sm text-moss line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blog?${sp.category ? `category=${sp.category}&` : ""}page=${p}`}
                className={`size-9 flex items-center justify-center rounded-[var(--radius-card)] border font-data text-sm ${p === page ? "bg-evergreen text-bone border-evergreen" : "border-sand hover:border-evergreen"}`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
