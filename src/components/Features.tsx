"use client";

import { RotateCcw, Keyboard, Gauge } from "lucide-react";

interface FeaturesProps {
  isDarkMode: boolean;
}

export default function Features({ isDarkMode }: FeaturesProps) {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
          className={`rounded-lg p-4 sm:p-6 text-center border transition-all duration-300 hover:scale-105 ${
            isDarkMode
              ? "bg-[#1f1f1f] border-[#272727] hover:bg-[#272727]"
              : "bg-[#f9f9f9] border-[#e5e5e5] hover:bg-[#f2f2f2]"
          }`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
            <RotateCcw size={20} className="sm:w-6 sm:h-6 text-white" />
          </div>
          <h3
            className={`font-semibold mb-2 text-sm sm:text-base ${
              isDarkMode ? "text-white" : "text-[#0f0f0f]"
            }`}
          >
            AB Loop
          </h3>
          <p
            className={`text-xs sm:text-sm ${
              isDarkMode ? "text-gray-300" : "text-[#606060]"
            }`}
          >
            Set precise start and end points for seamless looping
          </p>
        </div>
        <div
          className={`rounded-lg p-4 sm:p-6 text-center border transition-all duration-300 hover:scale-105 ${
            isDarkMode
              ? "bg-[#1f1f1f] border-[#272727] hover:bg-[#272727]"
              : "bg-[#f9f9f9] border-[#e5e5e5] hover:bg-[#f2f2f2]"
          }`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
            <Keyboard size={20} className="sm:w-6 sm:h-6 text-white" />
          </div>
          <h3
            className={`font-semibold mb-2 text-sm sm:text-base ${
              isDarkMode ? "text-white" : "text-[#0f0f0f]"
            }`}
          >
            Keyboard Controls
          </h3>
          <p
            className={`text-xs sm:text-sm ${
              isDarkMode ? "text-gray-300" : "text-[#606060]"
            }`}
          >
            Full keyboard support for hands-free video control
          </p>
        </div>
        <div
          className={`rounded-lg p-4 sm:p-6 text-center border transition-all duration-300 hover:scale-105 ${
            isDarkMode
              ? "bg-[#1f1f1f] border-[#272727] hover:bg-[#272727]"
              : "bg-[#f9f9f9] border-[#e5e5e5] hover:bg-[#f2f2f2]"
          }`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
            <Gauge size={20} className="sm:w-6 sm:h-6 text-white" />
          </div>
          <h3
            className={`font-semibold mb-2 text-sm sm:text-base ${
              isDarkMode ? "text-white" : "text-[#0f0f0f]"
            }`}
          >
            Speed Control
          </h3>
          <p
            className={`text-xs sm:text-sm ${
              isDarkMode ? "text-gray-300" : "text-[#606060]"
            }`}
          >
            Adjust playback speed from 0.25x to 2x
          </p>
        </div>
      </div>
    </div>
  );
}
