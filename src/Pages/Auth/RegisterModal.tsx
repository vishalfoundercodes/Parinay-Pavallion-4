// ========== RegisterModal.tsx (Updated) ==========
import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import Button from "../ReusableComponent/Button";
import apis from "../../utilities/api.js";
import { toast } from "react-toastify";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void; // New prop
}

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onLoginClick,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(apis.register, formData);

      if (res?.data?.status === true) {
        console.log(res?.data)
        toast.success(res?.data?.message || "Registration successful. Please login.");
        setFormData({
          name: "",
          mobile: "",
          email: "",
          password: "",
        });
        localStorage.setItem("userId",res?.data?.data?.id)
        localStorage.setItem("mobile",res?.data?.data?.mobile)
        localStorage.setItem("email",res?.data?.data?.email)
        onLoginClick(); // Open login modal
      } else {
        toast.error(res?.data?.message || "Registration failed");
      }
    } catch (err: any) {
      console.error("Register error:", err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <X />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-serif font-bold text-[#0f3d2e]">
            Create Account
          </h2>
          <p className="text-gray-500">Register to book your venue</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded focus:border-[#0f3d2e] focus:outline-none"
            required
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded focus:border-[#0f3d2e] focus:outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded focus:border-[#0f3d2e] focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded focus:border-[#0f3d2e] focus:outline-none"
            required
          />

          <Button className="w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Already have an account?{" "}
            <span
              onClick={onLoginClick}
              className="text-[#d4af37] font-bold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
