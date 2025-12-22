import React, { useEffect, useState } from 'react'
import Button from '../ReusableComponent/Button';
import Card from '../ReusableComponent/Card';
import SectionTitle from '../ReusableComponent/Section';
import { ArrowRight, Camera, Coffee, Heart, Music } from 'lucide-react';
import logo from "../../assets/logo.png";
import axios from 'axios';
import apis from "../../utilities/api.js";
import { toast } from "react-toastify";
import Loader from "../ReusableComponent/Loader"

interface HomePageProps {
  onNavigate: (page: string) => void;
}
interface PropertiesCounts {
  lawns: number;
  halls: number;
  rooms: number;
}


const HomePage: React.FC<HomePageProps> = ({ onNavigate, onBook }) => {
    const [serviceData, setServiceData] = useState([])
    const [banner,setBanner]=useState([])
    const [featuries, setFeaturies] = useState([]);
   const [propertiesCounts, setPropertiesCounts] =
     useState<PropertiesCounts | null>(null);
      const [loading, setLoading] = useState(false);

      const fetchServices = async () => {
        try {
          setLoading(true)
          const res = await axios.get(apis.services_list);
        //   console.log("res", res.data);
          setServiceData(res.data.data)
        } catch (error) {
          console.error("Service API error", error);
        }finally{
          setLoading(false)
        }
      };
      const fetchBanner=async()=>{
        try {
          setLoading(true)
            const res = await axios.get(apis.slider_list)
                console.log("res",res?.data)
                setBanner(res?.data?.data);

        } catch (error) {
            console.error(error)
        }finally{
          setLoading(false)
        }
      }
      const fetchPropertiesCounts = async () => {
        try {
          setLoading(true)
          const res = await axios.get(apis.properties_counts);
        //   console.log("res", res?.data);
          setPropertiesCounts(res?.data?.data);
        } catch (error) {
          console.error(error);
        }finally{
          setLoading(false)
        }
      };
      const fetchFeatured = async () => {
        try {
          setLoading(true)
          const res = await axios.get(apis.featured_venue);
          // console.log("res", res?.data);
          setFeaturies(res?.data?.data);
        } catch (error) {
          console.error(error);
        }finally{setLoading(false)}
      };

      useEffect(() => {
        fetchServices();
        fetchBanner()
        fetchPropertiesCounts()
        fetchFeatured()
      }, []);

      if (loading) {
        return <Loader />;
      }

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
        <div className="py-14 px-4 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-[#d4af37] font-medium tracking-widest uppercase mb-2">
              Welcome to Parinay Pavallion
            </h3>
            <h2 className="text-4xl font-serif text-[#0f3d2e] font-bold mb-6">
              Where Nature Meets Luxury
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded in 2025 by Shalendar and Rashmi, Parinay Pavallion Resort
              is a serene retreat spread across 6 lush acres in Kalpipara,
              Bahraich. Nestled amidst greenery and tranquility, the resort is a
              sanctuary for those seeking rejuvenation, celebration, or simply a
              peaceful escape into nature.
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
        <div className="bg-[#f9f9f9] py-4 px-4">
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
        <div className="py-4 px-4 max-w-7xl mx-auto">
          <SectionTitle title="Featured Venues" subtitle="Find Your Space" />
          <div className="grid md:grid-cols-3 gap-8">
            {featuries.slice(0, 3).map((item) => (
              <Card
                key={item.id}
                item={item}
                type="lawn"
                onBook={() => {
                  console.log("handle booking home:", item), onBook(item);
                }}
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
