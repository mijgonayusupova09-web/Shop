import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API } from "../utils/api";
import { message, Modal } from "antd";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  userName?: string;
}

export const Account = () => {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    Modal.confirm({
      title: "Log out",
      content: "Are you sure you want to log out?",
      okText: "Yes",
      cancelText: "Cancel",
      okType: "danger",
      onOk: () => {
        localStorage.removeItem("token");
        message.success("Logged out successfully");
        navigate("/");
      },
    });
  };

  const getProfile = async () => {
    try {
      if (!token) return;

      const decode: any = jwtDecode(token);

      const res = await axios.get(
        `${API}/UserProfile/get-user-profile-by-id?id=${decode.sid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data.data;

      setUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address || "",
        userName: data.userName,
      });
    } catch (error) {
      message.error("Failed to load profile");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleSave = () => {
    message.success("Profile updated successfully");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="bg-white rounded-2xl shadow p-6 space-y-8">
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">
              Manage My Account
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-red-500 font-medium cursor-pointer">
                My Profile
              </li>
              <li className="text-gray-500 hover:text-red-500 cursor-pointer">
                Address Book
              </li>
              <li className="text-gray-500 hover:text-red-500 cursor-pointer">
                Payment Options
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-800">My Orders</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-red-500 cursor-pointer">
                My Returns
              </li>
              <li className="hover:text-red-500 cursor-pointer">
                My Cancellations
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 cursor-pointer hover:text-red-500">
              My Wishlist
            </h3>
          </div>
        </aside>
        <section className="lg:col-span-3 bg-white rounded-2xl shadow p-8">
          <h2 className="text-xl font-semibold text-red-500 mb-8">
            Profile Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              { label: "First Name", key: "firstName" },
              { label: "Last Name", key: "lastName" },
              { label: "Email Address", key: "email" },
              { label: "Street Address", key: "address" },
            ].map((field: any) => (
              <div key={field.key}>
                <label className="text-sm text-gray-500">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={(user as any)[field.key]}
                  onChange={(e) =>
                    setUser({ ...user, [field.key]: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                />
              </div>
            ))}
          </div>
          <h3 className="font-semibold text-gray-800 mb-4">
            Password Changes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <input
              type="password"
              placeholder="Current password"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
            <div></div>
            <input
              type="password"
              placeholder="New password"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>
          <div className="flex flex-wrap justify-end gap-4">
            <button className="px-6 py-2 rounded-lg border text-gray-500 hover:bg-gray-100 transition">
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Save Changes
            </button>

            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Log out
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
