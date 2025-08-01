"use client";

import { useState, useRef, useEffect } from "react";
import { Play, SkipBack, RotateCcw, Gauge } from "lucide-react";
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import LoopTimeline from "@/components/LoopTimeline";
import LoopControls from "@/components/LoopControls";
import Features from "@/components/Features";
import Modal from "@/components/Modal";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<"start" | "end" | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const playerRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const customTimelineRef = useRef<HTMLDivElement>(null);

  // Save data to localStorage
  const saveToLocalStorage = (data: any) => {
    try {
      localStorage.setItem("youtloop-data", JSON.stringify(data));
    } catch (error) {
      console.log("Error saving data:", error);
    }
  };

  // Theme toggle function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Load saved data from localStorage on component mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem("youtloop-data");
      if (savedData) {
        const data = JSON.parse(savedData);
        if (data.videoUrl) setVideoUrl(data.videoUrl);
        if (data.videoId) setVideoId(data.videoId);
        if (data.loopStart !== undefined) setLoopStart(data.loopStart);
        if (data.loopEnd !== undefined) setLoopEnd(data.loopEnd);
        if (data.isLooping !== undefined) setIsLooping(data.isLooping);
        if (data.playbackRate !== undefined) setPlaybackRate(data.playbackRate);
        if (data.volume !== undefined) setVolume(data.volume);
        if (data.isMuted !== undefined) setIsMuted(data.isMuted);
        if (data.isDarkMode !== undefined) setIsDarkMode(data.isDarkMode);
      }
    } catch (error) {
      console.log("Error loading saved data:", error);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Save data when important states change
  useEffect(() => {
    const dataToSave = {
      videoUrl,
      videoId,
      loopStart,
      loopEnd,
      isLooping,
      playbackRate,
      volume,
      isMuted,
      isDarkMode,
    };
    saveToLocalStorage(dataToSave);
  }, [
    videoUrl,
    videoId,
    loopStart,
    loopEnd,
    isLooping,
    playbackRate,
    volume,
    isMuted,
    isDarkMode,
  ]);

  // Handle clicking outside search bar to remove focus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        searchInputRef.current.blur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle custom timeline dragging
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging && dragType) {
        handleDrag(event as any);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        handleDragEnd();
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isDragging && dragType) {
        event.preventDefault();
        const touch = event.touches[0];
        handleDrag({ clientX: touch.clientX } as any);
      }
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        handleDragEnd();
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, dragType, loopEnd, duration, loopStart]);

  // Extract YouTube video ID from URL
  const extractVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleUrlSubmit = () => {
    if (!videoUrl.trim()) {
      setModalMessage("Please enter a YouTube URL");
      setShowModal(true);
      return;
    }

    const id = extractVideoId(videoUrl);
    if (id) {
      setVideoId(id);
      setLoopStart(0);
      setLoopEnd(0); // Will be set to duration when video loads
      setIsLooping(true); // Enable looping by default
    } else {
      setModalMessage("Please enter a valid YouTube URL");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  const handleCustomTimelineClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!customTimelineRef.current || !duration) return;

    const rect = customTimelineRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;

    // Normal seek behavior
    if (playerRef.current) {
      playerRef.current.seekTo(newTime);
    }
  };

  const handleDragStart = (
    event: React.MouseEvent | React.TouchEvent,
    type: "start" | "end"
  ) => {
    event.stopPropagation();
    setIsDragging(true);
    setDragType(type);
  };

  const handleDrag = (event: React.MouseEvent | { clientX: number }) => {
    if (!isDragging || !dragType || !customTimelineRef.current || !duration)
      return;

    const rect = customTimelineRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;

    if (dragType === "start") {
      setLoopStart(newTime);
      if (loopEnd <= newTime) {
        setLoopEnd(Math.min(duration, newTime + 30));
      }
    } else {
      setLoopEnd(newTime);
    }
    setIsLooping(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragType(null);
  };

  const onReady = (event: any) => {
    playerRef.current = event.target;
    const videoDuration = event.target.getDuration();
    setDuration(videoDuration);
    // Set default loop to span the entire video
    setLoopEnd(videoDuration);
  };

  const onStateChange = (event: any) => {
    const state = event.target.getPlayerState();
    setIsPlaying(state === 1);

    // Handle video end state for looping
    if (state === 0 && isLooping && loopEnd > loopStart) {
      // Video ended, seek back to loop start
      setTimeout(() => {
        if (playerRef.current) {
          playerRef.current.seekTo(loopStart);
          playerRef.current.playVideo();
        }
      }, 100);
    }
  };

  const onProgress = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      setCurrentTime(currentTime);

      // Handle looping
      if (isLooping && loopEnd > loopStart) {
        // Check if we've reached the loop end or the video end
        if (currentTime >= loopEnd || currentTime >= duration) {
          playerRef.current.seekTo(loopStart);
        }
      }
    }
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(onProgress, 100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isLooping, loopStart, loopEnd]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!playerRef.current) return;

      if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case "p":
            e.preventDefault();
            if (isPlaying) {
              playerRef.current.pauseVideo();
            } else {
              playerRef.current.playVideo();
            }
            break;
          case "b":
            e.preventDefault();
            playerRef.current.seekTo(Math.max(0, currentTime - 10));
            break;
          case "f":
            e.preventDefault();
            playerRef.current.seekTo(Math.min(duration, currentTime + 10));
            break;
          case "l":
            e.preventDefault();
            if (!isLooping) {
              setLoopStart(currentTime);
              setLoopEnd(Math.min(duration, currentTime + 30));
              setIsLooping(true);
            } else {
              setIsLooping(false);
            }
            break;
          case "u":
            e.preventDefault();
            setPlaybackRate((prev) => Math.min(2, prev + 0.25));
            break;
          case "j":
            e.preventDefault();
            setPlaybackRate((prev) => Math.max(0.25, prev - 0.25));
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, currentTime, duration, isLooping]);

  // Apply playback rate
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(playbackRate);
    }
  }, [playbackRate]);

  // Apply volume
  useEffect(() => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
      }
    }
  }, [volume, isMuted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const setLoopPoint = (type: "start" | "end") => {
    if (type === "start") {
      setLoopStart(currentTime);
      if (loopEnd <= currentTime) {
        setLoopEnd(Math.min(duration, currentTime + 30));
      }
    } else {
      setLoopEnd(currentTime);
    }
    setIsLooping(true);
  };

  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;

    if (!isFullscreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      } else if ((videoContainerRef.current as any).webkitRequestFullscreen) {
        (videoContainerRef.current as any).webkitRequestFullscreen();
      } else if ((videoContainerRef.current as any).msRequestFullscreen) {
        (videoContainerRef.current as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#0f0f0f] text-white" : "bg-white text-[#0f0f0f]"
      }`}
    >
      <Header
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        handleUrlSubmit={handleUrlSubmit}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        searchInputRef={searchInputRef}
      />

      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Video Player Section */}
          {videoId && (
            <VideoPlayer
              videoId={videoId}
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              volume={volume}
              isMuted={isMuted}
              playbackRate={playbackRate}
              isFullscreen={isFullscreen}
              isDarkMode={isDarkMode}
              playerRef={playerRef}
              videoContainerRef={videoContainerRef}
              progressBarRef={progressBarRef}
              onReady={onReady}
              onStateChange={onStateChange}
              handleCustomTimelineClick={handleCustomTimelineClick}
              toggleFullscreen={toggleFullscreen}
              setVolume={setVolume}
              setIsMuted={setIsMuted}
              setPlaybackRate={setPlaybackRate}
              formatTime={formatTime}
            />
          )}

          {/* Custom Timeline for Loop Control */}
          <LoopTimeline
            videoId={videoId}
            duration={duration}
            currentTime={currentTime}
            loopStart={loopStart}
            loopEnd={loopEnd}
            isLooping={isLooping}
            isDragging={isDragging}
            dragType={dragType}
            isDarkMode={isDarkMode}
            customTimelineRef={customTimelineRef}
            handleCustomTimelineClick={handleCustomTimelineClick}
            handleDragStart={handleDragStart}
            formatTime={formatTime}
          />

          {/* Loop Controls Section - Simplified */}
          <LoopControls
            videoId={videoId}
            isLooping={isLooping}
            loopStart={loopStart}
            loopEnd={loopEnd}
            isDarkMode={isDarkMode}
            setIsLooping={setIsLooping}
            formatTime={formatTime}
          />

          {/* Features Section */}
          <Features isDarkMode={isDarkMode} />

          {/* Information Section */}
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
                YoutLoop is a free online tool to repeat any YouTube videos.
                Just select YouTube videos by typing a URL in the search bar,
                and you can set AB loop in any point of the video. This is
                useful when you want to learn some kind of skills (such as
                languages, sports, music, etc.) by watching a specific part over
                and over.
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
                  <span>
                    Repeat full or a part of YouTube video in infinite loop
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>
                    Control video with simple buttons or keyboard shortcuts
                  </span>
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
                Master your video control with these powerful keyboard
                shortcuts:
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
                  💡 <strong>Pro Tip:</strong> Use keyboard shortcuts for
                  hands-free learning while taking notes!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 sm:mt-12">
          <p
            className={`text-sm sm:text-base ${isDarkMode ? "text-gray-400" : "text-[#606060]"}`}
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
      </div>

      <Modal
        showModal={showModal}
        modalMessage={modalMessage}
        isDarkMode={isDarkMode}
        closeModal={closeModal}
      />
    </div>
  );
}
