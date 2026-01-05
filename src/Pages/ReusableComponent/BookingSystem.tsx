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
        <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full border-t-4 border-primary">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            Booking Requested!
          </h2>
          <p className="text-gray-600 mb-6">
            Your request has been submitted successfully. Our team will contact
            you shortly for confirmation.
          </p>
          <div className="bg-gray-100 p-4 rounded mb-6">
            <p className="text-xs text-gray-500 uppercase">Booking ID</p>
            <p className="text-xl font-mono font-bold text-primary">
              {bookingId}
            </p>
          </div>
          <Button onClick={() => onNavigate("home")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  console.log(selectedItem)
  return (
    <div className="py-4 px-4 max-w-3xl mx-auto animate-fade-in">
      <SectionTitle title="Book Your Event" subtitle="Check Availability" />
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gray-50 px-8 py-4 border-b flex justify-between items-center">
          <h3 className="font-bold text-primary">Booking Details</h3>
          {selectedItem && (
            <span className="text-sm bg-secondary text-primary px-2 py-1 rounded">
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
                className="w-full px-4 py-3 border rounded focus:border-primary focus:outline-none"
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
                className="w-full px-4 py-3 border rounded focus:border-primary focus:outline-none"
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
                className="w-full px-4 py-3 border rounded focus:border-primary focus:outline-none"
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
                      ? "bg-primary text-white border-primary"
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
                      ? "bg-primary text-white border-primary"
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
                className="w-full px-4 py-3 border rounded focus:border-primary focus:outline-none"
                value={selectedItem.base_price ||
formData.amount}
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
                className="w-full px-4 py-3 border rounded focus:border-primary focus:outline-none"
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
