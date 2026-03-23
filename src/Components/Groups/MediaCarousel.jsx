import { useCallback, useEffect, useRef, useState } from "react";
import { socialPosts } from "../../Assets/Data.js";
import SocialPost from "../Cards/SocialPost";
import "./MediaCarousel.css";

function getCardStyle(offset) {
  const absOffset = Math.abs(offset);
  const scale = 1 - absOffset * 0.05;
  const darkness = absOffset * 0.15;
  const translateX = offset * 105;
  const translateY = absOffset * 8;
  const visible = absOffset <= 2;

  return {
    transform: `translateX(${translateX}%) scale(${scale}) translateY(${translateY}px)`,
    filter: darkness > 0 ? `brightness(${1 - darkness})` : "none",
    zIndex: 10 - absOffset,
    transition:
      "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.45s ease, opacity 0.45s ease",
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? "auto" : "none",
  };
}

function SocialCarousel({ isNostalgia }) {
  const [centerIndex, setCenterIndex] = useState(Math.floor(socialPosts.length / 2));
  const dragStartX = useRef(null);
  const isDragging = useRef(false);
  const videoRefs = useRef([]);
  const total = socialPosts.length;

  const prev = useCallback(() => {
    setCenterIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setCenterIndex((i) => (i + 1) % total);
  }, [total]);

  const getOffset = (itemIndex) => {
    let offset = itemIndex - centerIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

 useEffect(() => {
  videoRefs.current.forEach((video, i) => {
    if (!video) return;

    if (i === centerIndex) {
      video.currentTime = 0;
      video.muted = true;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
      video.muted = true;
    }
  });
}, [centerIndex]);

  const handlePointerDown = (e) => {
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX;
    isDragging.current = false;
  };

  const handlePointerMove = (e) => {
    if (dragStartX.current === null) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    if (Math.abs(x - dragStartX.current) > 5) isDragging.current = true;
  };

  const handlePointerUp = (e) => {
    if (dragStartX.current === null) return;
    const x = e.clientX ?? e.changedTouches?.[0]?.clientX;
    const delta = x - dragStartX.current;

    if (isDragging.current && Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }

    dragStartX.current = null;
    isDragging.current = false;
  };

  return (
    <div className="media-carousel">
      <div
        className={
          isNostalgia ? "carousel-track-nostalgia" : "carousel-track-social"
        }
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        {socialPosts.map((item, i) => {
          const offset = getOffset(i);
          const isActive = offset === 0;

          return (
            <div
              key={item.id}
              className="carousel-slot"
              style={getCardStyle(offset)}
              onClick={() => {
                if (!isDragging.current && offset !== 0) {
                  offset < 0 ? prev() : next();
                }
              }}
            >
              <SocialPost
                data={item}
                isNostalgia={isNostalgia}
                isActive={isActive}
                videoRef={(el) => {
                  videoRefs.current[i] = el;
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button
          className={
            isNostalgia ? "carousel-btn-nostalgia" : "carousel-btn-social"
          }
          onClick={prev}
          aria-label="Anterior"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div
          className={
            isNostalgia ? "carousel-dots-nostalgia" : "carousel-dots-social"
          }
        >
          {socialPosts.map((_, i) => (
            <button
              key={i}
              className={
                isNostalgia
                  ? `carousel-dot-nostalgia${i === centerIndex ? " carousel-dot-nostalgia--active" : ""}`
                  : `carousel-dot-social${i === centerIndex ? " carousel-dot-social--active" : ""}`
              }
              onClick={() => setCenterIndex(i)}
              aria-label={`Ir a ${i + 1}`}
            />
          ))}
        </div>

        <button
          className={
            isNostalgia ? "carousel-btn-nostalgia" : "carousel-btn-social"
          }
          onClick={next}
          aria-label="Siguiente"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SocialCarousel;