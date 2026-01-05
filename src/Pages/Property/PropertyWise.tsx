import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Users,
  Star,
  IndianRupee,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function PropertyWise({onBook}) {
  const { state: data } = useLocation();
  const [current, setCurrent] = useState(0);

  if (!data) return <div className="p-6">No property found</div>;

  const images = data.images || [];

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const defaultUser =
    "https://ui-avatars.com/api/?name=User&background=0f3d2e&color=fff";


  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* IMAGE SLIDER */}
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <img
          src={images[current]}
          className="w-full h-[260px] md:h-[420px] object-cover"
          alt="property"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {/* CONTENT */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {data.name}
          </h1>

          <p className="text-gray-600 mt-2">{data.description}</p>

          {/* INFO */}
          <div className="flex flex-wrap gap-4 mt-4">
            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded text-sm">
              <Users size={16} /> {data.min_guests} - {data.max_guests} Guests
            </span>

            <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded text-sm">
              <Star size={16} className="text-yellow-500" /> {data.rating}
            </span>

            <span className="capitalize bg-gray-100 px-3 py-1 rounded text-sm">
              {data.type}
            </span>
          </div>

          {/* FACILITIES */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Facilities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {data.facilities.map((item: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm bg-gray-50 p-2 rounded"
                >
                  <CheckCircle size={16} className="text-green-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          {/* REVIEWS */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">
              Reviews ({data.total_ratings})
            </h3>

            {data.reviews && data.reviews.length > 0 ? (
              <div className="space-y-4">
                {data.reviews.map((rev: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex gap-4 bg-gray-50 p-4 rounded-lg"
                  >
                    {/* PROFILE */}
                    <img
                      src={defaultUser}
                      alt="user"
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    {/* CONTENT */}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-primary">
                          {rev.user_name}
                        </h4>
                        <span className="text-xs text-gray-400">
                          {new Date(rev.reviewed_at).toLocaleDateString()}
                        </span>
                      </div>

                      {/* STARS */}
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < rev.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>

                      {/* REVIEW TEXT */}
                      <p className="text-sm text-gray-600 mt-2">{rev.review}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No reviews yet. Be the first to review this property.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-xl shadow p-6 h-fit sticky top-6">
          <div className="flex items-center gap-1 text-2xl font-bold text-secondary">
            <IndianRupee /> {Number(data.base_price).toLocaleString()}
          </div>
          <p className="text-gray-500 text-sm mb-4">Starting price</p>

          <button
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            onClick={() => {
              console.log(data), onBook(data);
            }}
          >
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
}
