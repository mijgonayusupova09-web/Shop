import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <ExclamationCircleOutlined style={{ fontSize: 100, color: "#f87171" }} />
      <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-2">
        Page Not Found
      </h1>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button
        type="primary"
        size="large"
        onClick={() => navigate("/home")}
      >
        Go Back Home
      </Button>
    </div>
  );
};
