// migrate.mjs
import { v2 as cloudinary } from "cloudinary";

const src = {
  cloud_name: process.env.SRC_CLOUD,
  api_key: process.env.SRC_KEY,
  api_secret: process.env.SRC_SECRET,
};
const dst = {
  cloud_name: process.env.DST_CLOUD,
  api_key: process.env.DST_KEY,
  api_secret: process.env.DST_SECRET,
};

const DRY_RUN = process.env.DRY_RUN !== "false"; // por defecto no sube nada
const LIMIT = Number(process.env.LIMIT || 0); // 0 = sin límite (para pruebas: LIMIT=5)
const CONCURRENCY = 5;

async function listAll() {
  const all = [];
  let next_cursor;
  do {
    const res = await cloudinary.api.resources({
      ...src, // credenciales por llamada, sin estado global
      resource_type: "image",
      type: "upload",
      max_results: 500,
      next_cursor,
      tags: true,
      context: true,
    });
    all.push(...res.resources);
    next_cursor = res.next_cursor;
  } while (next_cursor);
  return all;
}

const DST_FOLDER = process.env.DST_FOLDER; // p. ej. "importadas" o "proyecto/imagenes"

async function copyOne(r) {
  const folder = r.asset_folder
    ? `${DST_FOLDER}/${r.asset_folder}`
    : DST_FOLDER;

  return cloudinary.uploader.upload(r.secure_url, {
    ...dst,
    resource_type: "image",
    public_id: r.public_id,
    asset_folder: folder,
    display_name: r.display_name,
    overwrite: false,
    tags: r.tags,
    context: r.context?.custom,
  });
}

let assets = await listAll();
console.log(`Origen: ${assets.length} imágenes`);
if (LIMIT) assets = assets.slice(0, LIMIT);

if (DRY_RUN) {
  assets.forEach((r) =>
    console.log(
      "[dry]",
      r.asset_folder || "(raíz)",
      "|",
      r.display_name,
      "|",
      r.public_id,
    ),
  );
  process.exit(0);
}

let ok = 0;
const failed = [];
for (let i = 0; i < assets.length; i += CONCURRENCY) {
  const batch = assets.slice(i, i + CONCURRENCY);
  const results = await Promise.allSettled(batch.map(copyOne));
  results.forEach((res, j) => {
    if (res.status === "fulfilled") ok++;
    else failed.push({ id: batch[j].public_id, error: res.reason?.message });
  });
  console.log(`${Math.min(i + CONCURRENCY, assets.length)}/${assets.length}`);
}
console.log({ ok, failed: failed.length });
if (failed.length) console.log(failed);
