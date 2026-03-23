import "./SocialPost.css";
import { useState } from "react";



export default function SocialPost({ isNostalgia, data, videoRef, isActive }) {
  const [muted, setMuted] = useState(true);
  const content = (
    <>
      {data.type === "video" ? (
        <video
          ref={videoRef}
          className="social-post-image"
          src={data.src}
           poster={data.poster}
          muted={muted}
          playsInline
          loop
          preload={isActive ? "auto" : "metadata"}
          controls={false}
          onClick={(e) => {
            e.stopPropagation();

            if (!isActive) return;

            const video = e.currentTarget;

            if (muted) {
              video.muted = false;
              video.play().catch(() => {});
              setMuted(false);
            } else {
              video.muted = true;
              setMuted(true);
            }
          }}
        />
      ) : (
        <img src={data.image} alt="post" className="social-post-image" />
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
