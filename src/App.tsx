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

/* --- DUMMY DATA --- */
const DATA = {
  lawns: [
    {
      id: 1,
      name: "Royal Grand Lawn",
      capacity: "1500-2000 Guests",
      price: "₹1,50,000",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800",
      desc: "Our largest open-air lawn perfect for grand weddings.",
    },
    {
      id: 2,
      name: "Emerald Garden",
      capacity: "800-1000 Guests",
      price: "₹1,00,000",
      image:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800",
      desc: "Lush green surroundings with a natural floral canopy.",
    },
    {
      id: 3,
      name: "Sunset Pavilion",
      capacity: "500-700 Guests",
      price: "₹75,000",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
      desc: "Perfect for evening receptions with a sunset view.",
    },
    {
      id: 4,
      name: "Orchid Lawn",
      capacity: "300-500 Guests",
      price: "₹50,000",
      image:
        "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=800",
      desc: "Intimate setting for engagement parties and sangeet.",
    },
  ],
  halls: [
    {
      id: 1,
      name: "Crystal Ballroom",
      capacity: "500 Guests",
      price: "₹1,25,000",
      image: "https://media.eventective.com/2643263_lg.jpg",
      desc: "Fully AC banquet hall with crystal chandeliers.",
    },
    {
      id: 2,
      name: "Golden Banquet",
      capacity: "300 Guests",
      price: "₹80,000",
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800",
      desc: "Elegant indoor space for corporate events and parties.",
    },
  ],
  rooms: [
    {
      id: 1,
      type: "Luxury Suite",
      count: 4,
      price: "₹5,000/night",
      amenities: ["King Bed", "Bathtub", "Balcony", "AC"],
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      type: "Premium Room",
      count: 6,
      price: "₹3,500/night",
      amenities: ["Queen Bed", "City View", "AC", "WiFi"],
      image:
        "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      type: "Standard Room",
      count: 6,
      price: "₹2,500/night",
      amenities: ["Twin Beds", "AC", "WiFi"],
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800",
    },
  ],
  services: [
    {
      icon: <Coffee className="w-8 h-8" />,
      name: "Catering",
      desc: "Multi-cuisine gourmet experience",
    },
    {
      icon: <Music className="w-8 h-8" />,
      name: "Music & DJ",
      desc: "Professional sound systems",
    },
    {
      icon: <Camera className="w-8 h-8" />,
      name: "Decor",
      desc: "Thematic floral and light decorations",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      name: "Planning",
      desc: "Dedicated event manager",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1665938014504-e5b8b6f318f5?q=80&w=522&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://www.marriagecolours.com/wp-content/uploads/2024/09/SheratonGrand-Reception-MainStage-Floral-Design.jpg",
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=400",
    "https://plus.unsplash.com/premium_photo-1681841703443-53de247ce32b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  testimonials: [
    {
      name: "Rahul & Priya",
      comment:
        "The Royal Grand Lawn was magical. Best wedding venue in the city!",
      rating: 5,
    },
    {
      name: "Amit Sharma",
      comment: "Excellent service and food. The rooms were very comfortable.",
      rating: 5,
    },
    {
      name: "Sneha Patel",
      comment:
        "Beautiful decor and very cooperative staff. Highly recommended.",
      rating: 4,
    },
  ],
};

/* --- APP COMPONENT --- */

export default function App() {
  const [page, setPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [user, setUser] = useState(null); // Auth state
  const [authModalOpen, setAuthModalOpen] = useState(false);
 const [registerModalOpen, setRegisterModalOpen] = useState(false);
const [user, setUser] = useState<User | null>(null);
const [selectedBookingItem, setSelectedBookingItem] =
  useState<BookingItem | null>(null);
    const [infoData,setInfoData]=useState(null)
    const [loading, setLoading] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "lawns", label: "Lawns" },
    { id: "halls", label: "Halls" },
    { id: "rooms", label: "Rooms" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  const fetchContectInfo = async () => {
    try {
      setLoading(true);
      console.log(apis.contact_info);
      const res = await axios.get(apis.contact_info);
      console.log("res contact info:", res);
      setInfoData(res?.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleBookNow = (item: BookingItem) => {
    setSelectedBookingItem(item);
    setPage("booking");
    window.scrollTo(0, 0);
  };

  const handleNavigate = (p: string) => {
    setPage(p);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };


  useEffect(()=>{
    fetchContectInfo()
  },[])

  if(loading){return(<Loader/>)}
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans selection:bg-[#d4af37] selection:text-white">
      {/* HEADER */}
      <header className="fixed w-full bg-[#0f3d2e] text-white z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div
              className="cursor-pointer"
              onClick={() => handleNavigate("home")}
            >
              <Logo />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`text-sm font-medium hover:text-[#d4af37] transition-colors ${
                    page === item.id ? "text-[#d4af37]" : "text-gray-300"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {user ? (
                <button
                  onClick={() => handleNavigate("profile")}
                  className="flex items-center gap-2 bg-[#d4af37] text-[#0f3d2e] px-4 py-2 rounded-2xl font-bold hover:bg-white transition"
                >
                  <User size={18} /> Profile
                </button>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-2 border border-[#d4af37] text-[#d4af37]  px-4 py-2 rounded-2xl font-bold hover:bg-[#d4af37] hover:text-[#0f3d2e] transition"
                >
                  Login
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a2b20] border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded"
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-gray-700 pt-3 mt-3">
                {user ? (
                  <button
                    onClick={() => handleNavigate("profile")}
                    className="w-full text-left px-3 py-3 text-[#d4af37] font-bold"
                  >
                    My Account
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setAuthModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-3 text-[#d4af37] font-bold"
                  >
                    Login / Register
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="pt-20 min-h-screen">
        {page === "home" && <HomePage onNavigate={handleNavigate} />}
        {page === "lawns" && (
          <VenuesPage
            type="lawns"
            //  data={DATA.lawns}
            onBook={handleBookNow}
          />
        )}
        {page === "halls" && (
          <VenuesPage type="halls" data={DATA.halls} onBook={handleBookNow} />
        )}
        {page === "rooms" && (
          <VenuesPage type="rooms" data={DATA.rooms} onBook={handleBookNow} />
        )}
        {page === "gallery" && <GalleryPage />}
        {page === "contact" && <ContactPage />}
        {page === "register" && <RegisterModal />}
        {page === "privacy" && <Privacy />}
        {page === "cancelation" && <Cancelation />}
        {page === "terms" && <Terms />}
        {page === "booking" && (
          <BookingSystem
            selectedItem={selectedBookingItem}
            user={user}
            onLoginRedirect={() => setAuthModalOpen(true)}
          />
        )}
        {page === "profile" && user && (
          <UserProfile
            user={user}
            onLogout={() => {
              localStorage.clear();
              setUser(null);
              setPage("home");
            }}
          />
        )}
        {page === "profile" && !user && (
          <div className="h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
              <Button onClick={() => setAuthModalOpen(true)}>
                Please Login
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0b2920] text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Lucknow's premier destination for weddings, corporate events, and
              luxury stays. Experience royalty with us.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-[#d4af37]"
                onClick={() => {
                  window.open(infoData?.social?.instagram, "_blank");
                }}
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="hover:text-[#d4af37]"
                onClick={() => {
                  window.open(infoData?.social?.facebook, "_blank");
                }}
              >
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-[#d4af37]">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigate("home")}
                  className="hover:text-[#d4af37]"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("lawns")}
                  className="hover:text-[#d4af37]"
                >
                  Lawns & Venues
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("rooms")}
                  className="hover:text-[#d4af37]"
                >
                  Accommodation
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("booking")}
                  className="hover:text-[#d4af37]"
                >
                  Book Event
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-[#d4af37]"
                  onClick={() => handleNavigate("privacy")}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#d4af37]"
                  onClick={() => handleNavigate("terms")}
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#d4af37]"
                  onClick={() => handleNavigate("cancelation")}
                >
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-[#d4af37]"
                  onClick={() => handleNavigate("contact")}
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 text-[#d4af37]" size={18} />
                <span>{infoData?.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0 text-[#d4af37]" size={18} />
                <span>{infoData?.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="shrink-0 text-[#d4af37]" size={18} />
                <span>{infoData?.email}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs mt-12 pt-8 border-t border-gray-800 text-gray-500">
          © 2025 Parinay Pavallion. All rights reserved.
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:-translate-y-1 z-50 flex items-center justify-center"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Auth Modal */}
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
      />
    </div>
  );
}
