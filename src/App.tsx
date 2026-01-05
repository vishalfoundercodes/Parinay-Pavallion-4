import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Calendar,
  User,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Mail,
  CheckCircle,
  Clock,
  Users,
  Star,
  ChevronRight,
  ArrowRight,
  Coffee,
  Music,
  Camera,
  Heart,
  UserIcon,
} from "lucide-react";

import AuthModal from "./Pages/Auth/AuthModal";
import Button from "./Pages/ReusableComponent/Button";
import VenuesPage from "./Pages/Venue/VenuePage";
import GalleryPage from "./Pages/Gallery/Gallery";
import ContactPage from "./Pages/Contact/ContactPage";
import UserProfile from "./Pages/Profile/UserProfile";
import Logo from "./Pages/ReusableComponent/Logo";
import HomePage from "./Pages/Home/HomePage";
import BookingSystem from "./Pages/ReusableComponent/BookingSystem";
import RegisterModal from "./Pages/Auth/RegisterModal";
import axios from "axios";
import apis from "./utilities/api.js"
import Loader from "./Pages/ReusableComponent/Loader"
import Privacy from "./Pages/Privacy/Privacy.js";
import Terms from "./Pages/Terms/Terms.js";
import Cancelation from "./Pages/Cancel/Cancelation.js";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Cart from "./Pages/Cart/Cart.js";
import PropertyWise from "./Pages/Property/PropertyWise.js";

// interface User {
//   name: string;
//   email: string;
// }

// interface BookingItem {
//   id: string | number;
//   image: string;
//   price: string | number;
//   name?: string;
//   type?: string;
//   desc?: string;
//   capacity?: number | string;
//   amenities?: string[];
// }

// /* --- APP COMPONENT --- */

// export default function App() {
//  const [page, setPage] = useState(() => {
//    return localStorage.getItem("currentPage") || "home";
//  });

//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   // const [user, setUser] = useState(null); // Auth state
//   const [authModalOpen, setAuthModalOpen] = useState(false);
//  const [registerModalOpen, setRegisterModalOpen] = useState(false);
// const [user, setUser] = useState<User | null>(null);
//  const [showRegister, setShowRegister] = useState(false);
// const [selectedBookingItem, setSelectedBookingItem] =
//   useState<BookingItem | null>(null);
//     const [infoData,setInfoData]=useState(null)
//     const [loading, setLoading] = useState(false);

//   const navItems = [
//     { id: "home", label: "Home" },
//     { id: "lawns", label: "Lawns" },
//     { id: "halls", label: "Halls" },
//     { id: "rooms", label: "Rooms" },
//     { id: "gallery", label: "Gallery" },
//     { id: "contact", label: "Contact" },
//   ];

//   const fetchContectInfo = async () => {
//     try {
//       setLoading(true);
//       console.log(apis.contact_info);
//       const res = await axios.get(apis.contact_info);
//       console.log("res contact info:", res);
//       setInfoData(res?.data?.data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleBookNow = (item: BookingItem) => {
//     console.log("handle booking:",item)
//     setSelectedBookingItem(item);
//     setPage("booking");
//     window.scrollTo(0, 0);
//   };

//   const handleNavigate = (p: string) => {
//     setPage(p);
//     localStorage.setItem("currentPage", p);
//     setMobileMenuOpen(false);
//     window.scrollTo(0, 0);
//   };


//   useEffect(()=>{
//     fetchContectInfo()
//   },[])

//   useEffect(() => {
//     const email = localStorage.getItem("email");
//     const name = localStorage.getItem("name");
//     if (email) {
//       setUser({ name, email });
//     }
//   }, []);


//   if(loading){return(<Loader/>)}
//   return (
//     <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-secondary selection:text-white">
//       {/* HEADER */}
//       <header className="fixed w-full bg-primary text-white z-40 shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* Logo */}
//             <div
//               className="cursor-pointer"
//               onClick={() => handleNavigate("home")}
//             >
//               <Logo />
//             </div>

//             {/* Desktop Nav */}
//             <nav className="hidden md:flex space-x-8 items-center">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => handleNavigate(item.id)}
//                   className={`text-sm font-medium hover:text-secondary transition-colors ${
//                     page === item.id ? "text-secondary" : "text-gray-300"
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}

