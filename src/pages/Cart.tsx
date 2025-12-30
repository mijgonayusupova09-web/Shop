import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../store/api/cardApi/types";
import { ShoppingCart } from "lucide-react";
import { getCart } from "../store/api/cardApi/cart";

export const Cart = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (product: Product) => {
    removeFromCart(product);
    setCart(getCart());
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-100 mb-4">
          <ShoppingCart size={48} className="text-gray-400" />
        </div>

        <h2 className="text-2xl font-semibold mb-2">
          Your cart is empty
        </h2>

        <p className="text-gray-500 mb-6">
          Looks like you haven’t added anything to your cart yet
        </p>

        <Link to="/shop">
          <button className="bg-[#DB4444] text-white px-6 py-2 rounded-lg hover:bg-red-600 transition">
            Go to Shop
          </button>
        </Link>
      </div>
    );
  }

  /* ===== TOTAL ===== */
  const total = cart.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <h2 className="text-2xl font-bold mb-6">My Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 border rounded-lg p-4 bg-white shadow-sm"
          >
            <img
              src={`https://store-api.softclub.tj/images/${item.image}`}
              className="h-28 w-28 object-contain rounded bg-gray-50"
            />

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="font-medium text-lg">
                  {item.productName}
                </p>
                <span className="text-red-500 font-bold">
                  ${item.discountPrice ?? item.price}
                </span>
              </div>

              <button
                onClick={() => handleRemove(item)}
                className="self-start mt-2 text-sm bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <h3 className="text-xl font-semibold">
          Total: <span className="text-red-500">${total}</span>
        </h3>

        <Link to="/checkout">
          <button className="bg-amber-400 px-6 py-2 rounded-lg hover:bg-amber-500 transition font-medium">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};
