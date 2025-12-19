import React, { useEffect, useState } from 'react'
import Button from '../ReusableComponent/Button';
import Card from '../ReusableComponent/Card';
import SectionTitle from '../ReusableComponent/Section';
import { ArrowRight, Camera, Coffee, Heart, Music } from 'lucide-react';
import logo from "../../assets/logo.png";
import axios from 'axios';
import apis from "../../utilities/api.js";
import { toast } from "react-toastify";

interface HomePageProps {
  onNavigate: (page: string) => void;
}
interface PropertiesCounts {
  lawns: number;
  halls: number;
  rooms: number;
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


const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const [serviceData, setServiceData] = useState([])
    const [banner,setBanner]=useState([])
    const [featuries, setFeaturies] = useState([]);
   const [propertiesCounts, setPropertiesCounts] =
     useState<PropertiesCounts | null>(null);

      const fetchServices = async () => {
        try {
          const res = await axios.get(apis.services_list);
        //   console.log("res", res.data);
          setServiceData(res.data.data)
        } catch (error) {
          console.error("Service API error", error);
        }
      };
      const fetchBanner=async()=>{
        try {
            const res = await axios.get(apis.slider_list)
                // console.log("res",res?.data)
                setBanner(res?.data?.data);

        } catch (error) {
            console.error(error)
        }
      }
      const fetchPropertiesCounts = async () => {
        try {
          const res = await axios.get(apis.properties_counts);
        //   console.log("res", res?.data);
          setPropertiesCounts(res?.data?.data);
        } catch (error) {
          console.error(error);
        }
      };
      const fetchFeatured = async () => {
        try {
          const res = await axios.get(apis.featured_venue);
          console.log("res", res?.data);
          setFeaturies(res?.data?.data);
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        fetchServices();
        fetchBanner()
        fetchPropertiesCounts()
        fetchFeatured()
      }, []);
    return (
      <div className="animate-fade-in">
        {/* Hero Section */}
        <div className="relative h-[80vh] bg-[#0f3d2e]">
          <div className="absolute inset-0 opacity-40">
            <img
              //   src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920"
              //   alt="Wedding"
              src={banner[0]?.image}
              alt={banner[0]?.title}
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
              Experience the grandeur of Parinay Pavallion. Luxury lawns,
              elegant banquet halls, and premium hospitality awaiting your
              presence.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button onClick={() => onNavigate("lawns")}>
                Explore Venues
              </Button>
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
              Located in the heart of serenity, Parinay Pavallion is more than
              just a venue; it's a destination where memories are crafted. With
              4 sprawling lawns, 2 air-conditioned banquet halls, and luxurious
              accommodation, we ensure your special day is nothing short of
              perfection.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="border-l-4 border-[#d4af37] pl-4">
                <span className="block text-3xl font-bold text-[#0f3d2e]">
                  {propertiesCounts?.lawns ?? 0}+
                </span>
                <span className="text-sm text-gray-500">Luxury Lawns</span>
              </div>
              <div className="border-l-4 border-[#d4af37] pl-4">
                <span className="block text-3xl font-bold text-[#0f3d2e]">
                  {propertiesCounts?.rooms ?? 0}+
                </span>
                <span className="text-sm text-gray-500">Premium Rooms</span>
              </div>
              <div className="border-l-4 border-[#d4af37] pl-4">
                <span className="block text-3xl font-bold text-[#0f3d2e]">
                  {propertiesCounts?.halls ?? 0}+
                </span>
                <span className="text-sm text-gray-500">Big Halls</span>
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
            {serviceData.map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <div className="w-16 h-16 bg-[#0f3d2e] text-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#d4af37] group-hover:text-[#0f3d2e] transition-colors">
                  <img src={service.icon} alt="" />
                </div>
                <h4 className="text-xl font-bold text-[#0f3d2e] mb-2">
                  {service.title}
                </h4>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Venues */}
        <div className="py-20 px-4 max-w-7xl mx-auto">
          <SectionTitle title="Featured Venues" subtitle="Find Your Space" />
          <div className="grid md:grid-cols-3 gap-8">
            {featuries.slice(0, 3).map((item) => (
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
    );};

export default HomePage