//               {user ? (
//                 <button
//                   onClick={() => handleNavigate("profile")}
//                   className="flex items-center gap-2 bg-secondary text-primary px-4 py-2 rounded-2xl font-bold hover:bg-white transition"
//                 >
//                   <User size={18} /> Profile
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => setAuthModalOpen(true)}
//                   className="flex items-center gap-2 border border-secondary text-secondary  px-4 py-2 rounded-2xl font-bold hover:bg-secondary hover:text-primary transition"
//                 >
//                   Login
//                 </button>
//               )}
//             </nav>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden text-white"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Nav */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-[#0a2b20] border-t border-gray-700">
//             <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => handleNavigate(item.id)}
//                   className="block w-full text-left px-3 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded"
//                 >
//                   {item.label}
//                 </button>
//               ))}
//               <div className="border-t border-gray-700 pt-3 mt-3">
//                 {user ? (
//                   <button
//                     onClick={() => handleNavigate("profile")}
//                     className="w-full text-left px-3 py-3 text-secondary font-bold"
//                   >
//                     My Account
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => {
//                       setAuthModalOpen(true);
//                       setMobileMenuOpen(false);
//                     }}
//                     className="w-full text-left px-3 py-3 text-secondary font-bold"
//                   >
//                     Login / Register
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* MAIN CONTENT */}
//       <main className="pt-20 min-h-screen">
//         {page === "home" && (
//           <HomePage onNavigate={handleNavigate} onBook={handleBookNow} />
//         )}
//         {page === "lawns" && (
//           <VenuesPage
//             type="lawns"
//             //  data={DATA.lawns}
//             onBook={handleBookNow}
//           />
//         )}
//         {page === "halls" && (
//           <VenuesPage type="halls" onBook={handleBookNow} />
//         )}
//         {page === "rooms" && (
//           <VenuesPage type="rooms"  onBook={handleBookNow} />
//         )}
//         {page === "gallery" && <GalleryPage />}
//         {page === "contact" && <ContactPage />}
//         {page === "register" && <RegisterModal />}
//         {page === "privacy" && <Privacy />}
//         {page === "cancelation" && <Cancelation />}
//         {page === "terms" && <Terms />}
//         {page === "booking" && (
//           <BookingSystem
//             selectedItem={selectedBookingItem}
//             user={user}
//             onLoginRedirect={() => setAuthModalOpen(true)}
//             onNavigate={handleNavigate}
//           />
//         )}
//         {page === "profile" && user && (
//           <UserProfile
//             user={user}
//             onLogout={() => {
//               localStorage.clear();
//               setUser(null);
//               setPage("home");
//             }}
//           />
//         )}
//         {page === "profile" && !user && (
//           <div className="h-screen flex items-center justify-center">
//             <div className="text-center">
//               <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
//               <Button onClick={() => setAuthModalOpen(true)}>
//                 Please Login
//               </Button>
//             </div>
//           </div>
//         )}
//       </main>

