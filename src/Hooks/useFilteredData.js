import { useMemo } from "react";

export function useFilteredData(alfajores, searchInput) {
  return useMemo(() => {
    if (!searchInput) return alfajores;
    const q = searchInput.toLowerCase();
    return alfajores.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.tagline.toLowerCase().includes(q) ||
        i.producer.toLowerCase().includes(q) ||
        i.importer?.toLowerCase().includes(q) ||
        i.brands.some((b) => b.toLowerCase().includes(q)) ||
        i.categories.some((c) => c.toLowerCase().includes(q)),
    );
  }, [alfajores, searchInput]);
}
