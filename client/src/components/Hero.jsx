import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");

  const { pickupDate, setPickupDate, navigate, returnDate, setReturnDate } =
    useAppContext();
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center gap-10 md:gap-14
    bg-gradient-to-b from-blue-50 to-white text-center px-6 pt-36"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.span 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-blue-100 text-primary text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider"
        >
          Premium Car Rental
        </motion.span>
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold max-w-4xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent pb-2"
        >
          Drive the experience, <br /> rent the luxury.
        </motion.h1>
        <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.8, delay: 0.3 }}
           className="text-gray-500 max-w-xl text-lg"
        >
          Choose from our exclusive fleet of high-end vehicles for your next adventure or business trip.
        </motion.p>
      </div>

      <motion.form
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className="flex flex-col lg:flex-row items-center gap-6 p-3 rounded-3xl w-full max-w-4xl
      bg-white/80 backdrop-blur-md border border-white/50 shadow-2xl shadow-blue-500/10"
      >
        <div className="flex flex-col md:flex-row items-center gap-4 w-full p-4 lg:p-0">
          <div className="flex flex-col items-start gap-2 w-full px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
            <label className="text-xs font-semibold text-gray-400 uppercase">Location</label>
            <select
              required
              className="w-full font-medium bg-transparent outline-none cursor-pointer text-gray-700"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            >
              <option value="">Select City</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex flex-col items-start gap-2 w-full px-4 border-b md:border-b-0 md:border-r border-gray-100 pb-4 md:pb-0">
            <label htmlFor="pickup-date" className="text-xs font-semibold text-gray-400 uppercase">Pick-up Date</label>
            <input
              type="date"
              id="pickup-date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full font-medium text-gray-700 outline-none cursor-pointer"
              required
            />
          </div>

          <div className="flex flex-col items-start gap-2 w-full px-4">
             <label htmlFor="return-date" className="text-xs font-semibold text-gray-400 uppercase">Return Date</label>
            <input
              type="date"
              id="return-date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full font-medium text-gray-700 outline-none cursor-pointer"
              required
            />
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-2 px-8 py-5 h-full w-full lg:w-auto
          bg-primary hover:bg-primary-dull text-white font-semibold rounded-2xl transition-all shadow-lg shadow-blue-500/30 whitespace-nowrap"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="w-5 h-5 brightness-0 invert"
          />
          Find Cars
        </motion.button>
      </motion.form>

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative w-full max-w-5xl mt-8"
      >
        {/* Glow effect matching car */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/20 blur-[100px] rounded-full -z-10"></div>
        <img
          src={assets.main_car}
          alt="Luxury Car"
          className="w-full h-auto object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero;
