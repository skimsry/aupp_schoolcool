import { useState } from "react";
import { useAuth } from "../context/AuthContext.js";
import { json } from "react-router-dom";
import { message } from "antd";
const useSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const registerUser = async (values) => {
    if (values.password !== values.rePassword) {
      return setError("Passwords are not the same");
    }
    try {
      setError(null);
      setLoading(false);
      const res = await fetch(
        "http://localhost:3001/api/users/sign_up_client",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      if (res.status === 201) {
        message.success(data.message);
        login(data.toke, data.user);
      } else if (res.status === 4000) {
        setError(data.message);
      } else {
        message.error("Registration failed");
      }
    } catch (error) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, registerUser };
};
export default useSignup;
