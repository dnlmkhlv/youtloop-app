"use client";

import { useState, useRef, useEffect } from "react";

interface YouTubePlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
}

interface UseYouTubePlayerReturn extends YouTubePlayerState {
  playerRef: React.RefObject<any>;
  onReady: (event: any) => void;
  onStateChange: (event: any) => void;
  onProgress: () => void;
  setVolume: (volume: number) => void;
  setIsMuted: (muted: boolean) => void;
  setPlaybackRate: (rate: number) => void;
  formatTime: (seconds: number) => string;
}

export function useYouTubePlayer(): UseYouTubePlayerReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const playerRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const onReady = (event: any) => {
    playerRef.current = event.target;
    const videoDuration = event.target.getDuration();
    setDuration(videoDuration);
  };

  const onStateChange = (event: any) => {
    const state = event.target.getPlayerState();
    setIsPlaying(state === 1);
  };

  const onProgress = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      setCurrentTime(currentTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Progress tracking
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
  }, [isPlaying]);

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

  return {
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
  };
}
