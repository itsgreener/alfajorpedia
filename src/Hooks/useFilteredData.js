import { useMemo, useState } from "react";

export function useFilteredData(data) {
  const [searchContent, setSearchContent] = useState("");

  const filteredData = useMemo(() => {
    if (!searchContent) return data;
    const q = searchContent.toLowerCase();
    return data.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.tagline.toLowerCase().includes(q) ||
        i.producer.toLowerCase().includes(q) ||
        i.importer?.toLowerCase().includes(q) ||
        i.brands.some((b) => b.toLowerCase().includes(q)) ||
        i.categories.some((c) => c.toLowerCase().includes(q)),
    );
  }, [data, searchContent]);
  return { filteredData, setSearchContent };
}
