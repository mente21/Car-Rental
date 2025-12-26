import React from "react";
import { motion } from "motion/react";

const Title = ({ title, subTitle, align }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center 
    text-center gap-2 ${align === "left" && "md:items-start md:text-left"}`}
    >
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-primary font-bold tracking-[0.2em] text-xs uppercase"
      >
        Discover Luxury
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 capitalize"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-500 text-sm md:text-base mt-2 max-w-2xl leading-relaxed"
      >
        {subTitle}
      </motion.p>
      <div className="w-20 h-1 bg-primary rounded-full mt-4 bg-gradient-to-r from-primary to-blue-300"></div>
    </div>
  );
};

export default Title;
