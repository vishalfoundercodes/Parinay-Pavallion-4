import { Camera, Coffee, Heart, Music } from 'lucide-react';
import React from 'react'
import SectionTitle from '../ReusableComponent/Section';
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

export default GalleryPage
