"use client";

import React, { useState } from "react";

export default function Navbar() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: ((e.clientX - left) / width) * 100,
      y: ((e.clientY - top) / height) * 100,
    });
  };

  return (
    <nav
      onMouseMove={handleMouseMove}
      className="relative overflow-visible text-white shadow-lg"
      style={{
        background: `radial-gradient(circle at ${position.x}% ${position.y}%, #4289da, #16377e)`,
      }}
    >
      <div className="mx-auto flex flex-wrap items-center justify-between gap-4 px-8 py-4 max-w-[1440px]">
        <div className="flex items-center gap-4">
          <img src="/itransco.png" alt="Itransco Logo" className="h-12 w-12 object-contain" />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-200">Itransco</p>
            <h1 className="text-xl font-semibold">Business Website</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm font-semibold">
          <a href="#features" className="relative group transition hover:text-white">
            Features
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#about" className="relative group transition hover:text-white">
            About
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#services" className="relative group transition hover:text-white">
            Services
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#contact" className="relative group transition hover:text-white">
            Contact
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        <a
          href="#contact"
          className="rounded-2xl bg-white px-5 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-gray-100"
        >
          Schedule Demo
        </a>
      </div>
    </nav>
  );
}
