import { motion } from "framer-motion";
import imgCart from "../../assets/Cart1 (1).png";
import star from "../../assets/Five star.png";
import { addToCart, toggleWishlist } from "../../store/api/cardApi/cart";

export const Crud = ({ product, onUpdate }) => {
  const remove = () => {
    toggleWishlist(product);
    onUpdate();
    window.dispatchEvent(new Event("storage"));
  };

  const add = () => {
    addToCart(product);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -40 }}
      className="bg-white rounded-xl shadow p-4"
    >
      <div className="relative bg-[#f7f7f7] h-[200px] rounded-xl">
        <button onClick={remove} className="absolute top-2 right-2 bg-white rounded-full px-2">✕</button>
        <img
          src={`https://store-api.softclub.tj/images/${product.image}`}
          className="h-full mx-auto p-6"
        />
      </div>

      <button onClick={add} className="w-full mt-4 bg-black text-white py-2 rounded hover:bg-[#DB4444]">
        <img src={imgCart} className="w-5 inline mr-2" />
        Add To Cart
      </button>

      <h2 className="mt-3 font-semibold">{product.productName}</h2>
      <span className="text-[#DB4444] font-bold">
        ${product.discountPrice ?? product.price}
      </span>

      <div className="flex gap-2 mt-2">
        <img src={star} className="w-20" />
        <span>(88)</span>
      </div>
    </motion.div>
  );
};
