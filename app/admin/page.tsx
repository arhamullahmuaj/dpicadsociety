"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Member = {
  Member_id: string;
  Full_name: string;
  Department: string | null;
  Position: string | null;
  Status: string | null;
};

export default function AdminDashboard() {
  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMembers() {
      const { data, error } = await supabase
        .from("public_members")
        .select("Member_id, Full_name, Department, Position, Status")
        .order("Member_id");

      if (error) setError(error.message);
      else setMembers(data ?? []);

      setLoading(false);
    }

    loadMembers();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-6 border-b border-zinc-800 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">CAD Society</p>
            <h1 className="mt-3 text-3xl font-semibold">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-zinc-400">Manage digital member records and verification links.</p>
          </div>
          <Link className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200" href="/admin/members/new">
            Add New Member
          </Link>
        </header>

        <section className="mt-8 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
          <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold">Members</h2>
              <p className="mt-1 text-sm text-zinc-500">
                {loading ? "Loading members..." : `${members.length} member${members.length === 1 ? "" : "s"} found`}
              </p>
            </div>
            <Link className="text-sm text-zinc-400 transition hover:text-white" href="/qr">Open QR code</Link>
          </div>

          {error ? (
            <p className="px-6 py-8 text-sm text-red-400">Unable to load members: {error}</p>
          ) : loading ? (
            <p className="px-6 py-8 text-sm text-zinc-500">Loading member records...</p>
          ) : members.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="text-sm text-zinc-400">No members have been added yet.</p>
              <Link className="mt-4 inline-block text-sm text-white underline underline-offset-4" href="/admin/members/new">Add the first member</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-zinc-950/50 text-xs uppercase tracking-wider text-zinc-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Member ID</th>
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Department</th>
                    <th className="px-6 py-4 font-medium">Position</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {members.map((member) => (
                    <tr key={member.Member_id} className="text-zinc-300">
                      <td className="px-6 py-4 font-medium text-white">{member.Member_id}</td>
                      <td className="px-6 py-4">{member.Full_name}</td>
                      <td className="px-6 py-4 text-zinc-400">{member.Department ?? "—"}</td>
                      <td className="px-6 py-4 text-zinc-400">{member.Position ?? "—"}</td>
                      <td className="px-6 py-4"><span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">{member.Status ?? "Unknown"}</span></td>
                      <td className="px-6 py-4 text-right">
                        <Link className="text-sm text-zinc-400 transition hover:text-white" href={`/admin/members/${encodeURIComponent(member.Member_id)}`}>Manage</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer className="mt-10 text-center text-xs text-zinc-700">CAD Society · Digital Member Verification · Developed by Arhamullah Muaj &amp; Zawad Zarir</footer>
      </div>
    </main>
  );
}
