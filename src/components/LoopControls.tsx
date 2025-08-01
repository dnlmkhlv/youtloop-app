"use client";

interface LoopControlsProps {
  videoId: string;
  isLooping: boolean;
  loopStart: number;
  loopEnd: number;
  isDarkMode: boolean;
  setIsLooping: (looping: boolean) => void;
  formatTime: (seconds: number) => string;
}

export default function LoopControls({
  videoId,
  isLooping,
  loopStart,
  loopEnd,
  isDarkMode,
  setIsLooping,
  formatTime,
}: LoopControlsProps) {
  if (!videoId) return null;

  return (
    <div className="mb-8">
      <div
        className={`rounded-lg p-6 transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#1f1f1f] border border-[#272727]"
            : "bg-[#f9f9f9] border border-[#e5e5e5]"
        }`}
      >
        <h3
          className={`text-xl font-semibold mb-4 ${
            isDarkMode ? "text-white" : "text-[#0f0f0f]"
          }`}
        >
          Loop Controls
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Loop Status */}
          <div className="lg:col-span-1">
            <h4
              className={`font-medium mb-3 ${
                isDarkMode ? "text-gray-200" : "text-[#606060]"
              }`}
            >
              Loop Status
            </h4>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setIsLooping(!isLooping)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm font-medium transition-all duration-300 w-fit ${
                  isLooping
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : isDarkMode
                      ? "bg-[#272727] hover:bg-[#404040] text-white"
                      : "bg-[#f2f2f2] hover:bg-[#e5e5e5] text-[#0f0f0f]"
                }`}
              >
                {isLooping ? "Disable Loop" : "Enable Loop"}
              </button>
              {isLooping && (
                <span className="text-sm text-red-400 font-medium">
                  Looping: {formatTime(loopStart)} - {formatTime(loopEnd)}
                </span>
              )}
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="lg:col-span-2">
            <h4
              className={`font-medium mb-3 ${
                isDarkMode ? "text-gray-200" : "text-[#606060]"
              }`}
            >
              Keyboard Shortcuts
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span
                    className={isDarkMode ? "text-gray-300" : "text-[#606060]"}
                  >
                    Play/Pause:
                  </span>
                  <kbd
                    className={`px-3 py-1 border rounded text-sm font-mono ${
                      isDarkMode
                        ? "bg-[#272727] border-[#404040] text-gray-200"
                        : "bg-[#f2f2f2] border-[#ccc] text-[#0f0f0f]"
                    }`}
                  >
                    Ctrl + P
                  </kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={isDarkMode ? "text-gray-300" : "text-[#606060]"}
                  >
                    Back 10s:
                  </span>
                  <kbd
                    className={`px-3 py-1 border rounded text-sm font-mono ${
                      isDarkMode
                        ? "bg-[#272727] border-[#404040] text-gray-200"
                        : "bg-[#f2f2f2] border-[#ccc] text-[#0f0f0f]"
                    }`}
                  >
                    Ctrl + B
                  </kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={isDarkMode ? "text-gray-300" : "text-[#606060]"}
                  >
                    Forward 10s:
                  </span>
                  <kbd
                    className={`px-3 py-1 border rounded text-sm font-mono ${
                      isDarkMode
                        ? "bg-[#272727] border-[#404040] text-gray-200"
                        : "bg-[#f2f2f2] border-[#ccc] text-[#0f0f0f]"
                    }`}
                  >
                    Ctrl + F
                  </kbd>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span
                    className={isDarkMode ? "text-gray-300" : "text-[#606060]"}
                  >
                    Toggle Loop:
                  </span>
                  <kbd
                    className={`px-3 py-1 border rounded text-sm font-mono ${
                      isDarkMode
                        ? "bg-[#272727] border-[#404040] text-gray-200"
                        : "bg-[#f2f2f2] border-[#ccc] text-[#0f0f0f]"
                    }`}
                  >
                    Ctrl + L
                  </kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={isDarkMode ? "text-gray-300" : "text-[#606060]"}
                  >
                    Speed Up:
                  </span>
                  <kbd
                    className={`px-3 py-1 border rounded text-sm font-mono ${
                      isDarkMode
                        ? "bg-[#272727] border-[#404040] text-gray-200"
                        : "bg-[#f2f2f2] border-[#ccc] text-[#0f0f0f]"
                    }`}
                  >
                    Ctrl + U
                  </kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={isDarkMode ? "text-gray-300" : "text-[#606060]"}
                  >
                    Speed Down:
                  </span>
                  <kbd
                    className={`px-3 py-1 border rounded text-sm font-mono ${
                      isDarkMode
                        ? "bg-[#272727] border-[#404040] text-gray-200"
                        : "bg-[#f2f2f2] border-[#ccc] text-[#0f0f0f]"
                    }`}
                  >
                    Ctrl + J
                  </kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
