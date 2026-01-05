// import { Camera, Coffee, Heart, Music } from 'lucide-react';
// import React, { useEffect,useState } from 'react'
// import SectionTitle from '../ReusableComponent/Section';
// import axios from 'axios';
// import apis from "../../utilities/api.js"
// import Loader from "../ReusableComponent/Loader";

// const GalleryPage = () => {
//    const [loading, setLoading] = useState(false);
//   const [galleryInfo, setgalleryInfo] = useState([])
//   const fetchGallery=async()=>{
//     try {
//       setLoading(true)
//       const res = await axios.get(apis.gallery_list);
//       console.log(res?.data?.data)
//       setgalleryInfo(res?.data?.data);
//     } catch (error) {
//       console.log(error)
//     }finally{
//       setLoading(false)
//     }
//   }
//   useEffect(()=>{
//     fetchGallery()
//   },[])

//   if(loading){return(<Loader/>)}

//   return (
//     <div className="py-4 px-4 max-w-7xl mx-auto animate-fade-in">
//       <SectionTitle title="Photo Gallery" subtitle="Moments to Cherish" />
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {galleryInfo.map((img, idx) => (
//           <div
//             key={idx}
//             className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer"
//           >
//             <img
//               src={img.image}
//               alt="Gallery"
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//               <Camera className="text-white w-8 h-8" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );}

// export default GalleryPage

import { Camera, Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import SectionTitle from "../ReusableComponent/Section";
import axios from "axios";
import apis from "../../utilities/api.js";
import Loader from "../ReusableComponent/Loader";

const GalleryPage = () => {
  const [loading, setLoading] = useState(false);
  const [galleryInfo, setGalleryInfo] = useState([]);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await axios.get(apis.gallery_list);
      setGalleryInfo(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="py-4 px-4 max-w-7xl mx-auto animate-fade-in">
      <SectionTitle title="Photo Gallery" subtitle="Moments to Cherish" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryInfo.map((item, idx) => (
          <div
            key={idx}
            className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer bg-black"
          >
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

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              {item.video ? (
                <Play className="text-white w-10 h-10" />
              ) : (
                <Camera className="text-white w-8 h-8" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
