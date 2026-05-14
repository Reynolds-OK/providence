"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SectionTitle, FormField, TextInput } from "../AdminUI";

interface User {
  id: string;
  username: string;
}

export default function UsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/users").then((r) => r.json()).then(setUsers);
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSaving(true);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setSaving(false);

    if (res.ok) {
      const newUser = await res.json() as User;
      setUsers((u) => [...u, newUser]);
      setUsername("");
      setPassword("");
      setConfirm("");
      setShowForm(false);
      setSuccess(`User "${newUser.username}" created.`);
    } else {
      const { error: msg } = await res.json() as { error: string };
      setError(msg ?? "Failed to create user.");
    }
  }

  async function handleDelete(id: string, name: string) {
    if (session?.user?.name === name) {
      setError("You cannot delete your own account.");
      return;
    }
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setUsers((u) => u.filter((x) => x.id !== id));
  }

  return (
    <div className="max-w-xl">
      <SectionTitle title="Users" description="Manage admin accounts that can log in to this panel." />

      {success && (
        <p className="mb-4 rounded-lg bg-green-50 px-4 py-2.5 font-[family-name:var(--font-inter)] text-sm text-green-700">
          {success}
        </p>
      )}
      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 font-[family-name:var(--font-inter)] text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mb-6 space-y-2">
        {users.map((u) => (
          <div
            key={u.id}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8B0000]/10 font-[family-name:var(--font-playfair)] text-sm font-bold text-[#8B0000]">
                {u.username[0]?.toUpperCase()}
              </div>
              <span className="font-[family-name:var(--font-inter)] text-sm font-medium text-[#1c1c1e]">
                {u.username}
              </span>
              {session?.user?.name === u.username && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 font-[family-name:var(--font-inter)] text-[10px] font-semibold tracking-wide text-gray-400 uppercase">
                  You
                </span>
              )}
            </div>
            <button
              onClick={() => handleDelete(u.id, u.username)}
              disabled={session?.user?.name === u.username}
              className="rounded-lg border border-gray-200 px-3 py-1.5 font-[family-name:var(--font-inter)] text-xs text-red-500 transition-colors hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Delete
            </button>
          </div>
        ))}

        {users.length === 0 && (
          <p className="font-[family-name:var(--font-inter)] text-sm text-gray-400">
            No users yet.
          </p>
        )}
      </div>

      {showForm ? (
        <form
          onSubmit={handleAdd}
          className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <h2 className="mb-5 font-[family-name:var(--font-playfair)] text-lg font-bold text-[#1c1c1e]">
            Add new user
          </h2>

          <FormField label="Username">
            <TextInput
              value={username}
              onChange={setUsername}
              placeholder="e.g. editor"
            />
          </FormField>

          <FormField label="Password" hint="Minimum 8 characters">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 font-[family-name:var(--font-inter)] text-sm text-[#1c1c1e] outline-none transition-colors focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
            />
          </FormField>

          <FormField label="Confirm password">
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 font-[family-name:var(--font-inter)] text-sm text-[#1c1c1e] outline-none transition-colors focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
            />
          </FormField>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#8B0000] px-5 py-2 font-[family-name:var(--font-inter)] text-sm font-semibold text-white transition-colors hover:bg-[#6e0000] disabled:opacity-50"
            >
              {saving ? "Creating..." : "Create user"}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setError(""); }}
              className="rounded-lg border border-gray-200 px-5 py-2 font-[family-name:var(--font-inter)] text-sm text-[#4a4a4a] transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => { setShowForm(true); setSuccess(""); setError(""); }}
          className="rounded-lg bg-[#8B0000] px-5 py-2.5 font-[family-name:var(--font-inter)] text-sm font-semibold text-white transition-colors hover:bg-[#6e0000]"
        >
          + Add user
        </button>
      )}
    </div>
  );
}
