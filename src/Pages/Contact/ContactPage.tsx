// import React, { useEffect } from 'react'
// import Button from '../ReusableComponent/Button';
// import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
// import SectionTitle from '../ReusableComponent/Section';
// import axios from 'axios';
// import apis from "../../utilities/api.js"

// const fetchContectInfo=async()=>{
//   try {
//     console.log(apis.contact_info);
//     const res = await axios.get(apis.contact_info);
//     console.log("ress:",res)
//   } catch (error) {
//     console.error(error)
//   }
// }
// useEffect(()=>{
//   fetchContectInfo()
// },[])
// const ContactPage = () => (
//   <div className="py-24 px-4 max-w-7xl mx-auto animate-fade-in">
//     <SectionTitle title="Contact Us" subtitle="Get In Touch" />
//     <div className="grid md:grid-cols-2 gap-12 bg-white rounded-lg shadow-xl overflow-hidden">
//       <div className="bg-[#0f3d2e] p-10 text-white">
//         <h3 className="text-2xl font-serif font-bold mb-6">
//           Contact Information
//         </h3>
//         <div className="space-y-6">
//           <div className="flex items-start gap-4">
//             <MapPin className="text-[#d4af37] w-6 h-6 mt-1" />
//             <div>
//               <p className="font-bold text-[#d4af37]">Address</p>
//               <p className="text-gray-300">
//                 Parinay Pavallion Resort, Wedding Avenue, Lucknow, UP - 226010
//               </p>
//             </div>
//           </div>
//           <div className="flex items-start gap-4">
//             <Phone className="text-[#d4af37] w-6 h-6 mt-1" />
//             <div>
//               <p className="font-bold text-[#d4af37]">Phone</p>
//               <p className="text-gray-300">+91 98765 43210</p>
//             </div>
//           </div>
//           <div className="flex items-start gap-4">
//             <Mail className="text-[#d4af37] w-6 h-6 mt-1" />
//             <div>
//               <p className="font-bold text-[#d4af37]">Email</p>
//               <p className="text-gray-300">bookings@parinaypavallion.com</p>
//             </div>
//           </div>
//         </div>

//         <div className="mt-12">
//           <p className="font-bold text-[#d4af37] mb-4">Follow Us</p>
//           <div className="flex gap-4">
//             <a
//               href="#"
//               className="p-2 bg-white/10 rounded-full hover:bg-[#d4af37] hover:text-[#0f3d2e] transition"
//             >
//               <Instagram size={20} />
//             </a>
//             <a
//               href="#"
//               className="p-2 bg-white/10 rounded-full hover:bg-[#d4af37] hover:text-[#0f3d2e] transition"
//             >
//               <Facebook size={20} />
//             </a>
//           </div>
//         </div>
//       </div>

//       <div className="p-10">
//         <h3 className="text-2xl font-serif font-bold text-[#0f3d2e] mb-6">
//           Send a Message
//         </h3>
//         <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//           <div className="grid md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Your Name"
//               className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#0f3d2e] focus:outline-none"
//             />
//             <input
//               type="tel"
//               placeholder="Phone Number"
//               className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#0f3d2e] focus:outline-none"
//             />
//           </div>
//           <input
//             type="email"
//             placeholder="Email Address"
//             className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#0f3d2e] focus:outline-none"
//           />
//           <textarea
//             rows={4}
//             placeholder="Your Message"
//             className="w-full px-4 py-3 border border-gray-300 rounded focus:border-[#0f3d2e] focus:outline-none"
//           ></textarea>
//           <Button className="w-full">Send Message</Button>
//         </form>
//       </div>
//     </div>
//   </div>
// );

// export default ContactPage


import React, { useEffect, useState } from "react";
import Button from "../ReusableComponent/Button";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import SectionTitle from "../ReusableComponent/Section";
import axios from "axios";
import apis from "../../utilities/api.js";
import { toast } from "react-toastify";
import Loader from "../ReusableComponent/Loader"

const ContactPage = () => {
  const [infoData,setInfoData]=useState(null)
  const [loading, setLoading] = useState(false);

  const [formData,setFormData]=useState({
    name:"",
    mobile:"",
    email:"",
    message:""
  })
  const fetchContectInfo = async () => {
    try {
      setLoading(true)
      console.log(apis.contact_info);
      const res = await axios.get(apis.contact_info);
      console.log("res contact info:", res);
      setInfoData(res?.data?.data)
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false)
    }
  };

  const handleSubmit=async()=>{
    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        message: formData.message,
      };
      console.log(payload)
      const res = await axios.post(apis.send_message,payload);
      console.log("res",res?.data)
      if(res?.data?.status==true){
        toast.success(res?.data?.message)
        setFormData({
          name: "",
          mobile: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContectInfo();
  }, []);
if (loading) {
  return <Loader />;
}
  return (
    <div className="py-4 px-4 max-w-7xl mx-auto animate-fade-in">
      <SectionTitle title="Contact Us" subtitle="Get In Touch" />

      <div className="grid md:grid-cols-2 gap-12 bg-white rounded-lg shadow-xl overflow-hidden">
        {/* LEFT */}
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
                  {/* Parinay Pavallion Resort, Wedding Avenue, Lucknow, UP - 226010 */}
                  {infoData?.address}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-[#d4af37] w-6 h-6 mt-1" />
              <div>
                <p className="font-bold text-[#d4af37]">Phone</p>
                <p className="text-gray-300">{infoData?.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="text-[#d4af37] w-6 h-6 mt-1" />
              <div>
                <p className="font-bold text-[#d4af37]">Email</p>
                <p className="text-gray-300">{infoData?.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="font-bold text-[#d4af37] mb-4">Follow Us</p>
            <div className="flex gap-4">
              <a
                className="p-2 bg-white/10 rounded-full hover:bg-[#d4af37] hover:text-[#0f3d2e] transition cursor-pointer"
                onClick={() => {
                  window.open(infoData?.social?.instagram, "_blank");
                }}
              >
                <Instagram size={20} />
              </a>
              <a
                className="p-2 bg-white/10 rounded-full hover:bg-[#d4af37] hover:text-[#0f3d2e] transition"
                onClick={() => {
                  window.open(infoData?.social?.facebook, "_blank");
                }}
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-10">
          <h3 className="text-2xl font-serif font-bold text-[#0f3d2e] mb-6">
            Send a Message
          </h3>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="String"
                value={formData.name}
                className="input"
                placeholder="Your Name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="Number"
                value={formData.mobile}
                className="input"
                placeholder="Phone Number"
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
              />
            </div>
            <input
              type="email"
              className="input"
              value={formData.email}
              placeholder="Email Address"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <textarea
              className="input"
              value={formData.message}
              rows={4}
              placeholder="Your Message"
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
            {/* <Button className="w-full">Send Message</Button> */}
            <Button className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
