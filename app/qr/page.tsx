import Image from "next/image";

export default function QRPage() {
  const memberId = "CADS-26-001";

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          CAD Society
        </p>

        <h1 className="mt-4 text-3xl font-semibold">
          Member QR Code
        </h1>

        <p className="mt-3 text-zinc-400">
          {memberId}
        </p>

        <div className="mx-auto mt-8 flex h-[300px] w-[300px] items-center justify-center rounded-2xl bg-white p-3">
          <Image
            src={`/api/qr/${encodeURIComponent(memberId)}`}
            alt={`QR Code for ${memberId}`}
            className="h-full w-full"
            height={276}
            priority
            unoptimized
            width={276}
          />
        </div>

        <p className="mt-6 text-sm text-zinc-500">
          Scan this QR code to verify the member profile.
        </p>
      </div>
    </main>
  );
}
