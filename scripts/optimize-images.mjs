// Pre-build step: generates responsive WebP variants of every PNG/JPEG in public/
// into public/_opt/ (gitignored). <Image> in src/components/image.tsx builds its
// srcset from the same naming scheme: /_opt/<path>/<name>-<width>.webp
import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PUBLIC = path.resolve("public");
const OUT = path.join(PUBLIC, "_opt");
export const WIDTHS = [640, 1080, 1920];
const SKIP = /^(favicon|android-chrome|apple-touch-icon|general-og)/;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (full === OUT) continue;
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const exists = async (p) => stat(p).then(() => true, () => false);
let made = 0;

for await (const file of walk(PUBLIC)) {
  const base = path.basename(file);
  if (!/\.(png|jpe?g)$/i.test(base) || SKIP.test(base)) continue;
  const rel = path.relative(PUBLIC, file);
  const { dir, name } = path.parse(rel);
  const srcTime = (await stat(file)).mtimeMs;
  for (const width of WIDTHS) {
    const out = path.join(OUT, dir, `${name}-${width}.webp`);
    if ((await exists(out)) && (await stat(out)).mtimeMs >= srcTime) continue;
    await mkdir(path.dirname(out), { recursive: true });
    await sharp(file).resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
    made++;
  }
}
console.log(`optimize-images: ${made} variant(s) written`);
