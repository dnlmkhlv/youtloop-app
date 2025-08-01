"use client";

import YouTube from "react-youtube";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Gauge,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isFullscreen: boolean;
  isDarkMode: boolean;
  playerRef: React.RefObject<any>;
  videoContainerRef: React.RefObject<HTMLDivElement | null>;
  progressBarRef: React.RefObject<HTMLDivElement | null>;
  onReady: (event: any) => void;
  onStateChange: (event: any) => void;
  handleCustomTimelineClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  toggleFullscreen: () => void;
  setVolume: (volume: number) => void;
  setIsMuted: (muted: boolean) => void;
  setPlaybackRate: (rate: number) => void;
  formatTime: (seconds: number) => string;
}

export default function VideoPlayer({
  videoId,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  playbackRate,
  isFullscreen,
  isDarkMode,
  playerRef,
  videoContainerRef,
  progressBarRef,
  onReady,
  onStateChange,
  handleCustomTimelineClick,
  toggleFullscreen,
  setVolume,
  setIsMuted,
  setPlaybackRate,
  formatTime,
}: VideoPlayerProps) {
  return (
    <div className="mb-8">
      <div
        ref={videoContainerRef}
        className="relative bg-black rounded-lg overflow-hidden shadow-lg"
      >
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <YouTube
            videoId={videoId}
            onReady={onReady}
            onStateChange={onStateChange}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 0,
                controls: 0,
                modestbranding: 1,
                rel: 0,
              },
            }}
            className="absolute top-0 left-0 w-full h-full"
          />

          {/* YouTube-style Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2 sm:p-4">
            {/* Progress Bar */}
            <div className="mb-2 sm:mb-4">
              <div className="flex justify-between text-xs sm:text-sm mb-1">
                <span className="text-gray-300">{formatTime(currentTime)}</span>
                <span className="text-gray-300">{formatTime(duration)}</span>
              </div>
              <div
                ref={progressBarRef}
                className="relative h-1 bg-gray-600/50 rounded-full cursor-pointer transition-all"
                onClick={handleCustomTimelineClick}
              >
                <div
                  className="absolute h-full bg-red-600 rounded-full transition-all"
                  style={{
                    width: `${(currentTime / duration) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => {
                    if (isPlaying) {
                      playerRef.current?.pauseVideo();
                    } else {
                      playerRef.current?.playVideo();
                    }
                  }}
                  className="p-1 sm:p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
                >
                  {isPlaying ? (
                    <Pause size={16} className="sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Play size={16} className="sm:w-5 sm:h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={() =>
                    playerRef.current?.seekTo(Math.max(0, currentTime - 10))
                  }
                  className="p-1 sm:p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <SkipBack size={16} className="sm:w-5 sm:h-5 text-white" />
                </button>
                <button
                  onClick={() =>
                    playerRef.current?.seekTo(
                      Math.min(duration, currentTime + 10)
                    )
                  }
                  className="p-1 sm:p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <SkipForward size={16} className="sm:w-5 sm:h-5 text-white" />
                </button>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                {/* Volume Control */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 sm:p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    {isMuted ? (
                      <VolumeX size={16} className="sm:w-5 sm:h-5 text-white" />
                    ) : (
                      <Volume2 size={16} className="sm:w-5 sm:h-5 text-white" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-12 sm:w-20"
                  />
                </div>

                {/* Playback Rate */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <Gauge size={14} className="sm:w-4 sm:h-4 text-white" />
                  <select
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(Number(e.target.value))}
                    className={`border rounded px-1 sm:px-2 py-1 text-xs sm:text-sm transition-colors duration-300 ${
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

                {/* Fullscreen Button */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="p-1 sm:p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110"
                  >
                    {isFullscreen ? (
                      <Minimize2
                        size={16}
                        className="sm:w-5 sm:h-5 text-white"
                      />
                    ) : (
                      <Maximize2
                        size={16}
                        className="sm:w-5 sm:h-5 text-white"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
