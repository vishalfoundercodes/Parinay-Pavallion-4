import React from 'react'
import Button from '../ReusableComponent/Button';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import SectionTitle from '../ReusableComponent/Section';

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
            rows={4}
            placeholder="Your Message"
            className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#0f3d2e] focus:outline-none"
          ></textarea>
          <Button className="w-full">Send Message</Button>
        </form>
      </div>
    </div>
  </div>
);

export default ContactPage
