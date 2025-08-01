"use client";

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  return (
    <footer className="text-center mt-8 sm:mt-12">
      <p
        className={`text-sm sm:text-base ${
          isDarkMode ? "text-gray-400" : "text-[#606060]"
        }`}
      >
        Made with ❤️ for learning and practice
      </p>
      <p
        className={`text-xs sm:text-sm mt-2 ${
          isDarkMode ? "text-gray-400" : "text-[#606060]"
        }`}
      >
        Inspired by LoopTube
      </p>
    </footer>
  );
}
