"use client";

import { Play, SkipBack, RotateCcw, Gauge } from "lucide-react";

interface InformationSectionProps {
  isDarkMode: boolean;
}

export default function InformationSection({
  isDarkMode,
}: InformationSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
      {/* What is YoutLoop */}
      <div
        className={`rounded-lg p-4 sm:p-6 border transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#1f1f1f] border-[#272727]"
            : "bg-[#f9f9f9] border-[#e5e5e5]"
        }`}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-red-600">
          Repeat YouTube Video in AB Loop
        </h3>
        <h4
          className={`text-base sm:text-lg font-semibold mb-3 ${
            isDarkMode ? "text-white" : "text-[#0f0f0f]"
          }`}
        >
          What is YoutLoop:
        </h4>
        <p
          className={`leading-relaxed mb-4 text-sm sm:text-base ${
            isDarkMode ? "text-gray-300" : "text-[#606060]"
          }`}
        >
          YoutLoop is a free online tool to repeat any YouTube videos. Just
          select YouTube videos by typing a URL in the search bar, and you can
          set AB loop in any point of the video. This is useful when you want to
          learn some kind of skills (such as languages, sports, music, etc.) by
          watching a specific part over and over.
        </p>

        <h4
          className={`text-base sm:text-lg font-semibold mb-3 ${
            isDarkMode ? "text-white" : "text-[#0f0f0f]"
          }`}
        >
          Features:
        </h4>
        <ul
          className={`space-y-2 text-sm sm:text-base ${
            isDarkMode ? "text-gray-300" : "text-[#606060]"
          }`}
        >
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
            <span>Select any YouTube videos by pasting the URL</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
            <span>Repeat full or a part of YouTube video in infinite loop</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
            <span>Control video with simple buttons or keyboard shortcuts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
            <span>
              Take notes while controlling video with keyboard shortcuts
            </span>
          </li>
        </ul>
      </div>

      {/* Keyboard Shortcuts */}
      <div
        className={`rounded-lg p-4 sm:p-6 border transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#1f1f1f] border-[#272727]"
            : "bg-[#f9f9f9] border-[#e5e5e5]"
        }`}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-red-600">
          Keyboard Shortcuts
        </h3>
        <p
          className={`mb-6 text-sm sm:text-base ${
            isDarkMode ? "text-gray-300" : "text-[#606060]"
          }`}
        >
          Master your video control with these powerful keyboard shortcuts:
        </p>

        <div className="space-y-3 sm:space-y-4">
          <div
            className={`flex items-center justify-between p-2 sm:p-3 rounded-lg border ${
              isDarkMode
                ? "bg-[#272727] border-[#404040]"
                : "bg-[#f2f2f2] border-[#e5e5e5]"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Play size={14} className="sm:w-4 sm:h-4 text-white" />
              </div>
              <span
                className={`font-medium text-sm sm:text-base ${
                  isDarkMode ? "text-gray-200" : "text-[#0f0f0f]"
                }`}
              >
                Pause/Play
              </span>
            </div>
            <kbd
              className={`px-2 sm:px-3 py-1 border rounded text-xs sm:text-sm font-mono ${
                isDarkMode
                  ? "bg-[#1f1f1f] border-[#404040] text-gray-200"
                  : "bg-white border-[#ccc] text-[#0f0f0f]"
              }`}
            >
              Control + P
            </kbd>
          </div>

          <div
            className={`flex items-center justify-between p-3 rounded-lg border ${
              isDarkMode
                ? "bg-[#272727] border-[#404040]"
                : "bg-[#f2f2f2] border-[#e5e5e5]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <SkipBack size={16} className="text-white" />
              </div>
              <span
                className={`font-medium ${
                  isDarkMode ? "text-gray-200" : "text-[#0f0f0f]"
                }`}
              >
                Back
              </span>
            </div>
            <kbd
              className={`px-3 py-1 border rounded text-sm font-mono ${
                isDarkMode
                  ? "bg-[#1f1f1f] border-[#404040] text-gray-200"
                  : "bg-white border-[#ccc] text-[#0f0f0f]"
              }`}
            >
              Control + B
            </kbd>
          </div>

          <div
            className={`flex items-center justify-between p-3 rounded-lg border ${
              isDarkMode
                ? "bg-[#272727] border-[#404040]"
                : "bg-[#f2f2f2] border-[#e5e5e5]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <RotateCcw size={16} className="text-white" />
              </div>
              <span
                className={`font-medium ${
                  isDarkMode ? "text-gray-200" : "text-[#0f0f0f]"
                }`}
              >
                Loop
              </span>
            </div>
            <kbd
              className={`px-3 py-1 border rounded text-sm font-mono ${
                isDarkMode
                  ? "bg-[#1f1f1f] border-[#404040] text-gray-200"
                  : "bg-white border-[#ccc] text-[#0f0f0f]"
              }`}
            >
              Control + L
            </kbd>
          </div>

          <div
            className={`flex items-center justify-between p-3 rounded-lg border ${
              isDarkMode
                ? "bg-[#272727] border-[#404040]"
                : "bg-[#f2f2f2] border-[#e5e5e5]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Gauge size={16} className="text-white" />
              </div>
              <span
                className={`font-medium ${
                  isDarkMode ? "text-gray-200" : "text-[#0f0f0f]"
                }`}
              >
                Speed up
              </span>
            </div>
            <kbd
              className={`px-3 py-1 border rounded text-sm font-mono ${
                isDarkMode
                  ? "bg-[#1f1f1f] border-[#404040] text-gray-200"
                  : "bg-white border-[#ccc] text-[#0f0f0f]"
              }`}
            >
              Control + U
            </kbd>
          </div>

          <div
            className={`flex items-center justify-between p-3 rounded-lg border ${
              isDarkMode
                ? "bg-[#272727] border-[#404040]"
                : "bg-[#f2f2f2] border-[#e5e5e5]"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <Gauge size={16} className="text-white" />
              </div>
              <span
                className={`font-medium ${
                  isDarkMode ? "text-gray-200" : "text-[#0f0f0f]"
                }`}
              >
                Speed down
              </span>
            </div>
            <kbd
              className={`px-3 py-1 border rounded text-sm font-mono ${
                isDarkMode
                  ? "bg-[#1f1f1f] border-[#404040] text-gray-200"
                  : "bg-white border-[#ccc] text-[#0f0f0f]"
              }`}
            >
              Control + J
            </kbd>
          </div>
        </div>

        <div className="mt-6 p-4 bg-red-600/10 rounded-lg border border-red-600/20">
          <p
            className={`text-sm text-center ${
              isDarkMode ? "text-gray-300" : "text-[#606060]"
            }`}
          >
            💡 <strong>Pro Tip:</strong> Use keyboard shortcuts for hands-free
            learning while taking notes!
          </p>
        </div>
      </div>
    </div>
  );
}
