import { useEffect, useRef, useState } from "react";
import styles from "./SocialPost.module.css";

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
              className={styles.socialPostImage}
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
                className={styles.videoSoundOverlay}
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
            className={styles.socialPostImage}
          />
        )
      ) : (
        <img src={data.image} alt="post" className={styles.socialPostImage} />
      )}

      <div className={styles.socialPostOverlay} />

      <div className={styles.socialPostContent}>
        <p className={styles.socialPostUsername}>{data.username}</p>
        <p className={styles.socialPostText}>{data.caption}</p>

        {/*}    <div className={styles.socialPostLikes}>
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
          <span className={styles.socialPostLikesCount}>{data.likes}</span>
        </div>*/}
      </div>
    </>
  );

  return (
    <div
      className={
        isNostalgia
          ? `${styles.nostalgiaPost} card hover`
          : `${styles.socialPost} card hover`
      }
    >
      {data.type === "image" && data.link ? (
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialPostLink}
        >
          {content}
        </a>
      ) : (
        <div className={styles.socialPostLink}>{content}</div>
      )}
    </div>
  );
}
