import { supabase } from "@/lib/supabase";

type PageProps = {
  params: Promise<{
    memberId: string;
  }>;
};

export default async function MemberProfile({ params }: PageProps) {
  const { memberId } = await params;

  const { data: members, error } = await supabase
    .from("public_members")
    .select("*")
    .eq("Member_id", memberId);

  const member = members?.[0];

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-red-400">
            Database Error
          </p>

          <p className="mt-4 text-zinc-400">
            {error.message}
          </p>
        </div>
      </main>
    );
  }

  if (!member) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            CAD Society
          </p>

          <h1 className="mt-4 text-3xl font-semibold">
            Member Not Found
          </h1>

          <p className="mt-3 text-zinc-500">
            No member found with ID: {memberId}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">

        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          CAD Society
        </p>

        <h1 className="mt-4 text-4xl font-semibold">
          Member Profile
        </h1>

        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Member ID
          </p>

          <p className="mt-2 text-xl font-medium">
            {member.Member_id}
          </p>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Name
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {member.Full_name}
            </p>
          </div>

          <div className="mt-8 grid gap-6 border-t border-zinc-800 pt-8 sm:grid-cols-3">

            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Department
              </p>

              <p className="mt-2">
                {member.Department}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Semester
              </p>

              <p className="mt-2">
                {member.Semester}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Position
              </p>

              <p className="mt-2">
                {member.Position}
              </p>
            </div>

          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">

            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Session
              </p>

              <p className="mt-2">
                {member.Session}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-500">
                Membership Type
              </p>

              <p className="mt-2">
                {member.Membership_type}
              </p>
            </div>

          </div>

          <div className="mt-8 border-t border-zinc-800 pt-8">

            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Membership Status
            </p>

            <span className="mt-3 inline-flex rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
              {member.Status}
            </span>

          </div>

          {member.Bio && (
            <div className="mt-8 border-t border-zinc-800 pt-8">

              <p className="text-xs uppercase tracking-widest text-zinc-500">
                About
              </p>

              <p className="mt-3 leading-7 text-zinc-400">
                {member.Bio}
              </p>

            </div>
          )}

        </div>

        <div className="mt-8 text-center">
  <p className="text-xs text-zinc-600">
    CAD Society · Digital Member Verification
  </p>

  <p className="mt-2 text-[11px] text-zinc-700">
    Designed & Developed by Arhamullah Muaj
  </p>
</div>

      </div>
    </main>
  );
}