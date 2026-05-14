"use client";

import { useEffect, useState } from "react";
import { useAdminSave } from "../useAdminSave";
import {
  SectionTitle, SaveBar, FormField, TextInput, TextArea, Divider,
} from "../AdminUI";
import type { SiteContent, DifferentiatorData, StatData } from "@/lib/types";

type WhyState = SiteContent["whyChooseUs"];

export default function WhyChooseUsEditor() {
  const [data, setData] = useState<WhyState | null>(null);
  const { save, status } = useAdminSave("/api/admin/content");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((c: SiteContent) => setData(c.whyChooseUs));
  }, []);

  async function handleSave() {
    if (!data) return;
    const full = await fetch("/api/admin/content").then((r) => r.json() as Promise<SiteContent>);
    save({ ...full, whyChooseUs: data });
  }

  function setField(key: keyof WhyState, value: string) {
    setData((d) => d ? { ...d, [key]: value } : d);
  }

  function setDiff(index: number, key: keyof DifferentiatorData, value: string) {
    setData((d) => {
      if (!d) return d;
      const differentiators = d.differentiators.map((x, i) => i === index ? { ...x, [key]: value } : x);
      return { ...d, differentiators };
    });
  }

  function setStat(index: number, key: keyof StatData, value: string | number) {
    setData((d) => {
      if (!d) return d;
      const stats = d.stats.map((x, i) => i === index ? { ...x, [key]: value } : x);
      return { ...d, stats };
    });
  }

  if (!data) return <div className="font-[family-name:var(--font-inter)] text-sm text-gray-400">Loading...</div>;

  return (
    <div className="max-w-2xl">
      <SectionTitle title="Why Choose Us" description="The dark section with differentiators and stats." />

      <FormField label="Eyebrow text">
        <TextInput value={data.eyebrow} onChange={(v) => setField("eyebrow", v)} />
      </FormField>
      <FormField label="Headline">
        <TextInput value={data.headline} onChange={(v) => setField("headline", v)} />
      </FormField>
      <FormField label="Body paragraph">
        <TextArea value={data.body} onChange={(v) => setField("body", v)} rows={5} />
      </FormField>

      <Divider label="Differentiators" />
      {data.differentiators.map((item, i) => (
        <div key={item.id} className="mb-4 rounded-xl border border-gray-100 bg-white p-4">
          <FormField label="Title">
            <TextInput value={item.title} onChange={(v) => setDiff(i, "title", v)} />
          </FormField>
          <FormField label="Description">
            <TextArea value={item.description} onChange={(v) => setDiff(i, "description", v)} rows={3} />
          </FormField>
        </div>
      ))}

      <Divider label="Stats" />
      {data.stats.map((stat, i) => (
        <div key={stat.label} className="mb-3 grid grid-cols-3 gap-3">
          <FormField label="Number">
            <TextInput
              value={String(stat.end)}
              onChange={(v) => setStat(i, "end", Number(v) || 0)}
            />
          </FormField>
          <FormField label="Suffix (e.g. +)">
            <TextInput value={stat.suffix} onChange={(v) => setStat(i, "suffix", v)} />
          </FormField>
          <FormField label="Label">
            <TextInput value={stat.label} onChange={(v) => setStat(i, "label", v)} />
          </FormField>
        </div>
      ))}

      <SaveBar status={status} onSave={handleSave} />
    </div>
  );
}
