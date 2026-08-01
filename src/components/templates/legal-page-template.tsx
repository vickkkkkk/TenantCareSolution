import { Breadcrumb, type Crumb } from "@/components/breadcrumb";

export type LegalSection = { id: string; heading: string; body: string[] };

export type LegalPageContent = {
  breadcrumb: Crumb[];
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export function LegalPageTemplate({ content }: { content: LegalPageContent }) {
  const { breadcrumb, title, lastUpdated, sections } = content;

  return (
    <main className="flex-1">
      <Breadcrumb items={breadcrumb} />
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl mb-2">{title}</h1>
        <p className="text-sm text-moss mb-12 md:mb-16">Last updated {lastUpdated}</p>

        <div className="grid md:grid-cols-[220px_1fr] gap-12">
          <nav className="hidden md:block">
            <div className="sticky top-24 flex flex-col gap-2">
              <p className="text-xs font-data uppercase tracking-wide text-moss mb-1">Contents</p>
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="text-sm text-ink/80 hover:text-evergreen py-0.5">
                  {s.heading}
                </a>
              ))}
            </div>
          </nav>

          <div className="max-w-[68ch] flex flex-col gap-10">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-3">{s.heading}</h2>
                <div className="flex flex-col gap-3 text-ink/90">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
