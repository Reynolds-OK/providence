"use client";

import { useEffect, useState } from "react";
import { useAdminSave } from "../useAdminSave";
import { SectionTitle, SaveBar, FormField, TextInput } from "../AdminUI";
import type { Testimonial } from "@/lib/types";

const BLANK: Omit<Testimonial, "id"> = {
  quote: "",
  name: "",
  role: "",
  location: "",
  initials: "",
};

export default function TestimonialsEditor() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { save, status } = useAdminSave("/api/admin/testimonials");

  useEffect(() => {
    fetch("/api/admin/testimonials")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  function openNew() {
    setEditing({ id: String(Date.now()), ...BLANK });
    setIsNew(true);
  }

  function openEdit(item: Testimonial) {
    setEditing({ ...item });
    setIsNew(false);
  }

  function cancelEdit() {
    setEditing(null);
    setIsNew(false);
  }

  function commitEdit() {
    if (!editing) return;
    const next = isNew
      ? [...items, editing]
      : items.map((x) => (x.id === editing.id ? editing : x));
    setItems(next);
    save(next);
    setEditing(null);
    setIsNew(false);
  }

  function remove(id: string) {
    const next = items.filter((x) => x.id !== id);
    setItems(next);
    save(next);
  }

  function setField(key: keyof Testimonial, value: string) {
    setEditing((e) => e ? { ...e, [key]: value } : e);
  }

  return (
    <div className="max-w-2xl">
      <SectionTitle title="Testimonials" description="Manage client testimonials shown on the home page." />

      {editing ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-5 font-[family-name:var(--font-playfair)] text-lg font-bold text-[#1c1c1e]">
            {isNew ? "Add testimonial" : "Edit testimonial"}
          </h2>

          <FormField label="Quote">
            <textarea
              value={editing.quote}
              onChange={(e) => setField("quote", e.target.value)}
              rows={4}
              className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2 font-[family-name:var(--font-inter)] text-sm text-[#1c1c1e] outline-none transition-colors focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
            />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Name">
              <TextInput value={editing.name} onChange={(v) => setField("name", v)} />
            </FormField>
            <FormField label="Initials (2 letters)">
              <TextInput value={editing.initials} onChange={(v) => setField("initials", v.toUpperCase().slice(0, 2))} />
            </FormField>
            <FormField label="Role">
              <TextInput value={editing.role} onChange={(v) => setField("role", v)} />
            </FormField>
            <FormField label="Location">
              <TextInput value={editing.location} onChange={(v) => setField("location", v)} />
            </FormField>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={commitEdit}
              className="rounded-lg bg-[#8B0000] px-5 py-2 font-[family-name:var(--font-inter)] text-sm font-semibold text-white hover:bg-[#6e0000] transition-colors"
            >
              {isNew ? "Add" : "Save"}
            </button>
            <button
              onClick={cancelEdit}
              className="rounded-lg border border-gray-200 px-5 py-2 font-[family-name:var(--font-inter)] text-sm text-[#4a4a4a] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>

          {status === "saved" && (
            <p className="mt-3 font-[family-name:var(--font-inter)] text-sm text-green-600">Saved</p>
          )}
          {status === "error" && (
            <p className="mt-3 font-[family-name:var(--font-inter)] text-sm text-red-600">Save failed</p>
          )}
        </div>
      ) : (
        <>
          <button
            onClick={openNew}
            className="mb-6 rounded-lg bg-[#8B0000] px-5 py-2.5 font-[family-name:var(--font-inter)] text-sm font-semibold text-white hover:bg-[#6e0000] transition-colors"
          >
            + Add testimonial
          </button>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex-1 pr-4">
                  <p className="font-[family-name:var(--font-inter)] text-sm text-[#1c1c1e] line-clamp-2">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="mt-1.5 font-[family-name:var(--font-inter)] text-xs font-semibold text-[#8B0000]">
                    {item.name} &mdash; {item.role}, {item.location}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 font-[family-name:var(--font-inter)] text-xs hover:border-[#8B0000]/30 hover:text-[#8B0000] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 font-[family-name:var(--font-inter)] text-xs text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <p className="font-[family-name:var(--font-inter)] text-sm text-gray-400">
                No testimonials yet.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
