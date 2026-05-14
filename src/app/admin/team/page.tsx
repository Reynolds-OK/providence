"use client";

import { useEffect, useState } from "react";
import { useAdminSave } from "../useAdminSave";
import { SectionTitle, FormField, TextInput, ImageUpload } from "../AdminUI";
import { uploadImage } from "../useAdminSave";
import type { TeamMember } from "@/lib/types";

const BLANK: Omit<TeamMember, "id"> = {
  initials: "",
  name: "",
  title: "",
  bio: "",
  photo: null,
};

export default function TeamEditor() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { save, status } = useAdminSave("/api/admin/team");

  useEffect(() => {
    fetch("/api/admin/team")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  function openNew() {
    setEditing({ id: String(Date.now()), ...BLANK });
    setIsNew(true);
  }

  function openEdit(item: TeamMember) {
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

  function setField(key: keyof TeamMember, value: string | null) {
    setEditing((e) => e ? { ...e, [key]: value } : e);
  }

  return (
    <div className="max-w-2xl">
      <SectionTitle title="Team Members" description="Manage the team cards shown on the About page." />

      {editing ? (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-5 font-[family-name:var(--font-playfair)] text-lg font-bold text-[#1c1c1e]">
            {isNew ? "Add team member" : "Edit team member"}
          </h2>

          <ImageUpload
            label="Photo (optional)"
            src={editing.photo ?? ""}
            onChange={(url) => setField("photo", url)}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Full name">
              <TextInput value={editing.name} onChange={(v) => setField("name", v)} />
            </FormField>
            <FormField label="Initials (2 letters)" hint="Shown when no photo">
              <TextInput value={editing.initials} onChange={(v) => setField("initials", v.toUpperCase().slice(0, 2))} />
            </FormField>
          </div>

          <FormField label="Job title">
            <TextInput value={editing.title} onChange={(v) => setField("title", v)} />
          </FormField>
          <FormField label="Bio">
            <textarea
              value={editing.bio}
              onChange={(e) => setField("bio", e.target.value)}
              rows={3}
              className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2 font-[family-name:var(--font-inter)] text-sm text-[#1c1c1e] outline-none transition-colors focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
            />
          </FormField>

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
            + Add team member
          </button>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  {item.photo ? (
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8B0000] font-[family-name:var(--font-playfair)] text-sm font-bold text-white">
                      {item.initials}
                    </div>
                  )}
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1c1c1e]">
                      {item.name || item.initials}
                    </p>
                    <p className="font-[family-name:var(--font-inter)] text-xs text-[#7C7C7C]">
                      {item.title}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
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
                No team members yet.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
