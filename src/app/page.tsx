"use client";

import { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import Image from "next/image";
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Settings,
  Info,
  Keyboard,
  Sun,
  Moon,
  Search,
  Menu,
} from "lucide-react";

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

  const playerRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Theme toggle function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

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
      setLoopEnd(0);
      setIsLooping(false);
    } else {
      setModalMessage("Please enter a valid YouTube URL");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
  };

  const onReady = (event: any) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
  };

  const onStateChange = (event: any) => {
    const state = event.target.getPlayerState();
    setIsPlaying(state === 1);
  };

  const onProgress = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      setCurrentTime(currentTime);

      // Handle looping
      if (isLooping && loopStart > 0 && loopEnd > 0) {
        if (currentTime >= loopEnd) {
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

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-[#0f0f0f] text-white" : "bg-white text-[#0f0f0f]"
      }`}
    >
      {/* YouTube-style Header */}
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          isDarkMode
            ? "bg-[#0f0f0f] border-[#272727]"
            : "bg-white border-[#e5e5e5]"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left side - Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/youtloop-logo.svg"
              alt="YoutLoop Logo"
              width={40}
              height={40}
              priority
            />
            <h1
              className={`text-xl font-bold ${
                isDarkMode ? "text-white" : "text-[#0f0f0f]"
              }`}
            >
              YoutLoop
            </h1>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Paste YouTube URL here..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className={`flex-1 px-4 py-2 border-l border-t border-b rounded-l-full transition-colors duration-300 focus:outline-none ${
                  isDarkMode
                    ? "bg-[#121212] border-[#303030] text-white placeholder-[#aaa]"
                    : "bg-white border-[#ccc] text-[#0f0f0f] placeholder-[#606060]"
                }`}
                onKeyPress={(e) => e.key === "Enter" && handleUrlSubmit()}
              />
              <button
                onClick={handleUrlSubmit}
                className={`px-6 py-2 border-r border-t border-b rounded-r-full transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-[#222] border-[#303030] hover:bg-[#303030]"
                    : "bg-[#f8f8f8] border-[#ccc] hover:bg-[#e5e5e5]"
                }`}
              >
                <Search size={20} />
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
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Video Player Section */}
          {videoId && (
            <div className="mb-8">
              <div className="relative bg-black rounded-lg overflow-hidden shadow-lg">
                <YouTube
                  videoId={videoId}
                  onReady={onReady}
                  onStateChange={onStateChange}
                  opts={{
                    width: "100%",
                    height: "500",
                    playerVars: {
                      autoplay: 0,
                      controls: 0,
                      modestbranding: 1,
                      rel: 0,
                    },
                  }}
                />

                {/* YouTube-style Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">
                        {formatTime(currentTime)}
                      </span>
                      <span className="text-gray-300">
                        {formatTime(duration)}
                      </span>
                    </div>
                    <div className="relative h-1 bg-gray-600/50 rounded-full">
                      <div
                        className="absolute h-full bg-red-600 rounded-full transition-all"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      />
                      {isLooping && (
                        <>
                          <div
                            className="absolute h-full bg-red-400/30 rounded-full"
                            style={{
                              left: `${(loopStart / duration) * 100}%`,
                              width: `${((loopEnd - loopStart) / duration) * 100}%`,
                            }}
                          />
                          <div
                            className="absolute w-1 h-full bg-red-400 rounded-full shadow-lg"
                            style={{ left: `${(loopStart / duration) * 100}%` }}
                          />
                          <div
                            className="absolute w-1 h-full bg-red-400 rounded-full shadow-lg"
                            style={{ left: `${(loopEnd / duration) * 100}%` }}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => playerRef.current?.playVideo()}
                        className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <Play size={20} className="text-white" />
                      </button>
                      <button
                        onClick={() => playerRef.current?.pauseVideo()}
                        className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <Pause size={20} className="text-white" />
                      </button>
                      <button
                        onClick={() =>
                          playerRef.current?.seekTo(
                            Math.max(0, currentTime - 10)
                          )
                        }
                        className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <SkipBack size={20} className="text-white" />
                      </button>
                      <button
                        onClick={() =>
                          playerRef.current?.seekTo(
                            Math.min(duration, currentTime + 10)
                          )
                        }
                        className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
                      >
                        <SkipForward size={20} className="text-white" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Volume Control */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
                        >
                          {isMuted ? (
                            <VolumeX size={20} className="text-white" />
                          ) : (
                            <Volume2 size={20} className="text-white" />
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                          className="w-20"
                        />
                      </div>

                      {/* Playback Rate */}
                      <select
                        value={playbackRate}
                        onChange={(e) =>
                          setPlaybackRate(Number(e.target.value))
                        }
                        className={`border rounded px-2 py-1 text-sm transition-colors duration-300 ${
                          isDarkMode
                            ? "bg-[#272727] border-[#404040] text-white focus:border-[#1c62b9]"
                            : "bg-white border-[#ccc] text-[#0f0f0f] focus:border-[#1c62b9]"
                        }`}
                      >
                        <option value={0.25}>0.25x</option>
                        <option value={0.5}>0.5x</option>
                        <option value={0.75}>0.75x</option>
                        <option value={1}>1x</option>
                        <option value={1.25}>1.25x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={1.75}>1.75x</option>
                        <option value={2}>2x</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loop Controls Section */}
          {videoId && (
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Loop Points */}
                  <div>
                    <h4
                      className={`font-medium mb-3 ${
                        isDarkMode ? "text-gray-200" : "text-[#606060]"
                      }`}
                    >
                      Loop Points
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setLoopPoint("start")}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-all duration-300 text-white"
                        >
                          Set Start ({formatTime(loopStart)})
                        </button>
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-[#606060]"
                          }`}
                        >
                          Current: {formatTime(currentTime)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setLoopPoint("end")}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-all duration-300 text-white"
                        >
                          Set End ({formatTime(loopEnd)})
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsLooping(!isLooping)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
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
                          <span className="text-sm text-red-400">
                            Looping: {formatTime(loopStart)} -{" "}
                            {formatTime(loopEnd)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Keyboard Shortcuts */}
                  <div>
                    <h4
                      className={`font-medium mb-3 ${
                        isDarkMode ? "text-gray-200" : "text-[#606060]"
                      }`}
                    >
                      Keyboard Shortcuts
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-[#606060]"
                          }
                        >
                          Play/Pause:
                        </span>
                        <kbd
                          className={`px-2 py-1 border rounded text-xs font-mono ${
                            isDarkMode
                              ? "bg-[#272727] border-[#404040] text-gray-200"
                              : "bg-[#f2f2f2] border-[#ccc] text-[#0f0f0f]"
                          }`}
                        >
                          Ctrl + P
                        </kbd>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-[#606060]"
                          }
                        >
                          Back 10s:
                        </span>
                        <kbd
                          className={`px-2 py-1 border rounded text-xs font-mono ${
                            isDarkMode
                              ? "bg-[#272727] border-[#404040] text-gray-200"
                              : "bg-[#f2f2f2] border-[#ccc] text-[#0f0f0f]"
                          }`}
                        >
                          Ctrl + B
                        </kbd>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-[#606060]"
                          }
                        >
                          Forward 10s:
                        </span>
                        <kbd
                          className={`px-2 py-1 border rounded text-xs font-mono ${
                            isDarkMode
                              ? "bg-[#272727] border-[#404040] text-gray-200"
                              : "bg-[#f2f2f2] border-[#ccc] text-[#0f0f0f]"
                          }`}
                        >
                          Ctrl + F
                        </kbd>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-[#606060]"
                          }
                        >
                          Toggle Loop:
                        </span>
                        <kbd
                          className={`px-2 py-1 border rounded text-xs font-mono ${
                            isDarkMode
                              ? "bg-[#272727] border-[#404040] text-gray-200"
                              : "bg-[#f2f2f2] border-[#ccc] text-[#0f0f0f]"
                          }`}
                        >
                          Ctrl + L
                        </kbd>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-[#606060]"
                          }
                        >
                          Speed Up:
                        </span>
                        <kbd
                          className={`px-2 py-1 border rounded text-xs font-mono ${
                            isDarkMode
                              ? "bg-[#272727] border-[#404040] text-gray-200"
                              : "bg-[#f2f2f2] border-[#ccc] text-[#0f0f0f]"
                          }`}
                        >
                          Ctrl + U
                        </kbd>
                      </div>
                      <div className="flex justify-between">
                        <span
                          className={
                            isDarkMode ? "text-gray-300" : "text-[#606060]"
                          }
                        >
                          Speed Down:
                        </span>
                        <kbd
                          className={`px-2 py-1 border rounded text-xs font-mono ${
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
          )}

          {/* Features Section */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className={`rounded-lg p-6 text-center border transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "bg-[#1f1f1f] border-[#272727] hover:bg-[#272727]"
                    : "bg-[#f9f9f9] border-[#e5e5e5] hover:bg-[#f2f2f2]"
                }`}
              >
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <RotateCcw size={24} className="text-white" />
                </div>
                <h3
                  className={`font-semibold mb-2 ${
                    isDarkMode ? "text-white" : "text-[#0f0f0f]"
                  }`}
                >
                  AB Loop
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-[#606060]"
                  }`}
                >
                  Set precise start and end points for seamless looping
                </p>
              </div>
              <div
                className={`rounded-lg p-6 text-center border transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "bg-[#1f1f1f] border-[#272727] hover:bg-[#272727]"
                    : "bg-[#f9f9f9] border-[#e5e5e5] hover:bg-[#f2f2f2]"
                }`}
              >
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Keyboard size={24} className="text-white" />
                </div>
                <h3
                  className={`font-semibold mb-2 ${
                    isDarkMode ? "text-white" : "text-[#0f0f0f]"
                  }`}
                >
                  Keyboard Controls
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-[#606060]"
                  }`}
                >
                  Full keyboard support for hands-free video control
                </p>
              </div>
              <div
                className={`rounded-lg p-6 text-center border transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "bg-[#1f1f1f] border-[#272727] hover:bg-[#272727]"
                    : "bg-[#f9f9f9] border-[#e5e5e5] hover:bg-[#f2f2f2]"
                }`}
              >
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Settings size={24} className="text-white" />
                </div>
                <h3
                  className={`font-semibold mb-2 ${
                    isDarkMode ? "text-white" : "text-[#0f0f0f]"
                  }`}
                >
                  Speed Control
                </h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-[#606060]"
                  }`}
                >
                  Adjust playback speed from 0.25x to 2x
                </p>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* What is YoutLoop */}
            <div
              className={`rounded-lg p-6 border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-[#1f1f1f] border-[#272727]"
                  : "bg-[#f9f9f9] border-[#e5e5e5]"
              }`}
            >
              <h3 className="text-2xl font-bold mb-4 text-red-600">
                Repeat YouTube Video in AB Loop
              </h3>
              <h4
                className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? "text-white" : "text-[#0f0f0f]"
                }`}
              >
                What is YoutLoop:
              </h4>
              <p
                className={`leading-relaxed mb-4 ${
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
                className={`text-lg font-semibold mb-3 ${
                  isDarkMode ? "text-white" : "text-[#0f0f0f]"
                }`}
              >
                Features:
              </h4>
              <ul
                className={`space-y-2 ${
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
              className={`rounded-lg p-6 border transition-colors duration-300 ${
                isDarkMode
                  ? "bg-[#1f1f1f] border-[#272727]"
                  : "bg-[#f9f9f9] border-[#e5e5e5]"
              }`}
            >
              <h3 className="text-2xl font-bold mb-4 text-red-600">
                Keyboard Shortcuts
              </h3>
              <p
                className={`mb-6 ${
                  isDarkMode ? "text-gray-300" : "text-[#606060]"
                }`}
              >
                Master your video control with these powerful keyboard
                shortcuts:
              </p>

              <div className="space-y-4">
                <div
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    isDarkMode
                      ? "bg-[#272727] border-[#404040]"
                      : "bg-[#f2f2f2] border-[#e5e5e5]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <Play size={16} className="text-white" />
                    </div>
                    <span
                      className={`font-medium ${
                        isDarkMode ? "text-gray-200" : "text-[#0f0f0f]"
                      }`}
                    >
                      Pause/Play
                    </span>
                  </div>
                  <kbd
                    className={`px-3 py-1 border rounded text-sm font-mono ${
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
                      <Settings size={16} className="text-white" />
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
                      <Settings size={16} className="text-white" />
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
        <footer className="text-center mt-12">
          <p className={isDarkMode ? "text-gray-400" : "text-[#606060]"}>
            Made with ❤️ for learning and practice
          </p>
          <p
            className={`text-sm mt-2 ${
              isDarkMode ? "text-gray-400" : "text-[#606060]"
            }`}
          >
            Inspired by LoopTube
          </p>
        </footer>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`max-w-md w-full mx-4 rounded-lg shadow-xl transition-all duration-300 ${
              isDarkMode
                ? "bg-[#1f1f1f] border border-[#272727]"
                : "bg-white border border-[#e5e5e5]"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-white" : "text-[#0f0f0f]"
                  }`}
                >
                  Invalid URL
                </h3>
                <button
                  onClick={closeModal}
                  className={`p-1 rounded-full transition-colors ${
                    isDarkMode
                      ? "hover:bg-[#272727] text-gray-400 hover:text-white"
                      : "hover:bg-[#f2f2f2] text-[#606060] hover:text-[#0f0f0f]"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p
                className={`mb-6 ${
                  isDarkMode ? "text-gray-300" : "text-[#606060]"
                }`}
              >
                {modalMessage}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-300"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
