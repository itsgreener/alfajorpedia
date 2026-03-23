import { useMemo, useState } from "react";

export function useFilteredData(data) {
  const [searchContent, setSearchContent] = useState("");

  const filteredData = useMemo(() => {
    if (!searchContent) return data;
    const q = searchContent.toLowerCase();
    return data.filter(
      (i) =>
        i.nombre.toLowerCase().includes(q) ||
        i.descripcion?.toLowerCase().includes(q) ||
        i.tagline?.toLowerCase().includes(q) ||
        i.variedad?.toLowerCase().includes(q) ||
        i.empresa?.toLowerCase().includes(q) ||
        i.empresa_imp?.toLowerCase().includes(q) ||
        i.empresa_proc?.toLowerCase().includes(q) ||
        i.marca?.toLowerCase().includes(q) ||
        i.categorias?.toLowerCase().includes(q) 
    );
  }, [data, searchContent]);
  return { filteredData, setSearchContent };
}
