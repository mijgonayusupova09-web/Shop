import { useState } from "react";
import imgGoogle from "../assets/Icon-Google.png";
import { Link } from "react-router-dom";

export const Login = () => {
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Log in to Exclusive
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter your details below
        </p>

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Email or Phone
            </label>
            <input
              type="text"
              placeholder="example@mail.com"
              value={form.userName}
              onChange={(e) =>
                setForm({ ...form, userName: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-red-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="button"
            className="w-full bg-[#DB4444] hover:bg-red-600 text-white py-2.5 rounded-lg font-semibold transition"
          >
            Login
          </button>
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="flex items-center justify-center gap-3 border rounded-lg py-2.5 cursor-pointer hover:bg-gray-100 transition">
            <img src={imgGoogle} alt="google" className="w-5 h-5" />
            <p className="text-sm font-medium">Sign in with Google</p>
          </div>
          <p className="text-sm text-center text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-red-500 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
