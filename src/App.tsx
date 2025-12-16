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
import logo from "./assets/logo.png"

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

/* --- SUB COMPONENTS --- */

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center text-[#0f3d2e] font-bold text-xl">
      P
    </div>
    <div className="flex flex-col">
      <span className="text-[#d4af37] font-serif font-bold text-lg tracking-wider leading-none">
        PARINAY
      </span>
      <span className="text-white text-[10px] tracking-[0.2em] leading-none">
        PAVALLION
      </span>
    </div>
  </div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h3 className="text-[#d4af37] font-medium tracking-widest uppercase mb-2 text-sm">
      {subtitle}
    </h3>
    <h2 className="text-3xl md:text-4xl font-serif text-[#0f3d2e] font-bold">
      {title}
    </h2>
    <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-4"></div>
  </div>
);

const Button = ({ children, variant = "primary", onClick, className = "" }) => {
  const baseStyle =
    "px-6 py-3 rounded-sm font-medium transition-all duration-300 transform hover:-translate-y-1";
  const variants = {
    primary: "bg-[#d4af37] text-[#0f3d2e] hover:bg-[#c4a030] shadow-lg",
    outline:
      "border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0f3d2e]",
    dark: "bg-[#0f3d2e] text-white hover:bg-[#16523e]",
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Card = ({ item, type, onBook }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
    <div className="relative h-64 overflow-hidden">
      <img
        src={item.image}
        alt={item.name || item.type}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute top-4 right-4 bg-[#d4af37] text-[#0f3d2e] px-3 py-1 font-bold rounded-sm text-sm">
        {item.price}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-serif font-bold text-[#0f3d2e] mb-2">
        {item.name || item.type}
      </h3>
      {item.desc && <p className="text-gray-600 text-sm mb-4">{item.desc}</p>}

      <div className="flex flex-wrap gap-2 mb-6">
        {item.capacity && (
          <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
            <Users size={14} /> {item.capacity}
          </span>
        )}
        {item.amenities &&
          item.amenities.map((am, idx) => (
            <span
              key={idx}
              className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded text-gray-700"
            >
              <CheckCircle size={14} /> {am}
            </span>
          ))}
      </div>

      <Button
        variant="dark"
        className="w-full py-2"
        onClick={() => onBook(item)}
      >
        Check Availability
      </Button>
    </div>
  </div>
);

/* --- MAIN PAGES --- */

const HomePage = ({ onNavigate }) => (
  <div className="animate-fade-in">
    {/* Hero Section */}
    <div className="relative h-[80vh] bg-[#0f3d2e]">
      <div className="absolute inset-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920"
          alt="Wedding"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
          A Royal Setting For
          <br />
          Your <span className="text-[#d4af37]">Fairytale Wedding</span>
        </h1>
        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-8">
          Experience the grandeur of Parinay Pavallion. Luxury lawns, elegant
          banquet halls, and premium hospitality awaiting your presence.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Button onClick={() => onNavigate("lawns")}>Explore Venues</Button>
          <Button variant="outline" onClick={() => onNavigate("booking")}>
            Book Now
          </Button>
        </div>
      </div>
    </div>

    {/* About Brief */}
    <div className="py-20 px-4 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h3 className="text-[#d4af37] font-medium tracking-widest uppercase mb-2">
          Welcome to Parinay Pavallion
        </h3>
        <h2 className="text-4xl font-serif text-[#0f3d2e] font-bold mb-6">
          Where Dreams Come True
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Located in the heart of serenity, Parinay Pavallion is more than just
          a venue; it's a destination where memories are crafted. With 4
          sprawling lawns, 2 air-conditioned banquet halls, and luxurious
          accommodation, we ensure your special day is nothing short of
          perfection.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="border-l-4 border-[#d4af37] pl-4">
            <span className="block text-3xl font-bold text-[#0f3d2e]">4+</span>
            <span className="text-sm text-gray-500">Luxury Lawns</span>
          </div>
          <div className="border-l-4 border-[#d4af37] pl-4">
            <span className="block text-3xl font-bold text-[#0f3d2e]">16+</span>
            <span className="text-sm text-gray-500">Premium Rooms</span>
          </div>
        </div>
        <button
          onClick={() => onNavigate("gallery")}
          className="text-[#d4af37] font-bold flex items-center gap-2 hover:gap-4 transition-all"
        >
          View Our Gallery <ArrowRight size={20} />
        </button>
      </div>
      <div className="relative">
        <div className="absolute top-1 left-0 w-full h-full border-4 border-[#d4af37] rounded-lg"></div>
        <img
          src={logo}
          alt="About3"
          className="w-full h-full relative rounded-lg shadow-xl"
        />
      </div>
    </div>

    {/* Services */}
    <div className="bg-[#f9f9f9] py-10 px-4">
      <SectionTitle title="Our Services" subtitle="We Manage Everything" />
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        {DATA.services.map((service, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group"
          >
            <div className="w-16 h-16 bg-[#0f3d2e] text-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#d4af37] group-hover:text-[#0f3d2e] transition-colors">
              {service.icon}
            </div>
            <h4 className="text-xl font-bold text-[#0f3d2e] mb-2">
              {service.name}
            </h4>
            <p className="text-gray-500 text-sm">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Featured Venues */}
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <SectionTitle title="Featured Venues" subtitle="Find Your Space" />
      <div className="grid md:grid-cols-3 gap-8">
        {DATA.lawns.slice(0, 3).map((item) => (
          <Card
            key={item.id}
            item={item}
            type="lawn"
            onBook={() => onNavigate("booking")}
          />
        ))}
      </div>
      <div className="text-center mt-12">
        <Button
          variant="outline"
          className="!border-[#0f3d2e] !text-[#0f3d2e] hover:!bg-[#0f3d2e] hover:!text-white"
          onClick={() => onNavigate("lawns")}
        >
          View All Venues
        </Button>
      </div>
    </div>
  </div>
);

const VenuesPage = ({ type, data, onBook }) => (
  <div className="py-24 px-4 max-w-7xl mx-auto animate-fade-in">
    <SectionTitle
      title={
        type === "lawns"
          ? "Our Wedding Lawns"
          : type === "halls"
          ? "Banquet Halls"
          : "Luxury Rooms"
      }
      subtitle="Explore Options"
    />
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((item) => (
        <Card key={item.id} item={item} type={type} onBook={onBook} />
      ))}
    </div>
  </div>
);

const GalleryPage = () => (
  <div className="py-24 px-4 max-w-7xl mx-auto animate-fade-in">
    <SectionTitle title="Photo Gallery" subtitle="Moments to Cherish" />
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {DATA.gallery.map((img, idx) => (
        <div
          key={idx}
          className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer"
        >
          <img
            src={img}
            alt="Gallery"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="text-white w-8 h-8" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContactPage = () => (
  <div className="py-24 px-4 max-w-7xl mx-auto animate-fade-in">
    <SectionTitle title="Contact Us" subtitle="Get In Touch" />
    <div className="grid md:grid-cols-2 gap-12 bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="bg-[#0f3d2e] p-10 text-white">
        <h3 className="text-2xl font-serif font-bold mb-6">
          Contact Information
        </h3>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="text-[#d4af37] w-6 h-6 mt-1" />
            <div>
              <p className="font-bold text-[#d4af37]">Address</p>
              <p className="text-gray-300">
                Parinay Pavallion Resort, Wedding Avenue, Lucknow, UP - 226010
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="text-[#d4af37] w-6 h-6 mt-1" />
            <div>
              <p className="font-bold text-[#d4af37]">Phone</p>
              <p className="text-gray-300">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="text-[#d4af37] w-6 h-6 mt-1" />
            <div>
              <p className="font-bold text-[#d4af37]">Email</p>
              <p className="text-gray-300">bookings@parinaypavallion.com</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <p className="font-bold text-[#d4af37] mb-4">Follow Us</p>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-[#d4af37] hover:text-[#0f3d2e] transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-[#d4af37] hover:text-[#0f3d2e] transition"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="p-10">
        <h3 className="text-2xl font-serif font-bold text-[#0f3d2e] mb-6">
          Send a Message
        </h3>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#0f3d2e] focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#0f3d2e] focus:outline-none"
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#0f3d2e] focus:outline-none"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#0f3d2e] focus:outline-none"
          ></textarea>
          <Button className="w-full">Send Message</Button>
        </form>
      </div>
    </div>
  </div>
);

const BookingSystem = ({ selectedItem, user, onLoginRedirect }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: "",
    timeSlot: "Day",
    guests: "",
    eventType: "Wedding",
    venue: selectedItem ? selectedItem.name || selectedItem.type : "",
  });
  const [bookingId, setBookingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      onLoginRedirect();
      return;
    }
    // Simulate booking
    setTimeout(() => {
      const newId = "PP-" + Math.floor(100000 + Math.random() * 900000);
      setBookingId(newId);
      setStep(3);
      // Save to dummy local history would happen here
    }, 1500);
  };

  if (step === 3) {
    return (
      <div className="py-24 px-4 flex items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full border-t-4 border-[#0f3d2e]">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-[#0f3d2e] mb-2">
            Booking Requested!
          </h2>
          <p className="text-gray-600 mb-6">
            Your request has been submitted successfully. Our team will contact
            you shortly for confirmation.
          </p>
          <div className="bg-gray-100 p-4 rounded mb-6">
            <p className="text-xs text-gray-500 uppercase">Booking ID</p>
            <p className="text-xl font-mono font-bold text-[#0f3d2e]">
              {bookingId}
            </p>
          </div>
          <Button onClick={() => setStep(1)}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-4 max-w-3xl mx-auto animate-fade-in">
      <SectionTitle title="Book Your Event" subtitle="Check Availability" />
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gray-50 px-8 py-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-[#0f3d2e]">Booking Details</h3>
          {selectedItem && (
            <span className="text-sm bg-[#d4af37] text-[#0f3d2e] px-2 py-1 rounded">
              {selectedItem.name || selectedItem.type}
            </span>
          )}
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Venue/Room
              </label>
              <select
                className="w-full px-4 py-3 border rounded focus:border-[#0f3d2e] focus:outline-none"
                value={formData.venue}
                onChange={(e) =>
                  setFormData({ ...formData, venue: e.target.value })
                }
                required
              >
                <option value="">Select Option</option>
                <optgroup label="Lawns">
                  {DATA.lawns.map((l) => (
                    <option key={l.id} value={l.name}>
                      {l.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Halls">
                  {DATA.halls.map((h) => (
                    <option key={h.id} value={h.name}>
                      {h.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Rooms">
                  {DATA.rooms.map((r) => (
                    <option key={r.id} value={r.type}>
                      {r.type}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type
              </label>
              <select
                className="w-full px-4 py-3 border rounded focus:border-[#0f3d2e] focus:outline-none"
                value={formData.eventType}
                onChange={(e) =>
                  setFormData({ ...formData, eventType: e.target.value })
                }
              >
                <option>Wedding</option>
                <option>Reception</option>
                <option>Engagement</option>
                <option>Birthday</option>
                <option>Corporate</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 border rounded focus:border-[#0f3d2e] focus:outline-none"
                required
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Slot
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className={`py-2 border rounded ${
                    formData.timeSlot === "Day"
                      ? "bg-[#0f3d2e] text-white border-[#0f3d2e]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setFormData({ ...formData, timeSlot: "Day" })}
                >
                  Day (10AM - 4PM)
                </button>
                <button
                  type="button"
                  className={`py-2 border rounded ${
                    formData.timeSlot === "Night"
                      ? "bg-[#0f3d2e] text-white border-[#0f3d2e]"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, timeSlot: "Night" })
                  }
                >
                  Night (6PM - 12AM)
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4">
            {!user ? (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded text-center">
                <p>
                  Please{" "}
                  <button
                    type="button"
                    onClick={onLoginRedirect}
                    className="font-bold underline"
                  >
                    Login
                  </button>{" "}
                  to submit booking request
                </p>
              </div>
            ) : (
              <Button className="w-full">Submit Booking Request</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const UserProfile = ({ user, onLogout }) => (
  <div className="py-24 px-4 max-w-5xl mx-auto animate-fade-in">
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="md:w-1/4">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
            <User className="w-full h-full p-4 text-gray-400" />
          </div>
          <h3 className="font-bold text-lg text-[#0f3d2e]">{user.name}</h3>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <button className="w-full text-left px-6 py-4 border-b hover:bg-gray-50 font-medium text-[#0f3d2e] border-l-4 border-[#0f3d2e]">
            My Profile
          </button>
          <button className="w-full text-left px-6 py-4 border-b hover:bg-gray-50 font-medium text-gray-600">
            Booking History
          </button>
          <button className="w-full text-left px-6 py-4 border-b hover:bg-gray-50 font-medium text-gray-600">
            Invoices
          </button>
          <button
            onClick={onLogout}
            className="w-full text-left px-6 py-4 hover:bg-red-50 font-medium text-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="md:w-3/4 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl text-[#0f3d2e] mb-6 border-b pb-2">
            Recent Bookings
          </h3>

          {/* Dummy Booking Item */}
          <div className="border rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-lg">Royal Grand Lawn</h4>
                <p className="text-sm text-gray-500">
                  Wedding Event • 24 Dec 2025
                </p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">
                Pending
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 mt-4 pt-4 border-t">
              <span>Booking ID: #PP-83921</span>
              <div className="flex gap-3">
                <button className="text-red-600 hover:underline">
                  Cancel Request
                </button>
                <button className="text-[#0f3d2e] font-bold hover:underline">
                  View Details
                </button>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 opacity-75">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-lg">Luxury Suite (2 Rooms)</h4>
                <p className="text-sm text-gray-500">Stay • 10 Dec 2025</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">
                Confirmed
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 mt-4 pt-4 border-t">
              <span>Booking ID: #PP-12004</span>
              <button className="text-[#0f3d2e] font-bold hover:underline">
                Download Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;
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

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin({ name: "Demo User", email: "user@example.com" });
          }}
        >
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border rounded focus:border-[#0f3d2e] focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded focus:border-[#0f3d2e] focus:outline-none"
            required
          />
          <Button className="w-full">Login</Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Don't have an account?{" "}
            <a href="#" className="text-[#d4af37] font-bold hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

/* --- APP COMPONENT --- */

export default function App() {
  const [page, setPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Auth state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedBookingItem, setSelectedBookingItem] = useState(null);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "lawns", label: "Lawns" },
    { id: "halls", label: "Halls" },
    { id: "rooms", label: "Rooms" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  const handleBookNow = (item) => {
    setSelectedBookingItem(item);
    setPage("booking");
    window.scrollTo(0, 0);
  };

  const handleNavigate = (p) => {
    setPage(p);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

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
                  className="flex items-center gap-2 bg-[#d4af37] text-[#0f3d2e] px-4 py-2 rounded-sm font-bold hover:bg-white transition"
                >
                  <User size={18} /> Profile
                </button>
              ) : (
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="flex items-center gap-2 border border-[#d4af37] text-[#d4af37] px-4 py-2 rounded-sm font-bold hover:bg-[#d4af37] hover:text-[#0f3d2e] transition"
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
          <VenuesPage type="lawns" data={DATA.lawns} onBook={handleBookNow} />
        )}
        {page === "halls" && (
          <VenuesPage type="halls" data={DATA.halls} onBook={handleBookNow} />
        )}
        {page === "rooms" && (
          <VenuesPage type="rooms" data={DATA.rooms} onBook={handleBookNow} />
        )}
        {page === "gallery" && <GalleryPage />}
        {page === "contact" && <ContactPage />}
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
              <a href="#" className="hover:text-[#d4af37]">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-[#d4af37]">
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
                <a href="#" className="hover:text-[#d4af37]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#d4af37]">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#d4af37]">
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#d4af37]">
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
                <span>
                  Parinay Pavallion Resort, Wedding Avenue, Lucknow, UP - 226010
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0 text-[#d4af37]" size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="shrink-0 text-[#d4af37]" size={18} />
                <span>info@parinaypavallion.com</span>
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
      />
    </div>
  );
}
