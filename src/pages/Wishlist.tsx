import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWishlist, toggleWishlist } from "../store/api/cardApi/cart";
import type { Product } from "../store/api/cardApi/types";
import { Eye } from "lucide-react";
import imgHeart from "../assets/heart small.png";

export const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleRemove = (product: Product) => {
    const updated = toggleWishlist(product); // toggle removes if exists
    setWishlist(updated);
  };

  if (wishlist.length === 0)
    return <p className="text-center mt-10">Wishlist is empty 😔</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {wishlist.map(item => (
          <div key={item.id} className="relative border p-4 rounded group">
            {/* Remove from wishlist */}
            <button
              onClick={() => handleRemove(item)}
              className="absolute top-2 right-2 text-red-500"
            >
              <img src={imgHeart} alt="remove wishlist" />
            </button>

            {/* Link to product details */}
            <Link to={`/product/${item.id}`}>
              <img
                src={`https://store-api.softclub.tj/images/${item.image}`}
                className="h-36 mx-auto group-hover:scale-110 transition-transform duration-200"
              />
            </Link>

            {/* Eye icon */}
            <Link
              to={`/product/${item.id}`}
              className="absolute top-2 left-2 text-black"
            >
              <Eye />
            </Link>

            <p className="mt-2 font-medium">{item.productName}</p>
            <span className="text-red-500 font-bold">
              ${item.discountPrice ?? item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
