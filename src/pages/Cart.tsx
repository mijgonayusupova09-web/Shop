import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../store/api/cardApi/types";
import { getCart } from "../store/api/cardApi/cart";

export const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (product: Product) => {
    removeFromCart (product);
    setCart(getCart());
  };

  if (cart.length === 0)
    return <p className="text-center mt-10">Cart is empty 😔</p>;

  const total = cart.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <h2 className="text-2xl font-bold mb-6">My Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cart.map(item => (
          <div key={item.id} className="flex border p-4 rounded">
            <img
              src={`https://store-api.softclub.tj/images/${item.image}`}
              className="h-28 w-28 object-cover rounded"
            />
            <div className="ml-4 flex-1">
              <p className="font-medium">{item.productName}</p>
              <span className="text-red-500 font-bold">
                ${item.discountPrice ?? item.price}
              </span>
              <div className="mt-2">
                <button
                  onClick={() => handleRemove(item)}
                  className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right font-bold text-xl">
        Total: ${total}
      </div>

      <div className="flex justify-end mt-4">
        <Link to="/checkout">
          <button className="bg-amber-400 px-6 py-2 rounded hover:bg-amber-500 transition">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};
