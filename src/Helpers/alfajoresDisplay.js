function hasImage(alfajor) {
  return typeof alfajor?.foto_url === "string" && alfajor.foto_url.trim() !== "";
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}
function seededRandom(seed) {
  let state = seed >>> 0;
  return function random() {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function shuffleWithSeed(items, seedString) {
  const arr = [...items];
  const random = seededRandom(hashString(seedString));

  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export function getCloudinaryImageUrl(fotoUrl) {
  if (!fotoUrl || typeof fotoUrl !== "string") return null;

  return `https://res.cloudinary.com/dnvp65swm/image/upload/f_auto,q_auto,d_placeholder/v1774009977/${fotoUrl}.webp`;
}

export async function filtrarAlfajoresConImagenReal(alfajores) {
  const checks = await Promise.all(
    alfajores.map(async (alfajor) => {
      if (!alfajor?.foto_url || typeof alfajor.foto_url !== "string") {
        return null;
      }

      const url = getCloudinaryImageUrl(alfajor.foto_url);

      try {
        const res = await fetch(url, { method: "HEAD" });
        return res.ok ? alfajor : null;
      } catch {
        return null;
      }
    }),
  );

  return checks.filter(Boolean);
}
export function getAlfajoresConImagenAleatoriosPorHora(alfajores, tick = Date.now()) {
  const now = new Date(tick);
  const seed = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}`;
  const soloConImagen = alfajores.filter(hasImage);

  return shuffleWithSeed(soloConImagen, seed);
}