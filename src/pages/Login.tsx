import { useState } from "react";
import { Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/api/authApi/auth";

export const Login = () => {
  const [form, setForm] = useState({ userName: "", password: "" });
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await login(form).unwrap();
      localStorage.setItem("token", response.data);
           console.log(response);
           
      setIsModalVisible(true);
      navigate("/")
    } catch (err: any) {
      alert(err?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Log in to Exclusive</h1>
        <p className="text-center text-gray-500 mb-6">Enter your details below</p>

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-1">Email or Phone</label>
            <input
              type="text"
              placeholder="example@mail.com"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-[#DB4444] hover:bg-red-600 text-white py-2.5 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-500 mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-red-500 font-medium hover:underline">
              Register
            </Link>
          </p>
        </form>
        <Modal
          title="Welcome!"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalOk}
          okText="Go to Home"
        >
          <p>You have successfully logged in.</p>
        </Modal>
      </div>
    </div>
  );
};
