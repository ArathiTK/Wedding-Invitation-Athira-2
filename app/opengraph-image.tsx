import { join } from "node:path";
import { readFile } from "node:fs/promises";

export const alt = "Athira K & Abhiram TK — Wedding Invitation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

export default async function Image() {
  const isAbhiramFirst = (process.env.NEXT_PUBLIC_SITE_URL || "").includes(
    "wedding-invitation-abhiram-athira"
  );

  const fileName = isAbhiramFirst
    ? "og-image-abhiram.jpg"
    : "og-image-athira.jpg";

  const data = await readFile(
    join(process.cwd(), "public", "assets", fileName)
  );

  return new Response(new Uint8Array(data), {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600, immutable",
    },
  });
}
