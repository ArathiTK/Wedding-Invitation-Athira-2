import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "Athira K & Abhiram TK — Wedding Invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const isAbhiramFirst = (process.env.NEXT_PUBLIC_SITE_URL || "").includes(
    "wedding-invitation-abhiram-athira"
  );

  const fileName = isAbhiramFirst
    ? "og-image_Abhiram.png"
    : "og-image _Athira2.png";

  const data = await readFile(
    join(process.cwd(), "public", "assets", fileName),
    "base64"
  );

  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`data:image/png;base64,${data}`}
        width={size.width}
        height={size.height}
      />
    ),
    { ...size }
  );
}
