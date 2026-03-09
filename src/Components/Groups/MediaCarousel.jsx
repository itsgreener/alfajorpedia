import { useState } from "react";

const SLOT_STYLES = [
  { scale: 0.7, zIndex: 1, opacity: 0.5, x: "-180%" },
  { scale: 0.85, zIndex: 2, opacity: 0.75, x: "-100%" },
  { scale: 1, zIndex: 3, opacity: 1, x: "0%" },
  { scale: 0.85, zIndex: 2, opacity: 0.75, x: "100%" },
  { scale: 0.7, zIndex: 1, opacity: 0.5, x: "180%" },
];

function wrap(index, total) {
  return (index + total) % total;
}

export default function MediaCarousel({ posts }) {
  const [center, setCenter] = useState(0);

  if (posts.length < 5) return null;

  const visible = [-2, -1, 0, 1, 2].map((offset, slot) => ({
    post: posts[wrap(center + offset, posts.length)],
    style: SLOT_STYLES[slot],
    slot,
  }));

  return (
    <div
      style={{
        background: "#111",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ position: "relative", width: 700, height: 420 }}>
        {visible.map(({ post, style, slot }) => (
          <a
            key={post.id}
            href={slot === 2 ? post.link : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (slot === 1) {
                e.preventDefault();
                setCenter((c) => wrap(c - 1, posts.length));
              }
              if (slot === 3) {
                e.preventDefault();
                setCenter((c) => wrap(c + 1, posts.length));
              }
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 220,
              display: "block",
              textDecoration: "none",
              transform: `translate(-50%, -50%) translateX(${style.x}) scale(${style.scale})`,
              zIndex: style.zIndex,
              opacity: style.opacity,
              transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              borderRadius: 16,
              overflow: "hidden",
              cursor:
                slot === 2
                  ? "pointer"
                  : slot === 1 || slot === 3
                    ? "pointer"
                    : "default",
              boxShadow:
                slot === 2
                  ? "0 20px 60px rgba(0,0,0,0.6)"
                  : "0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                width: "100%",
                paddingBottom: "160%",
                position: "relative",
                background: "#222",
              }}
            >
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.caption}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 48,
                  }}
                >
                  🍪
                </span>
              )}
            </div>

            {/* Overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                padding: "32px 12px 12px",
                color: "#fff",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: 13 }}>
                {post.username}
              </div>
              <div style={{ fontSize: 11, opacity: 0.85, margin: "2px 0 6px" }}>
                {post.caption}
              </div>
              <div style={{ fontSize: 12 }}>❤️ {post.likes}</div>
            </div>
          </a>
        ))}
      </div>

      {/* Arrows */}
      {[
        {
          label: "<",
          side: "left",
          onClick: () => setCenter((c) => wrap(c - 1, posts.length)),
        },
        {
          label: ">",
          side: "right",
          onClick: () => setCenter((c) => wrap(c + 1, posts.length)),
        },
      ].map(({ label, side, onClick }) => (
        <button
          key={side}
          onClick={onClick}
          style={{
            position: "absolute",
            [side]: 24,
            top: "50%",
            transform: "translateY(-50%)",
            background: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 44,
            height: 44,
            fontSize: 18,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
