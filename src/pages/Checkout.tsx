import React from "react";

export const Checkout = () => {
  return (
    <div className="w-[90%] max-w-7xl mx-auto mt-16">

      {/* Breadcrumb */}
      <p className="text-sm text-gray-400 mb-8">
        Product / View Cart / <span className="text-black">Checkout</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT — Billing Details */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>

          <div className="space-y-4">
            {[
              "First name",
              "Last name",
              "Street address",
              "Apartment, floor, etc. (optional)",
              "Town/City",
              "Phone number",
              "Email address",
            ].map((item, i) => (
              <input
                key={i}
                type="text"
                placeholder={item}
                className="w-full border rounded px-4 py-3 focus:outline-none focus:border-red-500"
              />
            ))}
          </div>

          <label className="flex items-center gap-2 mt-6 text-sm">
            <input type="checkbox" className="accent-red-500" />
            Save this information for faster check-out next time
          </label>
        </div>

        {/* RIGHT — Order Summary */}
        <div className="border rounded-lg p-6 h-fit">

          {/* Products */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>LCD Monitor</span>
              <span>$650</span>
            </div>

            <div className="flex justify-between items-center">
              <span>H1 Gamepad</span>
              <span>$1100</span>
            </div>
          </div>

          <hr className="my-6" />

          {/* Prices */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>$1750</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>$1750</span>
            </div>
          </div>

          {/* Payment */}
          <div className="mt-6 space-y-3">
            <label className="flex items-center gap-2">
              <input type="radio" name="pay" defaultChecked />
              Bank
            </label>

            <div className="flex gap-3 ml-6">
              <img src="/visa.png" alt="" className="h-6" />
              <img src="/master.png" alt="" className="h-6" />
            </div>

            <label className="flex items-center gap-2">
              <input type="radio" name="pay" />
              Cash on delivery
            </label>
          </div>

          {/* Coupon */}
          <div className="flex gap-3 mt-6">
            <input
              type="text"
              placeholder="Coupon Code"
              className="border px-4 py-2 rounded w-full focus:outline-none focus:border-red-500"
            />
            <button className="border border-red-500 text-red-500 px-5 rounded hover:bg-red-500 hover:text-white transition">
              Apply
            </button>
          </div>

          <button className="w-full mt-6 bg-red-500 text-white py-3 rounded hover:bg-red-600 transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};








