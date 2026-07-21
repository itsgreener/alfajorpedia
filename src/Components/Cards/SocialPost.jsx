import { useEffect, useRef, useState } from "react";
import styles from "./SocialPost.module.css";

export default function SocialPost({ isNostalgia, data, videoRef, isActive }) {
  const [muted, setMuted] = useState(true);
  const localVideoRef = useRef(null);

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
