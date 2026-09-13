"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewMemberPage() {
  const router = useRouter();

  const [memberId, setMemberId] = useState("");
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [session, setSession] = useState("");
  const [position, setPosition] = useState("");
  const [membershipType, setMembershipType] = useState("Regular");
  const [status, setStatus] = useState("Active");
  const [bio, setBio] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const { error } = await supabase.from("members").insert({
      Member_id: memberId.trim(),
      Full_name: fullName.trim(),
      Department: department.trim() || null,
      Semester: semester.trim() || null,
      Session: session.trim() || null,
      Position: position.trim() || null,
      Membership_type: membershipType,
      Status: status,
      Bio: bio.trim() || null,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin")}
            className="text-sm text-zinc-500 transition hover:text-white"
          >
            ← Back to Dashboard
          </button>

          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-zinc-500">
            CAD Society
          </p>

          <h1 className="mt-3 text-3xl font-semibold">
            Add New Member
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Create a new digital member record.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8"
        >

          <div className="grid gap-6 sm:grid-cols-2">

            {/* Member ID */}
            <div>
              <label className="text-sm text-zinc-400">
                Member ID *
              </label>

              <input
                type="text"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="CADS-26-002"
                required
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-400"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="text-sm text-zinc-400">
                Full Name *
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Member full name"
                required
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-400"
              />
            </div>

            {/* Department */}
            <div>
              <label className="text-sm text-zinc-400">
                Department
              </label>

              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Mechanical"
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-400"
              />
            </div>

            {/* Semester */}
            <div>
              <label className="text-sm text-zinc-400">
                Semester
              </label>

              <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="6"
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-400"
              />
            </div>

            {/* Session */}
            <div>
              <label className="text-sm text-zinc-400">
                Session
              </label>

              <input
                type="text"
                value={session}
                onChange={(e) => setSession(e.target.value)}
                placeholder="23-24"
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-400"
              />
            </div>

            {/* Position */}
            <div>
              <label className="text-sm text-zinc-400">
                Position
              </label>

              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Member"
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-400"
              />
            </div>

            {/* Membership Type */}
            <div>
              <label className="text-sm text-zinc-400">
                Membership Type
              </label>

              <select
                value={membershipType}
                onChange={(e) => setMembershipType(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-400"
              >
                <option value="Panel Member">Panel Member</option>
                <option value="Executive">Executive</option>
                <option value="Regular">Regular</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="text-sm text-zinc-400">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-400"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

          </div>

          {/* Bio */}
          <div className="mt-6">
            <label className="text-sm text-zinc-400">
              Bio
            </label>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Short member description..."
              rows={4}
              className="mt-2 w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-zinc-400"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="rounded-xl border border-zinc-700 px-6 py-3 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating Member..." : "Create Member"}
            </button>

          </div>

        </form>

        <p className="mt-8 text-center text-xs text-zinc-700">
          CAD Society · Digital Member Verification
        </p>

        <p className="mt-2 text-center text-[11px] text-zinc-800">
          Designed & Developed by Arhamullah Muaj
        </p>

      </div>
    </main>
  );
}