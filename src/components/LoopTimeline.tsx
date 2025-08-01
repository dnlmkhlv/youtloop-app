"use client";

interface LoopTimelineProps {
  videoId: string;
  duration: number;
  currentTime: number;
  loopStart: number;
  loopEnd: number;
  isLooping: boolean;
  isDragging: boolean;
  dragType: "start" | "end" | null;
  isDarkMode: boolean;
  customTimelineRef: React.RefObject<HTMLDivElement | null>;
  handleCustomTimelineClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleDragStart: (
    event: React.MouseEvent | React.TouchEvent,
    type: "start" | "end"
  ) => void;
  formatTime: (seconds: number) => string;
}

export default function LoopTimeline({
  videoId,
  duration,
  currentTime,
  loopStart,
  loopEnd,
  isLooping,
  isDragging,
  dragType,
  isDarkMode,
  customTimelineRef,
  handleCustomTimelineClick,
  handleDragStart,
  formatTime,
}: LoopTimelineProps) {
  if (!videoId) return null;

  return (
    <div
      className={`mt-4 p-4 rounded-lg border transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#1f1f1f] border-[#272727]"
          : "bg-[#f9f9f9] border-[#e5e5e5]"
      }`}
    >
      <div className="mb-2 flex justify-between text-sm">
        <span className={isDarkMode ? "text-gray-200" : "text-[#606060]"}>
          Loop Timeline
        </span>
        <span className={isDarkMode ? "text-gray-200" : "text-[#606060]"}>
          {formatTime(duration)}
        </span>
      </div>
      <div
        ref={customTimelineRef}
        className={`relative h-8 rounded-lg cursor-pointer transition-colors duration-300 ${
          isDarkMode ? "bg-[#272727]" : "bg-[#e5e5e5]"
        }`}
        onClick={handleCustomTimelineClick}
      >
        {/* Loop Segment */}
        {isLooping && (
          <div
            className="absolute h-full bg-red-500/60 rounded-lg"
            style={{
              left: `${(loopStart / duration) * 100}%`,
              width: `${((loopEnd - loopStart) / duration) * 100}%`,
            }}
          />
        )}

        {/* Current Position */}
        <div
          className="absolute w-0.5 h-full bg-white rounded-full shadow-lg"
          style={{ left: `${(currentTime / duration) * 100}%` }}
        />

        {/* Start Handle */}
        <div
          className={`absolute top-0 w-3 h-full cursor-ew-resize touch-none ${
            isDragging && dragType === "start" ? "z-20" : "z-10"
          }`}
          style={{ left: `${(loopStart / duration) * 100}%` }}
          onMouseDown={(e) => handleDragStart(e, "start")}
          onTouchStart={(e) => handleDragStart(e, "start")}
        >
          <div className="w-3 h-3 bg-white rounded-sm shadow-lg transform -translate-x-1/2 translate-y-1/2" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-white font-mono">
            {formatTime(loopStart)}
          </div>
        </div>

        {/* End Handle */}
        <div
          className={`absolute top-0 w-3 h-full cursor-ew-resize touch-none ${
            isDragging && dragType === "end" ? "z-20" : "z-10"
          }`}
          style={{ left: `${(loopEnd / duration) * 100}%` }}
          onMouseDown={(e) => handleDragStart(e, "end")}
          onTouchStart={(e) => handleDragStart(e, "end")}
        >
          <div className="w-3 h-3 bg-white rounded-sm shadow-lg transform -translate-x-1/2 translate-y-1/2" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-white font-mono">
            {formatTime(loopEnd)}
          </div>
        </div>
      </div>
    </div>
  );
}
