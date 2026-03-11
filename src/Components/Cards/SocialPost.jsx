import "./SocialPost.css";

export default function SocialPost({
  post,
  variant = "",
  onClick,
}) {
  return (
    <article
      className={`social-post social-post--${variant}`}
      onClick={onClick}
    >
      <div className="social-post__media">
        {post.image ? (
          <img
            src={post.image}
            alt={post.caption || post.username}
            className="social-post__img"
          />
        ) : (
          <div className="social-post__placeholder">🍪</div>
        )}
      </div>

      <div className="social-post__overlay">
        <p className="social-post__user">@{post.username}</p>
        <p className="social-post__caption">{post.caption}</p>
        <p className="social-post__likes">❤️ {post.likes}</p>
      </div>
    </article>
  );
}