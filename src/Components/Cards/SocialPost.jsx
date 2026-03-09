import "./SocialPost.css";

function SocialPost({ position = "side" }) {
  return (
    <article className={`social-post social-post-${position}`}>
      <div className="social-post-media" />
    </article>
  );
}

export default SocialPost;