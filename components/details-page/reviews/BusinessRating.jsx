import { usePathname } from "next/navigation";
import { Rating } from "react-simple-star-rating";

export default function BusinessRating({ rating, updateRating }) {
  const handleRating = (rate) => {
    updateRating(rate);
  };

  return <Rating initialValue={rating} onClick={handleRating} />;
}
