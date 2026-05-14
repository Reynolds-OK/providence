"use client";

import { useEffect, useState } from "react";
import { useAdminSave } from "../useAdminSave";
import {
  SectionTitle, SaveBar, FormField, TextInput, TextArea,
} from "../AdminUI";
import type { SiteContent } from "@/lib/types";

export default function BottomCTAEditor() {
  const [data, setData] = useState<SiteContent["bottomCTA"] | null>(null);
  const { save, status } = useAdminSave("/api/admin/content");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((c: SiteContent) => setData(c.bottomCTA));
  }, []);

  async function handleSave() {
    if (!data) return;
    const full = await fetch("/api/admin/content").then((r) => r.json() as Promise<SiteContent>);
    save({ ...full, bottomCTA: data });
  }

  function set(key: keyof SiteContent["bottomCTA"], value: string) {
    setData((d) => d ? { ...d, [key]: value } : d);
  }

  if (!data) return <div className="font-[family-name:var(--font-inter)] text-sm text-gray-400">Loading...</div>;

  return (
    <div className="max-w-2xl">
      <SectionTitle title="Bottom CTA" description="The crimson call-to-action banner at the bottom of the home page." />

      <FormField label="Headline">
        <TextInput value={data.headline} onChange={(v) => set("headline", v)} />
      </FormField>
      <FormField label="Body text">
        <TextArea value={data.body} onChange={(v) => set("body", v)} rows={3} />
      </FormField>
      <FormField label="Button label">
        <TextInput value={data.buttonText} onChange={(v) => set("buttonText", v)} />
      </FormField>

      <SaveBar status={status} onSave={handleSave} />
    </div>
  );
}
