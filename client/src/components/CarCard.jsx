import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        scrollTo(0, 0);
      }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden bg-gray-50">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
           {car.isAvaliable ? (
            <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Available
            </span>
           ) : (
             <span className="bg-red-500/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Booked
            </span>
           )}
        </div>

        {/* Price Tag (Floating) */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md border border-white/50 px-4 py-2 rounded-2xl shadow-lg flex items-baseline gap-1">
          <span className="text-primary font-bold text-xl">{currency}{car.pricePerDay}</span>
          <span className="text-gray-500 text-xs font-medium">/day</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title & Category */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
              {car.brand} {car.model}
            </h3>
            <p className="text-gray-400 text-sm font-medium mt-1">{car.category} • {car.year}</p>
          </div>
        </div>

        <div className="w-full h-px bg-gray-100 mb-4"></div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
          <div className="flex items-center gap-2 text-gray-500">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center p-1.5">
               <img src={assets.users_icon} alt="seats" className="w-full h-full object-contain opacity-70" />
            </div>
            <span className="text-sm font-medium">{car.seating_capacity} Seats</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
             <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center p-1.5">
               <img src={assets.fuel_icon} alt="fuel" className="w-full h-full object-contain opacity-70" />
            </div>
            <span className="text-sm font-medium">{car.fuel_type}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
             <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center p-1.5">
               <img src={assets.car_icon} alt="transmission" className="w-full h-full object-contain opacity-70" />
            </div>
            <span className="text-sm font-medium">{car.transmission}</span>
          </div>
           <div className="flex items-center gap-2 text-gray-500">
             <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center p-1.5">
               <img src={assets.location_icon} alt="location" className="w-full h-full object-contain opacity-70" />
            </div>
            <span className="text-sm font-medium truncate max-w-[100px]">{car.location}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <button className="w-full py-3.5 bg-gray-900 text-white font-semibold rounded-xl group-hover:bg-primary transition-colors duration-300 shadow-lg shadow-gray-200 group-hover:shadow-blue-500/20 flex items-center justify-center gap-2">
            Rent Now
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
