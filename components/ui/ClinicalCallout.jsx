import React from "react";
import { AlertOctagon, AlertCircle, Info, PhoneCall } from "lucide-react";

/**
 * Standardized NHS-style clinical callout components:
 * - non-urgent: Navy/grey informational advisory ("Speak to a doctor if...")
 * - urgent: Blue advisory ("Ask for an urgent appointment if...")
 * - emergency: Red immediate action ("Call 1122 or go to emergency room if...")
 */
export default function ClinicalCallout({
  type = "info", // "info" | "urgent" | "emergency"
  title,
  children,
  actionText,
  actionHref,
}) {
  if (type === "emergency") {
    return (
      <aside
        role="alert"
        aria-label="Immediate Emergency Medical Action Required"
        className="my-6 p-6 rounded-3xl bg-red-50 border-2 border-red-500 text-red-950 space-y-3 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 font-bold">
            <AlertOctagon className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-700 block">
              Immediate action required
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-red-900">
              {title || "Call 1122 or go to the nearest emergency department"}
            </h3>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-red-900 leading-relaxed pl-0 sm:pl-13 space-y-2">
          {children}
        </div>

        {actionHref && (
          <div className="pt-2 sm:pl-13">
            <a
              href={actionHref}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{actionText || "Dial Rescue 1122"}</span>
            </a>
          </div>
        )}
      </aside>
    );
  }

  if (type === "urgent") {
    return (
      <aside
        role="region"
        aria-label="Urgent Medical Advice"
        className="my-6 p-6 rounded-3xl bg-blue-50 border-2 border-brand-blue text-slate-900 space-y-3 shadow-xs"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center flex-shrink-0 font-bold">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
              Urgent clinical advice
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-brand-navy">
              {title || "Ask for an urgent doctor appointment"}
            </h3>
          </div>
        </div>

        <div className="text-xs sm:text-sm text-slate-800 leading-relaxed pl-0 sm:pl-13 space-y-2">
          {children}
        </div>

        {actionHref && (
          <div className="pt-2 sm:pl-13">
            <a
              href={actionHref}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
            >
              <span>{actionText || "Find an Urgent Clinic"}</span>
            </a>
          </div>
        )}
      </aside>
    );
  }

  // Non-urgent / Info
  return (
    <aside
      role="region"
      aria-label="Non-urgent Medical Guidance"
      className="my-6 p-6 rounded-3xl bg-brand-bg border border-brand-border text-brand-navy space-y-3"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-brand-teal text-white flex items-center justify-center flex-shrink-0 font-bold">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-teal block">
            Non-urgent advice
          </span>
          <h3 className="text-base font-extrabold text-brand-navy">
            {title || "Speak to a doctor or clinical pharmacist"}
          </h3>
        </div>
      </div>

      <div className="text-xs sm:text-sm text-brand-text leading-relaxed pl-0 sm:pl-12 space-y-2">
        {children}
      </div>

      {actionHref && (
        <div className="pt-2 sm:pl-12">
          <a
            href={actionHref}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-brand-border hover:bg-brand-mint text-brand-navy font-semibold rounded-xl text-xs transition-colors"
          >
            <span>{actionText || "Book an Appointment"}</span>
          </a>
        </div>
      )}
    </aside>
  );
}
