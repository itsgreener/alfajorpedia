export function getCloudinaryImageUrl(fotoUrl) {
  if (!fotoUrl || typeof fotoUrl !== "string") return null;

  return `https://media.alfajorpedia.com/${fotoUrl}.webp`;
}
