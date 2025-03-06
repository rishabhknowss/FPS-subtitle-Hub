"use client";

import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <div className="grid ">
      <div>
        <Navbar />
      </div>
      <div>
        <Hero />
      </div>
    </div>
  );
}
