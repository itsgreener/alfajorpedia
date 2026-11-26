// Upsert de alfajores en PostgreSQL (sustituye al INSERT … ON DUPLICATE KEY de MySQL).
//
// La tabla de Supabase tiene dos claves únicas:
//   unique_foto_url  → UNIQUE (foto_url)              (identificador estable: "alfajorpedia-0001")
//   unique_alfajor   → UNIQUE (marca, variedad, pais)
//
// MySQL reaccionaba a cualquiera de las dos; PostgreSQL solo admite una por
// sentencia. Por eso:
//   · Filas con foto_url  → se casan por foto_url y se actualiza todo lo demás,
//     incluidos marca/variedad/pais (así un cambio de nombre en el Sheet
//     actualiza la ficha en lugar de duplicarla).
//   · Filas sin foto_url  → se casan por (marca, variedad, pais).

const BATCH_SIZE = 500;

// En Supabase gramos y calorias son INTEGER: MySQL redondeaba un decimal en
// silencio, PostgreSQL rechazaría el envío entero. Redondeamos aquí.
const INTEGER_COLUMNS = new Set(["gramos", "calorias"]);

function valueFor(row, column) {
  const v = row[column] ?? null;
  if (v === null || !INTEGER_COLUMNS.has(column)) return v;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : null;
}

const COLUMNS = [
  "foto_url",
  "marca",
  "variedad",
  "empresa",
  "pais",
  "descripcion",
  "tagline",
  "gramos",
  "calorias",
  "puntuacion",
  "categorias",
  "website",
  "instagram",
  "tiktok",
  "empresa_proc",
  "empresa_imp",
];

const STRATEGIES = {
  foto: {
    target: "(foto_url)",
    key: (r) => r.foto_url,
    updatable: COLUMNS.filter((c) => c !== "foto_url"),
  },
  natural: {
    target: "(marca, variedad, pais)",
    key: (r) => `${r.marca}\u0000${r.variedad}\u0000${r.pais ?? ""}`,
    updatable: COLUMNS.filter(
      (c) => c !== "marca" && c !== "variedad" && c !== "pais",
    ),
  },
};

function dedupe(rows, key) {
  // PostgreSQL no permite que un mismo INSERT … ON CONFLICT toque dos veces la
  // misma fila: nos quedamos con la última aparición de cada clave.
  const map = new Map();
  for (const r of rows) map.set(key(r), r);
  return [...map.values()];
}

async function runStrategy(pool, rows, { target, key, updatable }) {
  const clean = dedupe(rows, key);
  let upserted = 0;

  for (let i = 0; i < clean.length; i += BATCH_SIZE) {
    const batch = clean.slice(i, i + BATCH_SIZE);
    const params = [];
    const tuples = batch.map((r) => {
      const placeholders = COLUMNS.map((c) => {
        params.push(valueFor(r, c));
        return `$${params.length}`;
      });
      return `(${placeholders.join(", ")})`;
    });

    const sql = `
      INSERT INTO alfajores (${COLUMNS.join(", ")})
      VALUES ${tuples.join(",\n")}
      ON CONFLICT ${target} DO UPDATE SET
        ${updatable.map((c) => `${c} = EXCLUDED.${c}`).join(",\n        ")},
        updated_at = CURRENT_TIMESTAMP
    `;

    const result = await pool.query(sql, params);
    upserted += result.rowCount;
  }

  return { unique: clean.length, upserted };
}

async function upsertAlfajores(pool, rows) {
  const withFoto = rows.filter((r) => r.foto_url);
  const withoutFoto = rows.filter((r) => !r.foto_url);

  const a = await runStrategy(pool, withFoto, STRATEGIES.foto);
  const b = await runStrategy(pool, withoutFoto, STRATEGIES.natural);

  return { unique: a.unique + b.unique, upserted: a.upserted + b.upserted };
}

module.exports = { upsertAlfajores, COLUMNS };
