"use client";

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  return (
    <footer className="mt-16 sm:mt-24 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section with Logo and Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 pb-8 border-b border-opacity-20 border-current">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-center gap-2">
              <img
                src="/youtloop-logo.svg"
                alt="YoutLoop Logo"
                className="w-8 h-8"
              />
              <span
                className={`text-lg font-bold ${
                  isDarkMode ? "text-white" : "text-[#0f0f0f]"
                }`}
              >
                YoutLoop
              </span>
            </div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-[#606060]"
              }`}
            >
              Loop YouTube videos with precision
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className={`text-sm hover:underline ${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-[#606060] hover:text-[#0f0f0f]"
              }`}
            >
              Privacy
            </a>
            <a
              href="/terms"
              className={`text-sm hover:underline ${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-[#606060] hover:text-[#0f0f0f]"
              }`}
            >
              Terms
            </a>
            <a
              href="mailto:youtloop2025@gmail.com"
              className={`text-sm hover:underline ${
                isDarkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-[#606060] hover:text-[#0f0f0f]"
              }`}
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bottom Section with Copyright and Credits */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className={isDarkMode ? "text-gray-400" : "text-[#606060]"}>
            © {new Date().getFullYear()} YoutLoop. All rights reserved.
          </p>
          <p className={isDarkMode ? "text-gray-400" : "text-[#606060]"}>
            Created by{" "}
            <a
              href="https://www.daniilmikhailov.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline ${
                isDarkMode ? "text-white" : "text-[#0f0f0f]"
              }`}
            >
              Daniil Mikhailov
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
