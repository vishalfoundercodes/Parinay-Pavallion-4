import React, { useEffect, useState } from 'react'
import Button from '../ReusableComponent/Button';
import Card from '../ReusableComponent/Card';
import SectionTitle from '../ReusableComponent/Section';
import { ArrowRight, Camera, Coffee, Heart, Music } from 'lucide-react';
import logo from "../../assets/logo2.png";
import axios from 'axios';
import apis from "../../utilities/api.js";
import { toast } from "react-toastify";
import Loader from "../ReusableComponent/Loader"
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  onNavigate: (page: string) => void;
}
interface PropertiesCounts {
  lawns: number;
  halls: number;
  rooms: number;
}


const HomePage: React.FC<HomePageProps> = ({ onNavigate, onBook }) => {
  const navigate=useNavigate()
    const [serviceData, setServiceData] = useState([])
    const [banner,setBanner]=useState([])
    const [featuries, setFeaturies] = useState([]);
   const [propertiesCounts, setPropertiesCounts] =
     useState<PropertiesCounts | null>(null);
      const [loading, setLoading] = useState(false);
      const [loadingCart, setLoadingCart] = useState(false);

        const [galleryInfo, setgalleryInfo] = useState([]);
        const fetchGallery = async () => {
          try {
            setLoading(true);
            const res = await axios.get(apis.gallery_list);
            // console.log(res?.data?.data);
            setgalleryInfo(res?.data?.data);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        };

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
          // setLoading(true)
          const token=localStorage.getItem("token")
          const res = await axios.get(apis.featured_venue, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
          console.log("res fetured", res?.data);
          setFeaturies(res?.data?.data);
        } catch (error) {
          console.error(error);
        }
      };

      const addToCart = async (id: number | string, check_cart: boolean) => {
        try {
          setLoadingCart(true);
          const token = localStorage.getItem("token");
          const payload = {
            status: !check_cart,
            property_id: id,
          };
          console.log("payload:", payload);
          const res = await axios.post(apis.addRemoveCart, payload, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
          console.log("add cart:", res?.data);
          fetchFeatured()
          toast.success(res?.data?.message);
        } catch (error) {
          console.error(error);
        }
        finally{
          setLoadingCart(false);
        }
      };

      useEffect(() => {
        fetchServices();
        fetchBanner()
        fetchPropertiesCounts()
        fetchFeatured()
        fetchGallery()
      }, []);

      if (loading) {
        return <Loader />;
      }

    return (
      <div className="animate-fade-in">
        {/* Hero Section */}
        <div className="relative h-[80vh] bg-primary">
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
              Your <span className="text-secondary">Fairytale Wedding</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-8">
              Experience the grandeur of Parinay Pavallion. Luxury lawns,
              elegant banquet halls, and premium hospitality awaiting your
              presence.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button onClick={() => navigate("/lawns")}>Explore Venues</Button>
              <Button variant="outline" onClick={() => navigate("/booking")}>
                Book Now
              </Button>
            </div>
          </div>
        </div>

        {/* About Brief */}
        <div className="py-14 px-4 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-secondary font-medium tracking-widest uppercase mb-2">
              Welcome to Parinay Pavallion
            </h3>
            <h2 className="text-4xl font-serif text-primary font-bold mb-6">
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
              <div className="border-l-4 border-secondary pl-4">
                <span className="block text-3xl font-bold text-primary">
                  {propertiesCounts?.lawns ?? 0}+
                </span>
                <span className="text-sm text-gray-500">Luxury Lawns</span>
              </div>
              <div className="border-l-4 border-secondary pl-4">
                <span className="block text-3xl font-bold text-primary">
                  {propertiesCounts?.rooms ?? 0}+
                </span>
                <span className="text-sm text-gray-500">Premium Rooms</span>
              </div>
              <div className="border-l-4 border-secondary pl-4">
                <span className="block text-3xl font-bold text-primary">
                  {propertiesCounts?.halls ?? 0}+
                </span>
                <span className="text-sm text-gray-500">Big Halls</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-1 left-0 w-full h-full border-4 border-secondary rounded-lg"></div>
            <img
              src={logo}
              alt="About3"
              className="w-full h-[75vh] relative rounded-lg shadow-xl bg-primary"
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
                <div className="w-16 h-16 bg-primary text-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-primary transition-colors">
                  <img src={service.icon} alt="" />
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">
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
                addToCart={addToCart}
                onBook={() => {
                  console.log("handle booking home:", item), onBook(item);
                }}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="!border-primary !text-primary hover:!bg-primary hover:!text-white rounded-xl"
              onClick={() => navigate("/lawns")}
            >
              View All Venues
            </Button>
          </div>
        </div>

        {/* <div>
          <button
            onClick={() => navigate("/gallery")}
            className="text-secondary font-bold flex items-center gap-2 hover:gap-4 transition-all"
          >
            View Our Gallery <ArrowRight size={20} />
          </button>
        </div> */}
        {/* Gallery Highlights */}
        <div className="py-14 px-4 max-w-7xl mx-auto">
          <SectionTitle
            title="Gallery Highlights"
            subtitle="Moments We’ve Created"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {galleryInfo.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                onClick={() => navigate("/gallery")}
              >
                {/* <img
                  src={item.image}
                  alt={item.title || "Gallery Image"}
                  className="w-full h-[260px] object-cover transform group-hover:scale-110 transition duration-500"
                /> */}
                {/* ✅ VIDEO */}
                {item.video ? (
                  <video
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* ✅ IMAGE */
                  <img
                    src={item.image}
                    alt="Gallery"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-white text-lg font-semibold tracking-wide">
                    View Gallery
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="!border-primary !text-primary hover:!bg-primary rounded-xl hover:!text-white flex items-center gap-2 mx-auto"
              onClick={() => navigate("/gallery")}
            >
              View Full Gallery <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    );};

export default HomePage
