"use client";

import { useRef } from "react";
import { uploadImage } from "./useAdminSave";

type Status = "idle" | "saving" | "saved" | "error";

export function SaveBar({ status, onSave }: { status: Status; onSave: () => void }) {
  return (
    <div className="flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4 mt-8 rounded-xl shadow-sm">
      <span className="font-[family-name:var(--font-inter)] text-sm text-gray-500">
        {status === "saved" && (
          <span className="text-green-600 font-medium">Saved successfully</span>
        )}
        {status === "error" && (
          <span className="text-red-600 font-medium">Save failed — try again</span>
        )}
        {(status === "idle" || status === "saving") && "Changes are unsaved"}
      </span>
      <button
        onClick={onSave}
        disabled={status === "saving"}
        className="rounded-lg bg-[#8B0000] px-6 py-2 font-[family-name:var(--font-inter)] text-sm font-semibold text-white transition-colors hover:bg-[#6e0000] disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000]"
      >
        {status === "saving" ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}

export function FormField({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="mb-5">
      <label className="mb-1.5 block font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1c1c1e]">
        {label}
      </label>
      {children}
      {hint && (
        <p className="mt-1 font-[family-name:var(--font-inter)] text-xs text-gray-400">{hint}</p>
      )}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-200 px-3 py-2 font-[family-name:var(--font-inter)] text-sm text-[#1c1c1e] outline-none transition-colors focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2 font-[family-name:var(--font-inter)] text-sm text-[#1c1c1e] outline-none transition-colors focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
    />
  );
}

export function ImageUpload({
  src,
  onChange,
  label,
}: {
  src: string;
  onChange: (url: string) => void;
  label: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch {
      alert("Image upload failed");
    }
    e.target.value = "";
  }

  return (
    <div className="mb-5">
      <p className="mb-1.5 font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1c1c1e]">
        {label}
      </p>
      <div className="flex items-start gap-4">
        {src && (
          <div className="relative h-24 w-36 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <img src={src} alt="Preview" className="h-full w-full object-cover" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <p className="font-[family-name:var(--font-inter)] text-xs text-gray-500 break-all max-w-[200px]">
            {src}
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-lg border border-gray-200 px-4 py-1.5 font-[family-name:var(--font-inter)] text-xs font-medium text-[#4a4a4a] hover:border-[#8B0000]/40 hover:text-[#8B0000] transition-colors"
          >
            Upload new image
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>
      </div>
    </div>
  );
}

export function SectionTitle({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1c1c1e]">
        {title}
      </h1>
      {description && (
        <p className="mt-1 font-[family-name:var(--font-inter)] text-sm text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}

export function Divider({ label }: { label: string }) {
  return (
    <div className="mb-5 mt-7 flex items-center gap-3">
      <div className="h-px flex-1 bg-gray-100" />
      <span className="font-[family-name:var(--font-inter)] text-xs font-semibold tracking-wide text-gray-400 uppercase">
        {label}
      </span>
      <div className="h-px flex-1 bg-gray-100" />
    </div>
  );
}
