import React, { useState, useEffect } from "react";
import { assets, menuLinks } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Navbar = () => {
  const { setShowLogin, user, logOut, isOwner, axios, setIsOwner } =
    useAppContext();

  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  //function changeRole
  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed z-50 transition-all duration-500 ease-in-out flex items-center justify-between
        ${
          isScrolled
            ? "top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[85%] lg:w-[80%] rounded-full bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl py-2 px-6 md:px-10"
            : "top-0 left-0 w-full bg-transparent py-6 px-6 md:px-12 lg:px-20"
        }
      `}
    >
      {/* Logo Section */}
      <Link to="/" className="flex-shrink-0 group">
        <motion.img
          layout
          transition={{ duration: 0.5 }}
          src={assets.logo}
          alt="Mente's Car Rental"
          className={`object-contain transition-all duration-500 drop-shadow-md group-hover:drop-shadow-xl
            ${isScrolled ? "h-20" : "h-24 md:h-36"}`}
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-8">
        {menuLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className={`text-sm font-medium tracking-wide transition-all duration-300 relative group
              ${
                location.pathname === link.path
                  ? "text-primary font-bold"
                  : "text-gray-700 hover:text-primary"
              }`}
          >
            {link.name}
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full
              ${location.pathname === link.path ? "w-full" : ""}`}></span>
          </Link>
        ))}
      </div>

      {/* Right Section: Search & Actions */}
      <div className="hidden lg:flex items-center gap-5">
        {/* Search Input */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 border
           ${isScrolled ? "bg-white/50 border-gray-200" : "bg-white/80 backdrop-blur-sm border-white/50 shadow-sm"}`}>
          <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-50" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 w-24 focus:w-40 transition-all duration-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            className="text-sm font-medium text-gray-700 hover:text-primary transition-colors whitespace-nowrap"
          >
            {isOwner ? "Dashboard" : "List Car"}
          </button>
          
          <button
            onClick={() => {
              user ? logOut() : setShowLogin(true);
            }}
            className="relative overflow-hidden px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-primary to-blue-600 
            rounded-full shadow-lg shadow-blue-500/40 transition-all hover:scale-105 hover:shadow-blue-500/60 active:scale-95"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      {/* Mobile Menu & Toggle */}
      <div className="lg:hidden flex items-center gap-4">
         {/* Mobile User Action */}
         {user && (
            <div className="w-9 h-9 rounded-full border-2 border-white shadow-md overflow-hidden">
                <img src={user.image || assets.user_profile} alt="user" className="w-full h-full object-cover"/>
            </div>
         )}
         
        <button
          className="cursor-pointer z-50 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md transition-colors"
          onClick={() => setOpen(!open)}
        >
          <img
            src={open ? assets.close_icon : assets.menu_icon}
            alt="menu"
            className="h-7 w-7 text-gray-800"
          />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-white/95 backdrop-blur-2xl shadow-3xl transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) z-40
          ${open ? "translate-x-0" : "translate-x-full"} lg:hidden flex flex-col pt-24 px-8 gap-8`}
      >
        {menuLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="text-xl font-medium text-gray-800 hover:text-primary flex justify-between items-center group"
            onClick={() => setOpen(false)}
          >
            {link.name}
            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary">→</span>
          </Link>
        ))}
        
        <div className="flex flex-col gap-5 mt-4 border-t border-gray-100 pt-8">
             <button
            onClick={() => {
                 setOpen(false)
                 isOwner ? navigate("/owner") : changeRole()
            }}
            className="text-left text-lg font-medium text-gray-600 hover:text-primary"
          >
            {isOwner ? "Dashboard" : "List Your Car"}
          </button>
           <button
            onClick={() => {
              setOpen(false);
              user ? logOut() : setShowLogin(true);
            }}
            className="w-full py-4 text-center font-bold text-white bg-primary rounded-xl shadow-xl shadow-blue-500/20"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
