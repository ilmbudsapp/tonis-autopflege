import type { LegalSection } from "@/legal/legalContent";

export default function LegalSections({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <section key={section.id}>
          <h2 className="text-base font-semibold text-zinc-200">{section.title}</h2>
          {section.paragraphs.map((paragraph, index) => (
            <p key={index} className="mt-3 whitespace-pre-line text-zinc-400">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
