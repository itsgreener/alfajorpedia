import { useMemo, useRef, useState } from "react";
import SocialPost from "../Cards/SocialPost.jsx";
import "./MediaCarousel.css";

function MediaCarousel({ posts = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trackStep, setTrackStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasTransition, setHasTransition] = useState(true);
  const directionRef = useRef(0);

  if (posts.length < 5) return null;

  function getSafeIndex(index) {
    return (index + posts.length) % posts.length;
  }

  const visiblePosts = useMemo(() => {
    const offsets = [-3, -2, -1, 0, 1, 2, 3];

    return offsets.map((offset, slotIndex) => {
      const realIndex = getSafeIndex(currentIndex + offset);

      return {
        ...posts[realIndex],
        slotIndex,
      };
    });
  }, [currentIndex, posts]);

  function handleNext() {
    if (isAnimating) return;
    directionRef.current = 1;
    setIsAnimating(true);
    setHasTransition(true);
    setTrackStep(-2);
  }

  function handlePrev() {
    if (isAnimating) return;
    directionRef.current = -1;
    setIsAnimating(true);
    setHasTransition(true);
    setTrackStep(0);
  }

  function handleTransitionEnd() {
    if (!isAnimating) return;

    setHasTransition(false);
    setCurrentIndex((prev) => prev + directionRef.current);
    setTrackStep(-1);
    setIsAnimating(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setHasTransition(true);
      });
    });
  }

  function getPosition(slotIndex) {
  if (slotIndex === 3) return "center";
  if (slotIndex === 2 || slotIndex === 4) return "side";
  if (slotIndex === 1 || slotIndex === 5) return "far";
  return "outer"; 
}

  return (
    <div className="media-carousel">
      <button
        type="button"
        className="carousel-arrow carousel-arrow-left"
        onClick={handlePrev}
        aria-label="Anterior"
      >
        &lt;
      </button>

      <div className="carousel-viewport">
        <div
          className={`carousel-track ${hasTransition ? "with-transition" : "no-transition"}`}
          style={{
            transform: `translateX(calc(${trackStep} * var(--slot-total)))`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {visiblePosts.map((post) => (
            <div className="carousel-slot" key={`${post.id}-${post.slotIndex}`}>
              <SocialPost position={getPosition(post.slotIndex)} />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="carousel-arrow carousel-arrow-right"
        onClick={handleNext}
        aria-label="Siguiente"
      >
        &gt;
      </button>
    </div>
  );
}

export default MediaCarousel;