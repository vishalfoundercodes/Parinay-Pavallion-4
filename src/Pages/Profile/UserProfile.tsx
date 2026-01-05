import axios from 'axios';
import { User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import apis from "../../utilities/api.js"

interface UserTpe {
  name: string;
  email: string;
}

interface UserProfileTool {
  user: UserTpe;
  onLogout?: () => void;
}
const UserProfile:React.FC<UserProfileTool> = ({ user, onLogout }) => {
  const [bookingData,setBookingData]=useState([])
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const fetchBookings=async()=>{
    try {
      const token=localStorage.getItem("token")
      console.log(apis.my_bookings);
       const res = await axios.get(apis.my_bookings, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      console.log(res)
      setBookingData(res?.data?.data);
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(()=>{
    fetchBookings()
  },[])
    return (
      <div className="py-4 px-4 max-w-5xl mx-auto animate-fade-in">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center mb-6">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                <User className="w-full h-full p-4 text-gray-400" />
              </div>
              <h3 className="font-bold text-lg text-primary">{user.name}</h3>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <button className="w-full text-left px-6 py-4 border-b hover:bg-gray-50 font-medium text-primary border-l-4 border-primary">
                My Profile
              </button>
              <button className="w-full text-left px-6 py-4 border-b hover:bg-gray-50 font-medium text-gray-600">
                Booking History
              </button>
              {/* <button className="w-full text-left px-6 py-4 border-b hover:bg-gray-50 font-medium text-gray-600">
                Invoices
              </button> */}
              <button
                onClick={onLogout}
                className="w-full text-left px-6 py-4 hover:bg-red-50 font-medium text-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Content */}
          {/* Content */}
          <div className="md:w-3/4 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-xl text-primary mb-6 border-b pb-2">
                Recent Bookings
              </h3>

              {bookingData?.length === 0 && (
                <p className="text-gray-500 text-center">No bookings found</p>
              )}

              {bookingData?.map((booking: any) => (
                <div key={booking.id} className="border rounded-lg p-4 mb-4">
                  {/* Top section */}
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-lg">
                        {booking?.property?.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {booking?.property?.type?.toUpperCase()} •{" "}
                        {booking.booking_date} • {booking.time_slot}
                      </p>
                    </div>

                    <span
                      className={`text-xs px-2 py-1 rounded-full font-bold capitalize
              ${getStatusStyle(booking.booking_status)}`}
                    >
                      {booking.booking_status}
                    </span>
                  </div>

                  {/* Bottom section */}
                  <div className="flex justify-between items-center text-sm text-gray-600 mt-4 pt-4 border-t">
                    <span>Booking ID: #{booking.id}</span>

                    <div className="flex gap-3">
                      {booking.booking_status === "pending" && (
                        <button className="text-red-600 hover:underline">
                          Cancel Request
                        </button>
                      )}

                      {/* {booking.booking_status === "confirmed" && (
                        <button className="text-primary font-bold hover:underline">
                          Download Invoice
                        </button>
                      )} */}

                      <button className="text-primary font-bold hover:underline">
                        TOtal paid amount: ₹{booking.total_amount}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}

export default UserProfile
