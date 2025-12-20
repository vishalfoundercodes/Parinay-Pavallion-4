import { User } from 'lucide-react';
import React from 'react'

interface UserTpe {
  name: string;
  email: string;
}

interface UserProfileTool {
  user: UserTpe;
  onLogout?: () => void;
}
const UserProfile:React.FC<UserProfileTool> = ({ user, onLogout }) => (
  <div className="py-4 px-4 max-w-5xl mx-auto animate-fade-in">
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

export default UserProfile
