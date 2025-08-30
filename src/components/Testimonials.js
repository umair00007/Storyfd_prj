"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: `"The quality never wanes. Continuing to offer 925 silver and high-end, quality jewellery at an alarmingly accessible price point."`,
    author: "Clash",
    logo: "/assets/images/clash.svg",
  },
  {
    text: `"Serge DeNimes has blended the traditionally clear line between streetwear and jewellery."`,
    author: "Hypebeast",
    logo: "/assets/images/hypebeast.svg",
  },
  {
    text: `"We are always excited by their innovative seasonal collections."`,
    author: "Vogue",
    logo: "/assets/images/vogue.svg",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full max-w-xl mx-auto text-center p-6 bg-white shadow rounded-2xl">
      <div className="flex justify-center items-center space-x-4 mb-4">
        <button onClick={prevTestimonial}>
          <ChevronLeft className="w-6 h-6 cursor-pointer" />
        </button>
        <div className="flex-1">
          <p className="text-gray-700 text-lg italic">
            {testimonials[currentIndex].text}
          </p>
          <div className="flex justify-center items-center mt-3 space-x-2">
            <img
              src={testimonials[currentIndex].logo}
              alt={testimonials[currentIndex].author}
              className="w-10 h-10"
            />
            <p className="font-semibold">{testimonials[currentIndex].author}</p>
          </div>
        </div>
        <button onClick={nextTestimonial}>
          <ChevronRight className="w-6 h-6 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
