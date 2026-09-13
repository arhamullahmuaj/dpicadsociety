import QRCode from "qrcode";

type RouteContext = {
  params: Promise<{ memberId: string }>;
};

export async function GET(request: Request, { params }: RouteContext) {
  const { memberId } = await params;
  const profileUrl = new URL(`/m/${encodeURIComponent(memberId)}`, request.url);
  const svg = await QRCode.toString(profileUrl.toString(), {
    type: "svg",
    margin: 2,
    width: 300,
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-store",
    },
  });
}
