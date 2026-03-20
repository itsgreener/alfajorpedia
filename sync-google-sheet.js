require("dotenv").config();
const mysql = require("mysql2/promise");
const csv = require("csv-parser");
const { Readable } = require("stream");

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1iUU4tknZHILXca-98ELPsririKAllZlun2fkX3mCXqo/export?format=csv&gid=0";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function toNumber(value) {
  if (value == null) return null;

  const text = String(value).trim();
  if (text === "") return null;

  const normalized = text.replace(",", ".");
  const parsed = Number(normalized);

  return Number.isNaN(parsed) ? null : parsed;
}

function normalizeText(value) {
  if (value == null) return null;
  const text = String(value).trim();
  return text === "" ? null : text;
}

async function fetchCsvRows() {
  const response = await fetch(SHEET_CSV_URL);

  if (!response.ok) {
    throw new Error(
      `Error descargando CSV: ${response.status} ${response.statusText}`,
    );
  }

  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    const rows = [];

    Readable.from([csvText])
      .pipe(csv())
      .on("data", (row) => {
        const cleanedRow = {};

        for (const [key, value] of Object.entries(row)) {
          cleanedRow[String(key).trim()] = value;
        }

        rows.push(cleanedRow);
      })
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}

async function syncRows(rows) {
  const clean = rows
    .filter((r) => normalizeText(r["Marca"]) && normalizeText(r["Variedad"]))
    .map((r) => ({
      foto_url: normalizeText(r["Foto"]),
      marca: normalizeText(r["Marca"]),
      variedad: normalizeText(r["Variedad"]),
      empresa: normalizeText(r["Empresa"]),
      pais: normalizeText(r["Pais"]),
      descripcion: normalizeText(r["Descripcion"]),
      tagline: normalizeText(r["Tagline"]),
      gramos: toNumber(r["Gramos"]),
      calorias: toNumber(r["Calorias"]),
      puntuacion: toNumber(r["Puntuacion"]),
      categorias: normalizeText(r["Categorias"]),
      website: normalizeText(r["Website"]),
      instagram: normalizeText(r["Instagram"]),
      tiktok: normalizeText(r["TikTok"]),
      empresa_proc: normalizeText(r["Empresa productora"]),
      empresa_imp: normalizeText(r["Empresa importadora"]),
    }))
    .filter((r) => r.foto_url);

  if (clean.length === 0) {
    console.log("No hay filas válidas para insertar");
    return;
  }

  console.log("Primer registro limpio:", clean[0]);

  const values = clean.map((r) => [
    r.foto_url,
    r.marca,
    r.variedad,
    r.empresa,
    r.pais,
    r.descripcion,
    r.tagline,
    r.gramos,
    r.calorias,
    r.puntuacion,
    r.categorias,
    r.website,
    r.instagram,
    r.tiktok,
    r.empresa_proc,
    r.empresa_imp,
  ]);

  const sql = `
    INSERT INTO alfajores (
      foto_url,
      marca,
      variedad,
      empresa,
      pais,
      descripcion,
      tagline,
      gramos,
      calorias,
      puntuacion,
      categorias,
      website,
      instagram,
      tiktok,
      empresa_proc,
      empresa_imp
    )
    VALUES ?
    ON DUPLICATE KEY UPDATE
      marca = VALUES(marca),
      variedad = VALUES(variedad),
      empresa = VALUES(empresa),
      pais = VALUES(pais),
      descripcion = VALUES(descripcion),
      tagline = VALUES(tagline),
      gramos = VALUES(gramos),
      calorias = VALUES(calorias),
      puntuacion = VALUES(puntuacion),
      categorias = VALUES(categorias),
      website = VALUES(website),
      instagram = VALUES(instagram),
      tiktok = VALUES(tiktok),
      empresa_proc = VALUES(empresa_proc),
      empresa_imp = VALUES(empresa_imp),
      updated_at = CURRENT_TIMESTAMP
  `;

  const conn = await pool.getConnection();

  try {
    await conn.query(sql, [values]);
    console.log(`OK. Filas CSV leídas: ${rows.length}`);
    console.log(`OK. Filas insertadas/actualizadas: ${clean.length}`);
  } finally {
    conn.release();
  }
}

async function main() {
  try {
    console.log("Descargando Google Sheet...");
    const rows = await fetchCsvRows();
    console.log(`CSV descargado. Filas leídas: ${rows.length}`);

    if (rows.length > 0) {
      console.log("Primer registro crudo:", rows[0]);
    }

    await syncRows(rows);
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("ERROR:", error.message);
    await pool.end();
    process.exit(1);
  }
}

main();