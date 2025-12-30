import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "../components/layout/ui/Loader";
import { addToCart, toggleWishlist, getWishlist } from "../store/api/cardApi/cart";
import { useGetProductByIdQuery } from "../store/api/productApi/product";
import imgHeart from "../assets/heart small.png";

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductByIdQuery(Number(id));

  if (isLoading || !product) return <Loader />;

  const wishlist = getWishlist();
  const isWishlisted = wishlist.some(p => p.id === product.id);

  const handleWishlist = () => {
    toggleWishlist(product);
    // force update UI
    window.dispatchEvent(new Event("storage"));
  };

  const handleAddToCart = () => {
    if (!localStorage.getItem("token")) {
      alert("Login required! Please login to add to cart.");
      return;
    }
    addToCart(product);
    alert(`${product.productName} added to cart`);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 mt-10">
      <motion.img
        src={`https://store-api.softclub.tj/images/${product.image}`}
        className="bg-gray-100 p-10 rounded"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <div>
        <h1 className="text-2xl font-bold">{product.productName}</h1>
        <p className="mt-4 text-gray-600">{product.description}</p>

        <div className="text-2xl text-red-500 mt-6">
          ${product.discountPrice ?? product.price}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddToCart}
            className="bg-red-500 text-white px-6 py-2 rounded"
          >
            Buy Now
          </button>

          <button
            onClick={handleWishlist}
            className={`border px-4 py-2 rounded text-2xl transition-colors duration-200 ${
              isWishlisted ? "text-red-500" : "text-gray-500"
            }`}
          >
            <img src={imgHeart} alt="wishlist" />
          </button>
        </div>
      </div>
    </div>
  );
};
