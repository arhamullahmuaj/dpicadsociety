"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAdminGuard } from "@/lib/useAdminGuard";

type Member = {
  Member_id: string;
  Full_name: string;
  Profile_photo: string | null;
  Department: string | null;
  Semester: string | number | null;
  Session: string | null;
  Position: string | null;
  Membership_type: string | null;
  Join_date: string | null;
  Status: string | null;
  Bio: string | null;
};

const fieldClass = "mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-400";

export default function ManageMemberPage() {
  const params = useParams<{ memberId: string }>();
  const router = useRouter();
  const { checking } = useAdminGuard();
  const sourceId = params.memberId;
  const [member, setMember] = useState<Member | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [photoName, setPhotoName] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (checking) return;

    async function loadMember() {
      const { data, error } = await supabase
        .from("public_members")
        .select("*")
        .eq("Member_id", sourceId)
        .maybeSingle();

      if (error) setError(error.message);
      else if (!data) setError("Member record was not found.");
      else setMember(data as Member);
      setLoading(false);
    }

    loadMember();
  }, [sourceId, checking]);

  function updateField<K extends keyof Member>(field: K, value: Member[K]) {
    setMember((current) => (current ? { ...current, [field]: value } : current));
  }

  async function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please select a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Please select an image smaller than 2 MB.");
      return;
    }

    setUploading(true);
    setError("");

    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/upload", { method: "POST", body });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "The selected image could not be uploaded.");
      setUploading(false);
      return;
    }

    updateField("Profile_photo", result.url);
    setPhotoName(file.name);
    setUploading(false);
  }

  async function saveMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!member) return;

    setSaving(true);
    setError("");
    const { data, error } = await supabase
      .from("members")
      .update({
        Member_id: member.Member_id.trim(),
        Full_name: member.Full_name.trim(),
        Profile_photo: member.Profile_photo?.trim() || null,
        Department: member.Department?.trim() || null,
        Semester: member.Semester?.toString().trim() || null,
        Session: member.Session?.trim() || null,
        Position: member.Position?.trim() || null,
        Membership_type: member.Membership_type || "Regular",
        Join_date: member.Join_date?.trim() || null,
        Status: member.Status || "Active",
        Bio: member.Bio?.trim() || null,
      })
      .eq("Member_id", sourceId)
      .select();

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    if (!data || data.length === 0) {
      setError("Changes were not saved. Your session may have expired — please sign in again.");
      setSaving(false);
      return;
    }

    router.replace(`/admin/members/${encodeURIComponent(member.Member_id.trim())}`);
    router.refresh();
    setSaving(false);
  }

  async function deleteMember() {
    if (!member || !window.confirm(`Delete ${member.Full_name}'s member record? This cannot be undone.`)) return;

    setDeleting(true);
    setError("");
    const { error } = await supabase.from("members").delete().eq("Member_id", sourceId);
    if (error) {
      setError(error.message);
      setDeleting(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  if (checking) return <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-sm text-zinc-400">Checking session...</main>;
  if (loading) return <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-sm text-zinc-400">Loading member record...</main>;
  if (!member) return <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-center text-red-400">{error || "Member not found."}</main>;

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <Link className="text-sm text-zinc-500 transition hover:text-white" href="/admin">← Back to members</Link>
        <div className="mt-8 flex flex-col gap-5 border-b border-zinc-800 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Member management</p>
            <h1 className="mt-3 text-3xl font-semibold">{member.Full_name}</h1>
            <p className="mt-2 text-sm text-zinc-400">{member.Member_id}</p>
          </div>
          <div className="flex gap-3">
            <Link className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white" href={`/m/${encodeURIComponent(member.Member_id)}`} target="_blank">Public profile</Link>
            <Link className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white" href={`/api/qr/${encodeURIComponent(member.Member_id)}`} target="_blank">QR code</Link>
          </div>
        </div>

        <form onSubmit={saveMember} className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="text-sm text-zinc-400">Member ID *<input required className={fieldClass} value={member.Member_id} onChange={(e) => updateField("Member_id", e.target.value)} /></label>
            <label className="text-sm text-zinc-400">Full Name *<input required className={fieldClass} value={member.Full_name} onChange={(e) => updateField("Full_name", e.target.value)} /></label>
            <label className="text-sm text-zinc-400">Department<input className={fieldClass} value={member.Department ?? ""} onChange={(e) => updateField("Department", e.target.value)} /></label>
            <label className="text-sm text-zinc-400">Semester<input className={fieldClass} value={member.Semester ?? ""} onChange={(e) => updateField("Semester", e.target.value)} /></label>
            <label className="text-sm text-zinc-400">Session<input className={fieldClass} value={member.Session ?? ""} onChange={(e) => updateField("Session", e.target.value)} /></label>
            <label className="text-sm text-zinc-400">Position<input className={fieldClass} value={member.Position ?? ""} onChange={(e) => updateField("Position", e.target.value)} /></label>
            <label className="text-sm text-zinc-400">Join Date<input className={fieldClass} placeholder="01-06-2025" value={member.Join_date ?? ""} onChange={(e) => updateField("Join_date", e.target.value)} /></label>
            <label className="text-sm text-zinc-400">Membership Type<select className={fieldClass} value={member.Membership_type ?? "Regular"} onChange={(e) => updateField("Membership_type", e.target.value)}><option>Panel Member</option><option>Executive</option><option>Regular</option></select></label>
            <label className="text-sm text-zinc-400">Status<select className={fieldClass} value={member.Status ?? "Active"} onChange={(e) => updateField("Status", e.target.value)}><option>Active</option><option>Inactive</option></select></label>
          </div>
          <div className="mt-6">
            <label className="block text-sm text-zinc-400" htmlFor="profile-photo">Profile Photo</label>
            <input id="profile-photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoChange} className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-300 file:mr-4 file:rounded-lg file:border-0 file:bg-zinc-800 file:px-3 file:py-2 file:text-sm file:text-white" />
            <p className="mt-2 text-xs text-zinc-500">JPG, PNG, or WebP · Maximum 2 MB</p>
            {uploading && <p className="mt-2 text-xs text-zinc-400">Uploading...</p>}
            {member.Profile_photo && (
              <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                <div className="flex min-w-0 items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.Profile_photo} alt="Current profile preview" className="h-16 w-16 rounded-lg object-cover" />
                  <p className="truncate text-sm text-zinc-400">{photoName || "Current profile photo"}</p>
                </div>
                <button type="button" onClick={() => { updateField("Profile_photo", null); setPhotoName(""); }} className="text-sm text-red-400 transition hover:text-red-300">Remove</button>
              </div>
            )}
          </div>
          <label className="mt-6 block text-sm text-zinc-400">Bio<textarea className={fieldClass} rows={4} value={member.Bio ?? ""} onChange={(e) => updateField("Bio", e.target.value)} /></label>
          {error && <p className="mt-6 rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">{error}</p>}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-zinc-800 pt-6 sm:flex-row sm:justify-between">
            <button type="button" disabled={deleting} onClick={deleteMember} className="rounded-xl border border-red-900/70 px-5 py-3 text-sm text-red-400 transition hover:bg-red-950/40 disabled:opacity-50">{deleting ? "Deleting..." : "Delete Member"}</button>
            <button type="submit" disabled={saving || uploading} className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button>
          </div>
        </form>
      </div>
    </main>
  );
}
