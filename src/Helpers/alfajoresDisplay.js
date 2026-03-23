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
export function getAlfajoresConImagenAleatoriosPorHora(alfajores, tick = Date.now()) {
  const now = new Date(tick);
  const seed = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}-${now.getHours()}`;
  const soloConImagen = alfajores.filter(hasImage);

  return shuffleWithSeed(soloConImagen, seed);
}