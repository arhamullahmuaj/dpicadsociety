import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: members, error } = await supabase
  .from("members")
  .select("*")
  .eq("Member_id", "CADS-26-001");

const member = members?.[0];
  if (!member) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-red-400">
          Member Not Found
        </p>

        <p className="mt-3 text-zinc-400">
          No member found with ID CADS-26-001.
        </p>
      </div>
    </main>
  );
  }
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-red-400">
            Database Error
          </p>

          <h1 className="mt-4 text-2xl font-semibold">
            Unable to load member
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {error.message}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
          CAD Society
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Member Profile
        </h1>

        {/* Profile Card */}
        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
          {/* Member ID */}
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Member ID
            </p>

            <p className="mt-2 text-xl font-medium">
              {member.Member_id}
            </p>
          </div>

          {/* Name */}
          <div className="mt-8">
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Name
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {member.Full_name}
            </p>
          </div>

          {/* Information */}
          <div className="mt-8 grid gap-6 border-t border-zinc-800 pt-8 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Department
              </p>

              <p className="mt-2 text-sm text-zinc-200">
                {member.Department}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Semester
              </p>

              <p className="mt-2 text-sm text-zinc-200">
                {member.Semester}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Position
              </p>

              <p className="mt-2 text-sm text-zinc-200">
                {member.Position}
              </p>
            </div>
          </div>

          {/* Session & Membership */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Session
              </p>

              <p className="mt-2 text-sm text-zinc-200">
                {member.Session}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Membership Type
              </p>

              <p className="mt-2 text-sm text-zinc-200">
                {member.Membership_type}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="mt-8 border-t border-zinc-800 pt-8">
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Membership Status
            </p>

            <span className="mt-3 inline-flex rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
              {member.Status}
            </span>
          </div>

          {/* Bio */}
          {member.Bio && (
            <div className="mt-8 border-t border-zinc-800 pt-8">
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                About
              </p>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                {member.Bio}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-zinc-600">
          CAD Society · Digital Member Verification
        </p>
      </div>
    </main>
  );
}