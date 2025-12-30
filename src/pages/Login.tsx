import { useState } from "react";
import imgGoogle from "../assets/Icon-Google.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/api/authApi/auth";
import { setToken } from "../store/api/slices/authSlice";



export const Login = () => {
  const [form, setForm] = useState({ userName: "", password: "" });
  const [loginj, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(form).unwrap();
      dispatch(setToken(res.token));
      setInterval(() => {
      }, 2000);
    } catch (err) {
      console.error("Login failed", err);
    }
  };
  async function login() {
    try {
      let res = await fetch("https://store-api.softclub.tj/Account/login", { method: "POST", headers: { "Content-type": "application/json" }, body:JSON.stringify(form) })
      let data = await res.json()
      localStorage.setItem("token", data.data)
      console.log(`success ${data.data}`)
      setTimeout(() => {
        navigate("/");        
      }, 2000)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="w-[30%] m-auto h-[100vh] mt-[60px]">
      <h1 className="text-[30px] font-bold">Log in to Exclusive</h1>
      <p>Enter your details below</p>

      <form onSubmit={handleSubmit} className="flex flex-col mt-4 gap-4">
        <input
          type="text"
          placeholder="Email or phone number"
          value={form.userName}
          onChange={(e) => setForm({ ...form, userName: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border p-2 rounded"
        />
        <div className="text-[#DB4444] cursor-pointer">Forget Password?</div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#DB4444] text-white p-2 rounded"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="text-red-500">Login failed</p>}
        <div className="flex items-center justify-center gap-2 border p-2 mt-2 rounded cursor-pointer hover:bg-gray-100">
          <img src={imgGoogle} alt="google" className="w-5 h-5" />
          <p>Sign in with Google</p>
        </div>
      </form>
    </div>
  );
};
