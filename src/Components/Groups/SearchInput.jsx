import "./SearchInput.css";

function SearchInput({ onChange, isMobile = false }) {
  return (
    <div
      className={`catalogo-search ${
        isMobile ? "mobile-width" : "desktop-width"
      }`}
    >
      <input
        type="text"
        placeholder="Busca tu match"
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="catalogo-search-divider" />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--black)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  );
}

export default SearchInput;
