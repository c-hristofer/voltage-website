import { faqSchema } from '@/lib/schemas';
import type { z } from 'zod';

type FAQ = z.infer<typeof faqSchema>;

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="group rounded-2xl border border-white/10 bg-surface/60 p-4">
          <summary className="cursor-pointer list-none text-lg font-semibold text-white">
            {faq.question}
          </summary>
          <p className="mt-2 text-sm text-white/70">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
