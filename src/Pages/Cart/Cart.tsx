import React, { useEffect, useState } from "react";
import {  Trash2 } from "lucide-react";
import axios from "axios";
import apis from "../../utilities/api.js";
import { toast } from "react-toastify";
import Loader from "../ReusableComponent/Loader";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  date: string;
  onBook:void
}

interface CartProps {
  onBook: (item: any) => void;
  id: number;
  title: string;
  image: string;
  price: number;
  date: string;
}

const Cart: React.FC<CartProps> = ({ onBook }) => {
  const [active, setActive] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [loading,setLoading]=useState(false)
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      // console.log("token",token)
      const res = await axios.post(
        apis.my_cart,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      console.log("res:", res?.data);
      setCartData(res?.data?.data);
    } catch (error) {
      console.error(error?.response);
    }
  };

  const total = active
    ? Number(cartData.find((item) => item.id === active)?.base_price || 0)
    : cartData.reduce((sum, item) => sum + Number(item.base_price), 0);

  const addToCart = async (id: number | string, check_cart: boolean) => {
    try {
      // setloading(true)
      const token = localStorage.getItem("token");
      const payload = {
        status:0,
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
      toast.success(res?.data?.message);
      fetchCart();
    } catch (error) {
      console.error(error);
    }
    // finally{
    //   setloading(false)
    // }
  };

  const activeItem = active
    ? cartData.find((item) => item.id === active)
    : null;

   const navigate = useNavigate();
   const getProperty = async (id) => {
     try {
       const res = await axios.get(`${apis.getPropertiesById}${id}`);
       console.log("id:", res?.data);
       if (res?.data?.status === true) {
         navigate("/propertywise", { state: res?.data?.data });
       }
     } catch (error) {
       console.error(error);
     }
   };


  useEffect(() => {}, [active]);
  useEffect(() => {
      const fetchCart = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          // console.log("token",token)
          const res = await axios.post(
            apis.my_cart,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
          );
          console.log("res:", res?.data);
          setCartData(res?.data?.data);
        } catch (error) {
          console.error(error?.response);
        } finally {
          setLoading(false);
        }
      };
    fetchCart();
  }, []);

  if(loading){return(<Loader/>)}

  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">
            Your Cart
          </h2>

          {/* {cartData.map((item) => (
            <div
              key={item.id}
              className={`flex gap-6 bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition ${
                active == item.id ? "border border-red" : "border border-none"
              }`}
              onClick={() => setActive(item.id)}
            >
              <img
                src={item.images[0]?.image}
                alt={item.name}
                className="w-32 h-28 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-semibold text-secondary">
                    ₹ {item.base_price.toLocaleString()}
                  </span>

                  <button
                    className="text-red-500 hover:text-red-600 flex items-center gap-1"
                    onClick={() => addToCart(item.id, item.is_featured)}
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))} */}
          {cartData.map((item) => (
            <div
              key={item.id}
              className={`flex gap-6 bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition ${
                active == item.id ? "border-red" : "border-transparent"
              }`}
              onClick={() => setActive(item.id)}
            >
              <img
                src={item.images[0]?.image}
                alt={item.name}
                className="w-32 h-28 object-cover rounded-lg"
              />

              <div className="flex-1 flex flex-col">
                {/* TOP ROW */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-primary">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* SEE BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      getProperty(item.id);
                    }}
                    className="text-sm border border-primary text-primary px-3 py-1 rounded-md hover:bg-primary hover:text-white transition"
                  >
                    See
                  </button>
                </div>

                {/* BOTTOM ROW */}
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-semibold text-secondary">
                    ₹ {item.base_price.toLocaleString()}
                  </span>

                  <button
                    // onClick={(e) => {
                    //   e.stopPropagation();
                    //   addToCart(item.id, item.is_featured);
                    // }}
                    onClick={() => addToCart(item.id, item.is_featured)}
                    className="text-red-500 hover:text-red-600 flex items-center gap-1"
                  >
                    <Trash2 size={18} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-[#f9f9f9] rounded-xl p-6 shadow-sm h-fit">
          <h3 className="text-xl font-bold text-primary mb-4">Order Summary</h3>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>₹ {total.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-4">
            <span>Service Charges</span>
            <span>₹ 0</span>
          </div>

          <hr className="mb-4" />

          <div className="flex justify-between text-lg font-bold text-primary mb-6">
            <span>Total</span>
            <span>₹ {total.toLocaleString()}</span>
          </div>

          <button
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-[#0c3226] transition"
            onClick={() => {
              if (!activeItem) {
                toast.warning("Please select an item to proceed");
                return;
              }

              console.log("Selected Item:", activeItem); // ✅ console
              onBook(activeItem); // ✅ poora data pass
            }}
          >
            Proceed to Checkout
          </button>

          <button className="w-full mt-3 border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition">
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
