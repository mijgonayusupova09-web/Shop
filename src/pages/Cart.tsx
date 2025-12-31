import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { CartItem } from "../store/api/cardApi/types";
import { ShoppingCart, Trash2 } from "lucide-react";
import { getCart, removeItem, removeAll } from "../store/api/cardApi/cart";

export const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (id: number) => {
    removeItem(id);
    setCart(getCart());
  };

  const handleClearAll = () => {
    removeAll();
    setCart([]);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 flex items-center justify-center rounded-full bg-red-100 mb-4 shadow">
          <ShoppingCart size={48} className="text-red-400" />
        </div>

        <h2 className="text-2xl font-semibold mb-2 text-red-600">
          Your cart is empty
        </h2>

        <p className="text-gray-500 mb-6 max-w-md">
          Looks like you haven’t added anything to your cart yet
        </p>

        <Link to="/shop">
          <button className="bg-red-500 text-white px-8 py-2 rounded-full hover:bg-red-600 transition shadow">
            Go to Shop
          </button>
        </Link>
      </div>
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-red-600">My Cart</h2>

        <button
          onClick={handleClearAll}
          className="flex items-center gap-2 bg-red-100 text-red-600 px-5 py-2 rounded-full hover:bg-red-200 transition font-medium"
        >
          <Trash2 size={18} />
          Clear All
        </button>
      </div>
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col sm:flex-row gap-6 bg-white border rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="w-full sm:w-32 h-32 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src={`https://store-api.softclub.tj/images/${item.image}`}
                className="h-24 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.productName}
                </h3>

                <p className="text-sm text-gray-500 mb-2">
                  Quantity: <span className="font-medium">{item.quantity}</span>
                </p>

                <p className="text-xl font-bold text-red-500">
                  ${(item.discountPrice ?? item.price) * item.quantity}
                </p>
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="mt-4 sm:mt-0 self-start flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition"
              >
                <Trash2 size={16} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 border-t pt-6">
        <h3 className="text-2xl font-semibold text-gray-800">
          Total:{" "}
          <span className="text-red-600 font-bold">
            ${total}
          </span>
        </h3>

        <Link to="/checkout" className="w-full md:w-auto">
          <button className="w-full md:w-auto bg-red-500 px-10 py-3 rounded-full hover:bg-red-600 transition font-medium text-white shadow-lg">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};