//       {/* FOOTER */}
      // <footer className="bg-[#0b2920] text-gray-300 py-12 border-t border-gray-800">
      //   <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
      //     <div>
      //       <div className="mb-4">
      //         <Logo />
      //       </div>
      //       <p className="text-sm leading-relaxed mb-4">
      //         Lucknow's premier destination for weddings, corporate events, and
      //         luxury stays. Experience royalty with us.
      //       </p>
      //       <div className="flex gap-4">
      //         <a
      //           href="#"
      //           className="hover:text-secondary"
      //           onClick={() => {
      //             window.open(infoData?.social?.instagram, "_blank");
      //           }}
      //         >
      //           <Instagram size={20} />
      //         </a>
      //         <a
      //           href="#"
      //           className="hover:text-secondary"
      //           onClick={() => {
      //             window.open(infoData?.social?.facebook, "_blank");
      //           }}
      //         >
      //           <Facebook size={20} />
      //         </a>
      //         <a href="#" className="hover:text-secondary">
      //           <Mail size={20} />
      //         </a>
      //       </div>
      //     </div>

      //     <div>
      //       <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
      //       <ul className="space-y-2 text-sm">
      //         <li>
      //           <button
      //             onClick={() => handleNavigate("home")}
      //             className="hover:text-secondary"
      //           >
      //             Home
      //           </button>
      //         </li>
      //         <li>
      //           <button
      //             onClick={() => handleNavigate("lawns")}
      //             className="hover:text-secondary"
      //           >
      //             Lawns & Venues
      //           </button>
      //         </li>
      //         <li>
      //           <button
      //             onClick={() => handleNavigate("rooms")}
      //             className="hover:text-secondary"
      //           >
      //             Accommodation
      //           </button>
      //         </li>
      //         <li>
      //           <button
      //             onClick={() => handleNavigate("booking")}
      //             className="hover:text-secondary"
      //           >
      //             Book Event
      //           </button>
      //         </li>
      //       </ul>
      //     </div>

      //     <div>
      //       <h4 className="text-white font-bold text-lg mb-4">Legal</h4>
      //       <ul className="space-y-2 text-sm">
      //         <li>
      //           <a
      //             href="#"
      //             className="hover:text-secondary"
      //             onClick={() => handleNavigate("privacy")}
      //           >
      //             Privacy Policy
      //           </a>
      //         </li>
              // <li>
              //   <a
              //     href="#"
              //     className="hover:text-secondary"
              //     onClick={() => handleNavigate("terms")}
              //   >
              //     Terms & Conditions
              //   </a>
              // </li>
              // <li>
              //   <a
              //     href="#"
              //     className="hover:text-secondary"
              //     onClick={() => handleNavigate("cancelation")}
              //   >
              //     Cancellation Policy
              //   </a>
              // </li>
              // <li>
              //   <a
              //     href="#"
              //     className="hover:text-secondary"
              //     onClick={() => handleNavigate("contact")}
              //   >
              //     Support
              //   </a>
              // </li>
      //       </ul>
      //     </div>

          // <div>
          //   <h4 className="text-white font-bold text-lg mb-4">Contact Us</h4>
          //   <ul className="space-y-3 text-sm">
          //     <li className="flex items-start gap-3">
          //       <MapPin className="shrink-0 text-secondary" size={18} />
          //       <span>{infoData?.address}</span>
          //     </li>
          //     <li className="flex items-center gap-3">
          //       <Phone className="shrink-0 text-secondary" size={18} />
          //       <span>{infoData?.phone}</span>
          //     </li>
          //     <li className="flex items-center gap-3">
          //       <Mail className="shrink-0 text-secondary" size={18} />
          //       <span>{infoData?.email}</span>
          //     </li>
          //   </ul>
          // </div>
      //   </div>
      //   <div className="text-center text-xs mt-12 pt-8 border-t border-gray-800 text-gray-500">
      //     © 2025 Parinay Pavallion. All rights reserved.
      //   </div>
      // </footer>

//       {/* Floating WhatsApp Button */}
//       <a
//         href="https://wa.me/919876543210"
//         target="_blank"
//         rel="noreferrer"
//         className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:-translate-y-1 z-50 flex items-center justify-center"
//       >
//         <Phone className="w-6 h-6" />
//       </a>

//       {/* Auth Modal */}
//       <AuthModal
//         isOpen={authModalOpen}
//         onClose={() => setAuthModalOpen(false)}
//         onLogin={(userData) => {
//           setUser(userData);
//           setAuthModalOpen(false);
//           onNavigate("home");
//         }}
//         onRegisterClick={() => {
//           setAuthModalOpen(false);
//           setRegisterModalOpen(true);
//         }}
//       />
//       <RegisterModal
//         isOpen={registerModalOpen}
//         onClose={() => setRegisterModalOpen(false)}
//         onLoginClick={() => {
//           setRegisterModalOpen(false);
//           setAuthModalOpen(true);
//         }}
//         onRegisterSuccess={(userData) => {
//           setUser(userData); // ✅ SAME AS LOGIN
//           setRegisterModalOpen(false);
//           onNavigate("home"); // ✅ register success → home
//         }}
//       />
//     </div>
//   );
// }



/* ---------------- TYPES ---------------- */

interface User {
  name: string;
  email: string;
}

interface BookingItem {
  id: string | number;
  image: string;
  price: string | number;
  name?: string;
  type?: string;
  desc?: string;
  capacity?: number | string;
  amenities?: string[];
}

interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
  social?: {
    instagram?: string;
    facebook?: string;
  };
}

/* ---------------- APP ---------------- */

