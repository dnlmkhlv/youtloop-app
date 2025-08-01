"use client";

import Image from "next/image";
import { Search, Sun, Moon } from "lucide-react";

interface HeaderProps {
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  handleUrlSubmit: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  handleReset: () => void;
}

export default function Header({
  videoUrl,
  setVideoUrl,
  handleUrlSubmit,
  isDarkMode,
  toggleTheme,
  searchInputRef,
  handleReset,
}: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#0f0f0f] border-[#272727]"
          : "bg-white border-[#e5e5e5]"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-4">
        {/* Left side - Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
          onClick={handleReset}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === "Enter" && handleReset()}
        >
          <Image
            src="/youtloop-logo.svg"
            alt="YoutLoop Logo"
            width={40}
            height={40}
            priority
          />
          <h1
            className={`text-lg sm:text-xl font-bold ${
              isDarkMode ? "text-white" : "text-[#0f0f0f]"
            }`}
          >
            YoutLoop
          </h1>
        </div>

        {/* Center - Search Bar */}
        <div className="flex-1 w-full sm:max-w-2xl sm:mx-8">
          <div className="flex">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Paste YouTube URL here..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className={`flex-1 px-3 sm:px-4 py-2 border-l border-t border-b rounded-l-full transition-colors duration-300 focus:outline-none text-sm sm:text-base ${
                isDarkMode
                  ? "bg-[#121212] border-[#303030] text-white placeholder-[#aaa]"
                  : "bg-white border-[#ccc] text-[#0f0f0f] placeholder-[#606060]"
              }`}
              onKeyPress={(e) => e.key === "Enter" && handleUrlSubmit()}
            />
            <button
              onClick={handleUrlSubmit}
              className={`px-4 sm:px-6 py-2 border-r border-t border-b rounded-r-full transition-colors duration-300 ${
                isDarkMode
                  ? "bg-[#222] border-[#303030] hover:bg-[#303030]"
                  : "bg-[#f8f8f8] border-[#ccc] hover:bg-[#e5e5e5]"
              }`}
            >
              <Search size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Right side - Theme Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDarkMode
                ? "hover:bg-[#272727] text-white"
                : "hover:bg-[#f2f2f2] text-[#0f0f0f]"
            }`}
          >
            {isDarkMode ? (
              <Sun size={18} className="sm:w-5 sm:h-5" />
            ) : (
              <Moon size={18} className="sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
