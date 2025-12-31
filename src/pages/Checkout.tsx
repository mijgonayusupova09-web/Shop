import { useState, useEffect } from "react";
import { getCart } from "../store/api/cardApi/cart"; 

export const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phoneNumber: "",
    email: "",
  });

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = getCart();
    setCartItems(items);
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePlaceOrder = async () => {
    const BOT_TOKEN = "8220611254:AAGA2gDAqsgWJY0dx84ORHxe-zHVFyGReBI"; 
    const CHAT_ID = "-1003579849591";     

    if (!formData.firstName || !formData.phoneNumber) {
      alert("Please fill in at least your Name and Phone Number.");
      return;
    }

    let message = `🛒 *New Order Received!*\n\n`;
    
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${formData.firstName} ${formData.lastName}\n`;
    message += `Phone: ${formData.phoneNumber}\n`;
    message += `Address: ${formData.streetAddress}, ${formData.city}\n\n`;

    message += `📦 *Order Summary:*\n`;
    
    cartItems.forEach((item) => {
      const finalPrice = item.discountPrice ?? item.price;
      message += `- ${item.productName} (x${item.quantity}): $${finalPrice * item.quantity}\n`;
    });
    
    message += `\n💰 *Total Amount: $${total}*`;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      if (response.ok) {
        alert("Order placed successfully!");
        // Optional: clear cart here using removeAll() if you want
      } else {
        alert("Failed to send order.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const inputFields = [
    { label: "First name", name: "firstName" },
    { label: "Last name", name: "lastName" },
    { label: "Street address", name: "streetAddress" },
    { label: "Apartment, floor, etc. (optional)", name: "apartment" },
    { label: "Town/City", name: "city" },
    { label: "Phone number", name: "phoneNumber" },
    { label: "Email address", name: "email" },
  ];

  return (
    <div className="w-[90%] max-w-7xl mx-auto mt-16">
      <p className="text-sm text-gray-400 mb-8">
        Product / View Cart / <span className="text-black">Checkout</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
          <div className="space-y-4">
            {inputFields.map((field, i) => (
              <input
                key={i}
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.label}
                className="w-full border rounded px-4 py-3 focus:outline-none focus:border-red-500"
              />
            ))}
          </div>
        </div>
        <div className="border rounded-lg p-6 h-fit">
          <h3 className="text-lg font-medium mb-4">Your Order</h3>
          
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 italic">No items in cart.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://store-api.softclub.tj/images/${item.image}`} 
                      alt={item.productName}
                      className="w-8 h-8 object-contain"
                    />
                    <span>{item.productName} <span className="text-gray-400">x{item.quantity}</span></span>
                  </div>
                  <span>${(item.discountPrice ?? item.price) * item.quantity}</span>
                </div>
              ))
            )}
          </div>

          <hr className="my-6" />
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <label className="flex items-center gap-2">
              <input type="radio" name="pay" defaultChecked />
              Bank
            </label>
            <div className="flex gap-3 ml-6">
              <img src="/visa.png" alt="Visa" className="h-6" />
              <img src="/master.png" alt="Mastercard" className="h-6" />
            </div>
            <label className="flex items-center gap-2">
              <input type="radio" name="pay" />
              Cash on delivery
            </label>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={cartItems.length === 0}
            className={`w-full mt-6 text-white py-3 rounded transition ${
              cartItems.length === 0 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};