export default function App() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [selectedBookingItem, setSelectedBookingItem] =
    useState<BookingItem | null>(null);

  const [infoData, setInfoData] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- NAV ITEMS ---------------- */

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/lawns", label: "Lawns" },
    { path: "/halls", label: "Halls" },
    { path: "/rooms", label: "Rooms" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
  ];

  /* ---------------- API ---------------- */

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(apis.contact_info);
      setInfoData(res?.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- HANDLERS ---------------- */

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleBookNow = (item: BookingItem) => {
    setSelectedBookingItem(item);
    navigate("/booking");
    window.scrollTo(0, 0);
  };

  /* ---------------- EFFECTS ---------------- */

  useEffect(() => {
    fetchContactInfo();
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    if (email && name) {
      setUser({ name, email });
    }
  }, []);

  if (loading) return <Loader />;

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* ---------------- HEADER ---------------- */}
      <header className="fixed w-full bg-primary text-white z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
          <div className="cursor-pointer" onClick={() => handleNavigate("/")}>
            <Logo />
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className="text-sm text-gray-300 hover:text-secondary"
              >
                {item.label}
              </button>
            ))}

            {user ? (
              <>
                <button
                  className="px-1 py-2 rounded-xl font-bold"
                  onClick={() => handleNavigate("/cart")}
                >
                  <Heart size={20} className="text-secondary cursor-pointer" />
                </button>
                <button
                  onClick={() => handleNavigate("/profile")}
                  className="bg-secondary text-primary px-2 py-2 rounded-xl font-bold flex gap-2"
                >
                  <UserIcon size={16} /> Profile
                </button>
              </>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="border border-secondary px-4 py-2 rounded-xl text-secondary"
              >
                Login
              </button>
            )}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* ---------------- ROUTES ---------------- */}
      <main className="pt-20 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage onBook={handleBookNow} />} />

          <Route
            path="/lawns"
            element={<VenuesPage type="lawns" onBook={handleBookNow} />}
          />
          <Route
            path="/halls"
            element={<VenuesPage type="halls" onBook={handleBookNow} />}
          />
          <Route
            path="/rooms"
            element={<VenuesPage type="rooms" onBook={handleBookNow} />}
          />

          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/cart" element={<Cart onBook={handleBookNow} />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* 🔥 DIRECT URL SUPPORT */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cancelation" element={<Cancelation />} />
          <Route
            path="/propertywise"
            element={<PropertyWise onBook={handleBookNow} />}
          />

          <Route
            path="/booking"
            element={
              <BookingSystem
                selectedItem={selectedBookingItem}
                user={user}
                onLoginRedirect={() => setAuthModalOpen(true)}
              />
            }
          />

          <Route
            path="/profile"
            element={
              user ? (
                <UserProfile
                  user={user}
                  onLogout={() => {
                    localStorage.removeItem("email");
                    localStorage.removeItem("name");
                    setUser(null);
                    navigate("/");
                  }}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-[#0b2920] text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="text-sm mt-4">
              Bahraich's premier destination for weddings & luxury stays.
            </p>
            <div className="flex gap-4 mt-4">
              <Instagram
                onClick={() => window.open(infoData?.social?.instagram)}
              />
              <Facebook
                onClick={() => window.open(infoData?.social?.facebook)}
              />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigate("home")}
                  className="hover:text-secondary"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("lawns")}
                  className="hover:text-secondary"
                >
                  Lawns & Venues
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("rooms")}
                  className="hover:text-secondary"
                >
                  Accommodation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("booking")}
                  className="hover:text-secondary"
                >
                  Book Event
                </button>
              </li>
            </ul>
          </div>

          <div className="text-sm space-y-2">
            <h4 className="font-bold mb-3 text-lg">Legal</h4>
            <button onClick={() => handleNavigate("/privacy")}>
              Privacy Policy
            </button>
            <div>
              <a
                href="#"
                className="hover:text-secondary "
                onClick={() => handleNavigate("/terms")}
              >
                Terms & Conditions
              </a>
            </div>
            <div>
              <a
                href="#"
                className="hover:text-secondary text-decoration-none"
                onClick={() => handleNavigate("/cancelation")}
              >
                Cancellation Policy
              </a>
            </div>
            <div>
              <a
                href="#"
                className="hover:text-secondary"
                onClick={() => handleNavigate("contact")}
              >
                Support
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 text-secondary" size={18} />
                <span>{infoData?.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0 text-secondary" size={18} />
                <span>{infoData?.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="shrink-0 text-secondary" size={18} />
                <span>{infoData?.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* ---------------- MODALS ---------------- */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={(userData) => {
          setUser(userData);
          setAuthModalOpen(false);
        }}
        onRegisterClick={() => {
          setAuthModalOpen(false);
          setRegisterModalOpen(true);
        }}
      />

      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onLoginClick={() => {
          setRegisterModalOpen(false);
          setAuthModalOpen(true);
        }}
        onRegisterSuccess={(userData) => {
          setUser(userData);
          setRegisterModalOpen(false);
          navigate("/");
        }}
      />
    </div>
  );
}
