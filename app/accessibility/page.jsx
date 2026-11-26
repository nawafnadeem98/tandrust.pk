import React from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Eye } from "lucide-react";

export const metadata = {
  title: "Accessibility Statement (WCAG 2.2 AA) | tandrust.pk",
  description: "tandrust.pk is committed to making healthcare information accessible to all citizens.",
};

export default function AccessibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Accessibility</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">Inclusivity Commitment</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Accessibility Statement</h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          tandrust.pk believes that access to vital healthcare guidance is a universal human right. We actively adhere to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-brand-border space-y-6 text-sm text-brand-text leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-brand-navy">Implemented Standards</h2>
          <ul className="space-y-2 text-xs">
            <li>• <strong>Keyboard Navigation:</strong> All interactive elements, dropdowns, and search modals can be operated via standard keyboard tabs and keys.</li>
            <li>• <strong>Color Contrast:</strong> Minimum 4.5:1 text-to-background contrast ratio maintained across all public themes.</li>
            <li>• <strong>Reduced Motion:</strong> Supports OS <code>prefers-reduced-motion</code> directives by eliminating non-essential transitions.</li>
            <li>• <strong>Urdu RTL Support:</strong> Dynamic switching to proper Nastaliq typography and right-to-left directional layout.</li>
            <li>• <strong>Screen Reader Compatibility:</strong> Proper semantic HTML5 tags (<code>header</code>, <code>nav</code>, <code>main</code>, <code>article</code>, <code>footer</code>) and ARIA attributes.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
