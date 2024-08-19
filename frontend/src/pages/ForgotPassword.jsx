import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const {isLoading,forgotpasword} = useAuthStore();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend for password reset logic
    try {
      // Send email to backend for password reset
      // ...

      // After successful email sending, redirect to a confirmation page
    //   navigate("/password-reset-confirmation");
      await forgotpasword(email);
      toast.success("Password reset link sent to your email");
    //   navigate('/password-reset-confirmation');
    } catch (error) {
      console.error("Password reset error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <p className="text-gray-700 text-center mb-4">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center">
            <Button
              text="Send Reset Link"
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
        </form>
        <small>
          Remember your password?{" "}
          <Link to="/login">
            <span className="text-blue-500 hover:text-blue-700">Login</span>
          </Link>
        </small>
      </div>
    </div>
  );
};

export default ForgotPassword;
