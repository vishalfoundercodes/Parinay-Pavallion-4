// import React from 'react'

// import {
//   X
// } from "lucide-react";
// import Button from '../ReusableComponent/Button';

// interface User {
//   name: string;
//   email: string;
// }

// interface AuthModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onLogin: (user: User) => void;
// }

// const AuthModal:React.FC<AuthModalProps>= ({ isOpen, onClose, onLogin })=>{
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//       <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-black"
//         >
//           <X />
//         </button>

//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-serif font-bold text-[#0f3d2e]">
//             Welcome Back
//           </h2>
//           <p className="text-gray-500">Sign in to manage your bookings</p>
//         </div>

//         <form
//           className="space-y-4"
//           onSubmit={(e) => {
//             e.preventDefault();
//             onLogin({ name: "Demo User", email: "user@example.com" });
//           }}
//         >
//           <input
//             type="email"
//             placeholder="Email Address"
//             className="w-full px-4 py-3 border rounded focus:border-[#0f3d2e] focus:outline-none"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full px-4 py-3 border rounded focus:border-[#0f3d2e] focus:outline-none"
//             required
//           />
//           <Button className="w-full">Login</Button>
//         </form>

//         <div className="mt-6 text-center text-sm text-gray-500">
//           <p>
//             Don't have an account?{" "}
//             <a href="#" className="text-[#d4af37] font-bold hover:underline">
//               Register
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthModal

import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import Button from "../ReusableComponent/Button";
import apis from "../../utilities/api.js"
import { toast } from "react-toastify";

interface User {
  name: string;
  email: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  onRegisterClick: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegisterClick,
}) => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        mobile: mobile,
        password: password,
      };
      console.log("payload", payload);
      console.log("apis.login", apis.login);
      const response = await axios.post(apis.login, payload);
      console.log("res", response);
      if (response?.data?.status === true) {
        console.log("res", response?.data?.user);
        localStorage.setItem("userId", response?.data?.user?.id);
      }

      /**
       * Assume API response like:
       * {
       *   success: true,
       *   user: { name, email }
       * }
       */
      const userData = response.data.user;

      onLogin({
        name: userData.name,
        email: userData.email,
      });

      onClose();
    } catch (err: any) {
      console.error("Login error:", err);
      console.error("Login error:", err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
      setError(err?.response?.data?.message || "Login failed. Try again.");
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
            Welcome Back
          </h2>
          <p className="text-gray-500">Sign in to manage your bookings</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-4 py-3 border rounded focus:border-[#0f3d2e] focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded focus:border-[#0f3d2e] focus:outline-none"
            required
          />

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <Button className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Don't have an account?{" "}
            <a
              href="#"
              className="text-[#d4af37] font-bold hover:underline"
              onClick={onRegisterClick}
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
