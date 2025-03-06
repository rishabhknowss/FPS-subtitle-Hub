"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="flex justify-between m-4 mx-80 bg-white rounded-full p-2">
      <div className="flex flex-col justify-center">
        <Image src="/logo.png" width={100} height={100} alt="logo" />
      </div>

      <div className="flex flex-col justify-center ">
        <div className="flex justify-between space-x-20 font-semibold">
          <div className="hover:text-blue-700 cursor-pointer">Home </div>
          <div className="flex items-center space-x-1">
            <span className="hover:text-blue-700 cursor-pointer">Services</span>
            <ChevronDown size={16} />
          </div>
          <div className="flex items-center space-x-1">
            <span className="hover:text-blue-700 cursor-pointer">Company</span>
            <ChevronDown size={16} />
          </div>
          <div className="hover:text-blue-700 cursor-pointer">Contact </div>
        </div>
      </div>

      <div className="flex flex-col justify-center mx-4">
        <button className="p-2 bg-blue-700 rounded-full px-8 text-white font-bold">Book a call</button>
      </div>
    </div>
  );
};
