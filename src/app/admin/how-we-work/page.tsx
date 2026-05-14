"use client";

import { useEffect, useState } from "react";
import { useAdminSave } from "../useAdminSave";
import {
  SectionTitle, SaveBar, FormField, TextInput, TextArea, Divider,
} from "../AdminUI";
import type { SiteContent, StepData } from "@/lib/types";

export default function HowWeWorkEditor() {
  const [data, setData] = useState<SiteContent["howWeWork"] | null>(null);
  const { save, status } = useAdminSave("/api/admin/content");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((c: SiteContent) => setData(c.howWeWork));
  }, []);

  async function handleSave() {
    if (!data) return;
    const full = await fetch("/api/admin/content").then((r) => r.json() as Promise<SiteContent>);
    save({ ...full, howWeWork: data });
  }

  function setField(key: keyof SiteContent["howWeWork"], value: string) {
    setData((d) => d ? { ...d, [key]: value } : d);
  }

  function setStep(index: number, key: keyof StepData, value: string) {
    setData((d) => {
      if (!d) return d;
      const steps = d.steps.map((s, i) => i === index ? { ...s, [key]: value } : s);
      return { ...d, steps };
    });
  }

  if (!data) return <div className="font-[family-name:var(--font-inter)] text-sm text-gray-400">Loading...</div>;

  return (
    <div className="max-w-2xl">
      <SectionTitle title="How We Work" description="The 4-step process section on the home page." />

      <FormField label="Eyebrow text">
        <TextInput value={data.eyebrow} onChange={(v) => setField("eyebrow", v)} />
      </FormField>
      <FormField label="Headline">
        <TextInput value={data.headline} onChange={(v) => setField("headline", v)} />
      </FormField>

      <Divider label="Steps" />
      {data.steps.map((step, i) => (
        <div key={step.number} className="mb-4 rounded-xl border border-gray-100 bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8B0000]/10 font-[family-name:var(--font-playfair)] text-xs font-bold text-[#8B0000]">
              {step.number}
            </span>
          </div>
          <FormField label="Step title">
            <TextInput value={step.title} onChange={(v) => setStep(i, "title", v)} />
          </FormField>
          <FormField label="Description">
            <TextArea value={step.description} onChange={(v) => setStep(i, "description", v)} rows={3} />
          </FormField>
        </div>
      ))}

      <SaveBar status={status} onSave={handleSave} />
    </div>
  );
}
