"use client";

import { useEffect, useState } from "react";
import { useAdminSave } from "../useAdminSave";
import {
  SectionTitle, SaveBar, FormField, TextInput, TextArea, ImageUpload, Divider,
} from "../AdminUI";
import type { SiteContent } from "@/lib/types";

type HeroState = SiteContent["hero"];

export default function HeroEditor() {
  const [data, setData] = useState<HeroState | null>(null);
  const [logo, setLogo] = useState<string>("");
  const { save, status } = useAdminSave("/api/admin/content");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((c: SiteContent) => {
        setData(c.hero);
        setLogo(c.logo ?? "/images/logo.png");
      });
  }, []);

  async function handleSave() {
    if (!data) return;
    const full = await fetch("/api/admin/content").then((r) => r.json() as Promise<SiteContent>);
    save({ ...full, hero: data, logo });
  }

  function set(key: keyof HeroState, value: string) {
    setData((d) => d ? { ...d, [key]: value } : d);
  }

  if (!data) return <div className="font-[family-name:var(--font-inter)] text-sm text-gray-400">Loading...</div>;

  return (
    <div className="max-w-2xl">
      <SectionTitle title="Hero Section" description="The full-screen opening section of the home page." />

      <ImageUpload
        label="Site Logo"
        src={logo}
        onChange={setLogo}
      />

      <Divider label="Hero Section" />

      <ImageUpload
        label="Background Image"
        src={data.backgroundImage}
        onChange={(url) => set("backgroundImage", url)}
      />

      <FormField label="Eyebrow text" hint="Small uppercase label above the headline">
        <TextInput value={data.eyebrow} onChange={(v) => set("eyebrow", v)} />
      </FormField>

      <FormField label="Headline" hint="Supports line breaks with \n">
        <TextArea value={data.headline} onChange={(v) => set("headline", v)} rows={3} />
      </FormField>

      <FormField label="Subheadline">
        <TextArea value={data.subheadline} onChange={(v) => set("subheadline", v)} rows={3} />
      </FormField>

      <FormField label="Primary CTA button text">
        <TextInput value={data.primaryCTA} onChange={(v) => set("primaryCTA", v)} />
      </FormField>

      <FormField label="Secondary CTA button text">
        <TextInput value={data.secondaryCTA} onChange={(v) => set("secondaryCTA", v)} />
      </FormField>

      <SaveBar status={status} onSave={handleSave} />
    </div>
  );
}
