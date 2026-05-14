"use client";

import { useEffect, useState } from "react";
import { useAdminSave } from "../useAdminSave";
import {
  SectionTitle, SaveBar, FormField, TextInput, TextArea, ImageUpload, Divider,
} from "../AdminUI";
import type { SiteContent, ServiceCard } from "@/lib/types";

export default function ServicesEditor() {
  const [data, setData] = useState<SiteContent["services"] | null>(null);
  const { save, status } = useAdminSave("/api/admin/content");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((c: SiteContent) => setData(c.services));
  }, []);

  async function handleSave() {
    if (!data) return;
    const full = await fetch("/api/admin/content").then((r) => r.json() as Promise<SiteContent>);
    save({ ...full, services: data });
  }

  function setField(key: keyof SiteContent["services"], value: string) {
    setData((d) => d ? { ...d, [key]: value } : d);
  }

  function setCard(index: number, key: keyof ServiceCard, value: string) {
    setData((d) => {
      if (!d) return d;
      const cards = d.cards.map((c, i) => i === index ? { ...c, [key]: value } : c);
      return { ...d, cards };
    });
  }

  if (!data) return <div className="font-[family-name:var(--font-inter)] text-sm text-gray-400">Loading...</div>;

  return (
    <div className="max-w-2xl">
      <SectionTitle title="Services Section" description="The three service cards on the home page." />

      <FormField label="Eyebrow text">
        <TextInput value={data.eyebrow} onChange={(v) => setField("eyebrow", v)} />
      </FormField>
      <FormField label="Headline">
        <TextInput value={data.headline} onChange={(v) => setField("headline", v)} />
      </FormField>
      <FormField label="Subheadline">
        <TextArea value={data.subheadline} onChange={(v) => setField("subheadline", v)} rows={3} />
      </FormField>

      {data.cards.map((card, i) => (
        <div key={card.href}>
          <Divider label={`Card ${i + 1}`} />
          <ImageUpload
            label="Card image"
            src={card.image}
            onChange={(url) => setCard(i, "image", url)}
          />
          <FormField label="Title">
            <TextInput value={card.title} onChange={(v) => setCard(i, "title", v)} />
          </FormField>
          <FormField label="Description">
            <TextArea value={card.description} onChange={(v) => setCard(i, "description", v)} rows={3} />
          </FormField>
          <FormField label="Badge label (e.g. Product / Service)">
            <TextInput value={card.type} onChange={(v) => setCard(i, "type", v)} />
          </FormField>
        </div>
      ))}

      <SaveBar status={status} onSave={handleSave} />
    </div>
  );
}
