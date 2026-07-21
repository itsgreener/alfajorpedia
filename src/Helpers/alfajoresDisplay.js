export function getCloudinaryImageUrl(fotoUrl) {
  if (!fotoUrl || typeof fotoUrl !== "string") return null;

  return `https://res.cloudinary.com/dnvp65swm/image/upload/f_auto,q_auto/v1774009977/${fotoUrl}.webp`;
}
