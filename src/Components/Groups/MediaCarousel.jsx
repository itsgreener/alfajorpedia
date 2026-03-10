import { useState } from "react";
import "./MediaCarousel.css";

const SLOT_CONFIG = [
  { x: "-180%", scale: 0.7,  opacity: 0.5,  z: 1, cursor: "default"  },
  { x: "-100%", scale: 0.85, opacity: 0.75, z: 2, cursor: "pointer"  },
  { x: "0%",    scale: 1,    opacity: 1,    z: 3, cursor: "pointer",
    shadow: "0 20px 60px rgba(0,0,0,0.6)" },
  { x: "100%",  scale: 0.85, opacity: 0.75, z: 2, cursor: "pointer"  },
  { x: "180%",  scale: 0.7,  opacity: 0.5,  z: 1, cursor: "default"  },
];

function wrap(index, total) {
  return (index + total) % total;
}

export default function MediaCarousel({ posts }) {
  const [center, setCenter] = useState(0);

  if (posts.length < 5) return null;

  const visible = [-2, -1, 0, 1, 2].map((offset, slot) => ({
    post: posts[wrap(center + offset, posts.length)],
    cfg: SLOT_CONFIG[slot],
    slot,
  }));

  return (
    <div className="carousel-wrapper">
      <div className="carousel-stage">
        {visible.map(({ post, cfg, slot }) => (
          <a
            key={post.id}
            href={slot === 2 ? post.link : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (slot === 1) { e.preventDefault(); setCenter((c) => wrap(c - 1, posts.length)); }
              if (slot === 3) { e.preventDefault(); setCenter((c) => wrap(c + 1, posts.length)); }
            }}
            className="carousel-card"
            style={{
              "--card-x":      cfg.x,
              "--card-scale":  cfg.scale,
              "--card-opacity": cfg.opacity,
              "--card-z":      cfg.z,
              "--card-cursor": cfg.cursor,
              "--card-shadow": cfg.shadow ?? "0 8px 24px rgba(0,0,0,0.4)",
            }}
          >
            <div className="carousel-card__media">
              {post.image ? (
                <img src={post.image} alt={post.caption} className="carousel-card__img" />
              ) : (
                <span className="carousel-card__placeholder">🍪</span>
              )}
            </div>

            <div className="carousel-card__overlay">
              <div className="carousel-card__username">{post.username}</div>
              <div className="carousel-card__caption">{post.caption}</div>
              <div className="carousel-card__likes">❤️ {post.likes}</div>
            </div>
          </a>
        ))}
      </div>

      <button className="carousel-btn carousel-btn--prev" onClick={() => setCenter((c) => wrap(c - 1, posts.length))}>‹</button>
      <button className="carousel-btn carousel-btn--next" onClick={() => setCenter((c) => wrap(c + 1, posts.length))}>›</button>
    </div>
  );
}