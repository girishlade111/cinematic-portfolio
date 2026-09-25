"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Howl } from "howler"

interface Track {
  title: string
  file: string
}

const tracks: Track[] = [
  { title: "Opening Theme", file: "/audio/track-01.mp3" },
  { title: "The Journey Begins", file: "/audio/track-02.mp3" },
  { title: "Through the Lens", file: "/audio/track-03.mp3" },
  { title: "Building in Silence", file: "/audio/track-04.mp3" },
  { title: "Code & Cinema", file: "/audio/track-05.mp3" },
  { title: "Late Night Ship", file: "/audio/track-06.mp3" },
  { title: "The Debugging Montage", file: "/audio/track-07.mp3" },
  { title: "Product Launch", file: "/audio/track-08.mp3" },
  { title: "Wide Angle", file: "/audio/track-09.mp3" },
  { title: "End Credits", file: "/audio/track-10.mp3" },
]

export function useAudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.3)
  const [duration, setDuration] = useState(0)
  const [seek, setSeek] = useState(0)
  const howlRef = useRef<Howl | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const stopCurrent = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.stop()
      howlRef.current.unload()
      howlRef.current = null
    }
  }, [])

  const loadTrack = useCallback(
    (index: number) => {
      stopCurrent()
      if (!tracks[index]) return

      const howl = new Howl({
        src: [tracks[index].file],
        volume: volume,
        html5: true,
        onload: () => {
          setDuration(howl.duration() || 0)
        },
        onplay: () => {
          setIsPlaying(true)
          const raf = () => {
            if (howlRef.current && howlRef.current.playing()) {
              setSeek(howlRef.current.seek() as number)
              requestAnimationFrame(raf)
            }
          }
          raf()
        },
        onpause: () => setIsPlaying(false),
        onstop: () => {
          setIsPlaying(false)
          setSeek(0)
        },
        onend: () => {
          setIsPlaying(false)
          setSeek(0)
        },
      })

      howlRef.current = howl
      howl.play()
    },
    [volume, stopCurrent]
  )

  const play = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.play()
    } else {
      loadTrack(currentTrack)
    }
  }, [currentTrack, loadTrack])

  const pause = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.pause()
    }
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  const next = useCallback(() => {
    const nextIdx = (currentTrack + 1) % tracks.length
    setCurrentTrack(nextIdx)
    loadTrack(nextIdx)
  }, [currentTrack, loadTrack])

  const prev = useCallback(() => {
    const prevIdx = (currentTrack - 1 + tracks.length) % tracks.length
    setCurrentTrack(prevIdx)
    loadTrack(prevIdx)
  }, [currentTrack, loadTrack])

  const setVolume = useCallback(
    (v: number) => {
      setVolumeState(v)
      if (howlRef.current) {
        howlRef.current.volume(v)
      }
    },
    []
  )

  const seekTo = useCallback((s: number) => {
    if (howlRef.current) {
      howlRef.current.seek(s)
      setSeek(s)
    }
  }, [])

  const handleUnmute = useCallback(() => {
    loadTrack(currentTrack)
  }, [currentTrack, loadTrack])

  useEffect(() => {
    const onUnmute = () => handleUnmute()
    window.addEventListener("cinematic-unmute", onUnmute)
    return () => window.removeEventListener("cinematic-unmute", onUnmute)
  }, [handleUnmute])

  return {
    currentTrack,
    isPlaying,
    volume,
    duration,
    seek,
    tracks,
    togglePlay,
    next,
    prev,
    setVolume,
    seekTo,
  }
}
