"use client"

import { useAudioPlayer } from "@/lib/use-audio"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
} from "lucide-react"
import { useState } from "react"

export default function AudioPlayer() {
  const {
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
  } = useAudioPlayer()

  const [showVolume, setShowVolume] = useState(false)

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-6 md:px-16">
        <div className="hidden min-w-0 flex-1 md:block">
          <p className="truncate text-xs uppercase tracking-[0.15em] text-foreground-muted">
            {tracks[currentTrack].title}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={prev}
            className="h-8 w-8 text-foreground-muted hover:text-foreground"
            aria-label="Previous track"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlay}
            className="h-9 w-9 border-accent/30 text-accent hover:bg-accent/10 hover:text-accent"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={next}
            className="h-8 w-8 text-foreground-muted hover:text-foreground"
            aria-label="Next track"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        <Slider
          value={[duration ? (seek / duration) * 100 : 0]}
          onValueChange={([v]) => seekTo((v / 100) * duration)}
          max={100}
          step={0.1}
          className="flex-1 max-w-[200px]"
          aria-label="Seek"
        />

        {duration > 0 && (
          <span className="hidden text-xs text-foreground-muted/60 tabular-nums sm:block">
            {fmt(seek)} / {fmt(duration)}
          </span>
        )}

        <div className="relative flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowVolume(!showVolume)}
            className="h-8 w-8 text-foreground-muted hover:text-foreground"
            aria-label="Volume"
          >
            {volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          {showVolume && (
            <div className="absolute bottom-full right-0 mb-3 rounded-sm border border-border bg-card p-4 shadow-xl">
              <Slider
                value={[volume * 100]}
                onValueChange={([v]) => setVolume(v / 100)}
                max={100}
                step={1}
                className="h-24 w-1.5"
                orientation="vertical"
                aria-label="Volume"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
