import "./SocialPost.css";
import { useEffect, useRef, useState } from "react";



export default function SocialPost({ isNostalgia, data, videoRef, isActive }) {
  const [muted, setMuted] = useState(true);
   const localVideoRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      setMuted(true);
    }
  }, [isActive]);
   useEffect(() => {
    if (localVideoRef.current) {
      localVideoRef.current.muted = muted;
    }
  }, [muted]);

  const setRefs = (el) => {
    localVideoRef.current = el;
    if (videoRef) videoRef(el);
  };

  const handleVideoClick = (e) => {
    console.log("click video");
    e.stopPropagation();

    if (!isActive || !localVideoRef.current) return;

    const video = localVideoRef.current;

    if (video.muted) {
    video.muted = false;
    video.volume = 1;
    video.play().catch(console.error);
    setMuted(false);
  } else {
    video.muted = true;
    setMuted(true);
  }
};
  const content = (
    <>
      {data.type === "video" ? (
          isActive ? (
    <>
      <video
        ref={setRefs}
        className="social-post-image"
        src={data.src}
        poster={data.poster}
        muted={muted}
        playsInline
        loop
        preload="auto"
        controls={false}
        onClick={handleVideoClick}
      />

      {isActive && muted && (
        <div
          className="video-sound-overlay"
          onClick={(e) => {
            e.stopPropagation();
            handleVideoClick(e);
          }}
        >
          🔊 Activar sonido
        </div>
      )}
    </>
  ) : (
    <img
      src={data.poster}
      alt="video poster"
      className="social-post-image"
    />
  )
) : (
  <img
    src={data.image}
    alt="post"
    className="social-post-image"
  />
)}

      <div className="social-post-overlay" />

      <div className="social-post-content">
        <p className="social-post-username">{data.username}</p>
        <p className="social-post-text">{data.caption}</p>

        {/*}    <div className="social-post-likes">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21 C12 21 2 14 2 7.5 C2 4.5 4.5 2 7.5 2 C9.2 2 10.7 2.9 12 4.2 C13.3 2.9 14.8 2 16.5 2 C19.5 2 22 4.5 22 7.5 C22 14 12 21 12 21Z"
              fill="#ef4444"
            />
          </svg>
          <span className="social-post-likes-count">{data.likes}</span>
        </div>*/}
      </div>
    </>
  );

  return (
    <div
      className={
        isNostalgia ? "card hover nostalgia-post" : "card hover social-post"
      }
    >
      {data.type === "image" && data.link ? (
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="social-post-link"
        >
          {content}
        </a>
      ) : (
        <div className="social-post-link">{content}</div>
      )}
    </div>
  );
}
