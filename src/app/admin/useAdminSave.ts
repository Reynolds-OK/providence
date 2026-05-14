"use client";

import { useState } from "react";

type Status = "idle" | "saving" | "saved" | "error";

export function useAdminSave(endpoint: string) {
  const [status, setStatus] = useState<Status>("idle");

  async function save(data: unknown) {
    setStatus("saving");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return { save, status };
}

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error("Upload failed");
  const { url } = await res.json();
  return url as string;
}
