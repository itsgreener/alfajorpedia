import { socialPosts } from "../../Assets/Data.js";
import SocialPost from "../Cards/SocialPost";
import "./MediaCarousel.css";

export default function MediaCarousel({ isNostalgia }) {
  return (
    <div className="media-carousel">
      <SocialPost isNostalgia={isNostalgia} data={socialPosts[0]} />
    </div>
  );
}
