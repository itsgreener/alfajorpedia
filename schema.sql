-- Esquema PostgreSQL de Alfajorpedia, como referencia.
-- Las tablas YA EXISTEN en Supabase con datos: no hace falta ejecutar esto allí.
-- Las restricciones reproducen las de Supabase (unique_alfajor, unique_foto_url,
-- uq_email, uq_usuario_alfajor); sirve para montar una base local de pruebas.

CREATE TABLE IF NOT EXISTS alfajores (
  id            SERIAL PRIMARY KEY,
  foto_url      TEXT,
  marca         TEXT NOT NULL,
  variedad      TEXT NOT NULL,
  empresa       TEXT,
  pais          TEXT,
  descripcion   TEXT,
  tagline       TEXT,
  gramos        NUMERIC,
  calorias      NUMERIC,
  puntuacion    NUMERIC,
  categorias    TEXT,
  website       TEXT,
  instagram     TEXT,
  tiktok        TEXT,
  empresa_proc  TEXT,
  empresa_imp   TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT unique_alfajor   UNIQUE (marca, variedad, pais),
  CONSTRAINT unique_foto_url  UNIQUE (foto_url)
);

CREATE TABLE IF NOT EXISTS usuarios (
  id             SERIAL PRIMARY KEY,
  nombre         TEXT,
  email          TEXT NOT NULL,
  password_hash  TEXT NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_email UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS favoritos (
  id          SERIAL PRIMARY KEY,
  usuario_id  INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  alfajor_id  INTEGER NOT NULL REFERENCES alfajores(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_usuario_alfajor UNIQUE (usuario_id, alfajor_id)
);

-- Tras importar filas con id explícito desde MySQL, recoloca las secuencias:
-- SELECT setval(pg_get_serial_sequence('alfajores','id'), COALESCE(MAX(id),1)) FROM alfajores;
-- SELECT setval(pg_get_serial_sequence('usuarios','id'),  COALESCE(MAX(id),1)) FROM usuarios;
-- SELECT setval(pg_get_serial_sequence('favoritos','id'), COALESCE(MAX(id),1)) FROM favoritos;
