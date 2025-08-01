"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import LoopTimeline from "@/components/LoopTimeline";
import LoopControls from "@/components/LoopControls";
import Features from "@/components/Features";
import InformationSection from "@/components/InformationSection";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useYouTubePlayer } from "@/hooks/useYouTubePlayer";
import { extractVideoId } from "@/utils/youtube";

export default function Home() {
  // YouTube player state
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    playerRef,
    onReady,
    onStateChange,
    onProgress,
    setVolume,
    setIsMuted,
    setPlaybackRate,
    formatTime,
  } = useYouTubePlayer();

  // Local storage for persistence
  const [savedData, setSavedData, isDataLoaded] = useLocalStorage<{
    videoUrl: string;
    videoId: string;
    loopStart: number;
    loopEnd: number;
    isLooping: boolean;
    playbackRate: number;
    volume: number;
    isMuted: boolean;
    isDarkMode: boolean;
  }>({
    key: "youtloop-data",
    defaultValue: {
      videoUrl: "",
      videoId: "",
      loopStart: 0,
      loopEnd: 0,
      isLooping: false,
      playbackRate: 1,
      volume: 50,
      isMuted: false,
      isDarkMode: true,
    },
  });

  // Local state - initialize with defaults, will be updated when localStorage loads
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [loopStart, setLoopStart] = useState(0);
  const [loopEnd, setLoopEnd] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<"start" | "end" | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Refs
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const customTimelineRef = useRef<HTMLDivElement>(null);

  // Theme toggle function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Load saved data when localStorage becomes available
  useEffect(() => {
    if (isDataLoaded && savedData) {
      if (savedData.videoUrl) setVideoUrl(savedData.videoUrl);
      if (savedData.videoId) setVideoId(savedData.videoId);
      if (savedData.loopStart !== undefined) setLoopStart(savedData.loopStart);
      if (savedData.loopEnd !== undefined) setLoopEnd(savedData.loopEnd);
      if (savedData.isLooping !== undefined) setIsLooping(savedData.isLooping);
      if (savedData.isDarkMode !== undefined)
        setIsDarkMode(savedData.isDarkMode);
    }
  }, [isDataLoaded, savedData]);

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

    // Only save if data has actually changed
    if (JSON.stringify(dataToSave) !== JSON.stringify(savedData)) {
      setSavedData(dataToSave);
    }
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
    savedData,
    setSavedData,
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
            setPlaybackRate(Math.min(2, playbackRate + 0.25));
            break;
          case "j":
            e.preventDefault();
            setPlaybackRate(Math.max(0.25, playbackRate - 0.25));
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
          <InformationSection isDarkMode={isDarkMode} />
        </div>

        {/* Footer */}
        <Footer isDarkMode={isDarkMode} />
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
