import React, { useEffect, useState } from 'react'
import Button from './Button';
import SectionTitle from './Section';
import { Camera, CheckCircle, Coffee, Heart, Music } from 'lucide-react';
import axios from 'axios';
import apis from "../../utilities/api.js"
import { toast } from 'react-toastify';

interface BookingSystemProps {
  selectedItem?: {
    id?: string | number;
    name?: string;
    type?: string;
  } | null;
  user?: any; // agar auth user ka proper type ho to wo use karo
  onLoginRedirect: () => void;
}


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
const BookingSystem: React.FC<BookingSystemProps> = ({
  selectedItem,
  user,
  onLoginRedirect,
  onNavigate,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    date: "",
    timeSlot: "Day",
    guests: "",
    eventType: "Wedding",
    amount: "",
    numberOfGuest: "",
    // venue: selectedItem ? selectedItem.name || selectedItem.type : "",
    venue: selectedItem?.id?.toString() || "",
    // Ab directly ID store ho raha hai ✅
  });
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [availableVenues, setAvailableVenues] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);

  const handleSubmit = () => {
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

  const fetchAvailabelVenues = async () => {
    try {
      // console.log("apis:", apis.availability_venues);
      const res = await axios.get(apis.availability_venues);
      // console.log("res:",res?.data?.data)
      setAvailableVenues(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetcheventTypes = async () => {
    try {
      // console.log("apis:", apis.availability_venues);
      const res = await axios.get(apis.event_types);
      // console.log("res:", res?.data);
      setEventTypes(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvailability = async () => {
    try {
      // console.log("property id:",formData.venue );
      // console.log("date:", formData.eventType);
      // console.log("time slot:", formData.timeSlot);
      // console.log("date:", formData.date);
      // check?property_id=1&date=2025-02-10&time_slot=Day
      const res = await axios.get(
        `${apis.check_availability}${formData.venue}&date=${formData.date}&time_slot=${formData.timeSlot}`
      );
      console.log("res:", res?.data);
      // setEventTypes(res?.data?.data);
      if (res?.data?.status === true) {
        await bookingCreate();
      } else if (res?.data?.status === false) {
        toast.warn(res?.data?.message);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const bookingCreate = async () => {
    try {
      const payload = {
        property_id: formData.venue,
        booking_date: formData.date,
        time_slot: formData.timeSlot,
        guest_count: formData.numberOfGuest,
        booking_amount: formData.amount,
      };
      // console.log("venue",formData.venue)
      console.log(payload);
      const token = localStorage.getItem("token");
      // console.log("token", token);

      const res = await axios.post(apis.booking_create, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res?.data);
      if (res?.data?.status === true) {
        toast.success(res?.data?.message);
        handleSubmit();
      } else if (res?.data?.status === false) {
        toast.warn(res?.data?.message);
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchAvailabelVenues();
    fetcheventTypes();
  }, []);

  const groupedVenues = availableVenues.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  if (step === 3) {
    return (
      <div className="py-4 px-4 flex items-center justify-center min-h-[60vh] animate-fade-in">
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
          <Button onClick={() => onNavigate("home")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 px-4 max-w-3xl mx-auto animate-fade-in">
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAvailability();
          }}
          className="p-8 space-y-6"
        >
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
                {Object.entries(groupedVenues).map(([type, items]) => (
                  <optgroup
                    key={type}
                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                  >
                    {items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
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
                {eventTypes.map((event) => (
                  <option key={event.key} value={event.key}>
                    {event.label}
                  </option>
                ))}
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₹)
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full px-4 py-3 border rounded focus:border-[#0f3d2e] focus:outline-none"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Guests
              </label>
              <input
                type="number"
                placeholder="Enter number of guests"
                className="w-full px-4 py-3 border rounded focus:border-[#0f3d2e] focus:outline-none"
                value={formData.numberOfGuest}
                onChange={(e) =>
                  setFormData({ ...formData, numberOfGuest: e.target.value })
                }
                required
              />
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
              <Button className="w-full" type="submit">
                Submit Booking Request
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingSystem
