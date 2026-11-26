import AiAssistant from "@/components/ai/AiAssistant";

export const metadata = { title: "AI Health Assistant | tandrust.pk", description: "Ask general health questions by typing or speaking, and listen to the answers." };

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight">AI Health Assistant</h1>
      <p className="text-brand-muted mt-2 mb-6">General health information by text or voice. Not a doctor, and not for emergencies.</p>
      <AiAssistant />
    </div>
  );
}
