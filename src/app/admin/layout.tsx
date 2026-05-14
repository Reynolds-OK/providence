import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar email={session?.user?.email} />
      <div className="flex flex-1 flex-col">
        <header className="border-b border-gray-100 bg-white px-8 py-4">
          <p className="font-[family-name:var(--font-inter)] text-sm text-gray-500">
            Content Management
          </p>
        </header>
        <main className="flex-1 px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
