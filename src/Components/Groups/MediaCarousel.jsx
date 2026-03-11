import { useMemo, useState } from "react";
import SocialPost from "../Cards/SocialPost";
import "./MediaCarousel.css";

const SLOT_ORDER = [-2, -1, 0, 1, 2];

function wrap(index, total) {
  return (index + total) % total;
}

function getVariant(offset) {
  if (offset === 0) return "center";
  if (offset === -1) return "left";
  if (offset === 1) return "right";
  if (offset === -2) return "far-left";
  return "far-right";
}

export default function MediaCarousel({ posts = [] }) {
  const [center, setCenter] = useState(0);

  const visiblePosts = useMemo(() => {
    if (posts.length < 5) return [];
    return SLOT_ORDER.map((offset) => ({
      offset,
      post: posts[wrap(center + offset, posts.length)],
    }));
  }, [center, posts]);

  if (posts.length < 5) return null;

  const goPrev = () => setCenter((prev) => wrap(prev - 1, posts.length));
  const goNext = () => setCenter((prev) => wrap(prev + 1, posts.length));

  return (
    <div className="media-carousel">
      <button
        type="button"
        className="media-carousel__btn media-carousel__btn--prev"
        onClick={goPrev}
        aria-label="Anterior"
      >
        ‹
      </button>

      <div className="media-carousel__viewport">
        <div className="media-carousel__track">
          {visiblePosts.map(({ post, offset }) => (
            <SocialPost
              key={`${post.id}-${offset}`}
              post={post}
              variant={getVariant(offset)}
              onClick={() => {
                if (offset < 0) goPrev();
                if (offset > 0) goNext();
                if (offset === 0 && post.link) {
                  window.open(post.link, "_blank", "noopener,noreferrer");
                }
              }}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        className="media-carousel__btn media-carousel__btn--next"
        onClick={goNext}
        aria-label="Siguiente"
      >
        ›
      </button>
    </div>
  );
}