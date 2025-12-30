import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/api/authApi/auth";
import { setToken } from "../store/api/slices/authSlice";

const Register = () => {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register(form).unwrap();
      dispatch(setToken(res.token));
      navigate("/");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[30%] m-auto mt-20">
      <input
        placeholder="Full Name"
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="bg-[#DB4444] text-white p-2 rounded"
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
      {error && <p className="text-red-500">Registration failed</p>}
    </form>
  );
};

export default Register;
