"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const hasError = searchParams.get("error") !== null;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(hasError ? "Invalid username or password." : "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid username or password.");
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f4f2] px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-10 shadow-lg">
        <div className="mb-8 text-center">
          <p className="font-[family-name:var(--font-inter)] text-xs font-semibold tracking-[0.22em] text-[#8B0000] uppercase">
            Admin Access
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#1c1c1e]">
            Providence CIG
          </h1>
          <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-[#7C7C7C]">
            Sign in to manage site content
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-1.5 block font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1c1c1e]"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 font-[family-name:var(--font-inter)] text-sm text-[#1c1c1e] outline-none transition-colors focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block font-[family-name:var(--font-inter)] text-sm font-semibold text-[#1c1c1e]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 font-[family-name:var(--font-inter)] text-sm text-[#1c1c1e] outline-none transition-colors focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000]"
            />
          </div>

          {error && (
            <p className="font-[family-name:var(--font-inter)] text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#8B0000] px-4 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-white transition-colors hover:bg-[#6e0000] disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B0000] cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
