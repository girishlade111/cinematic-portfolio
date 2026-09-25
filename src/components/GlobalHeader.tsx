"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function GlobalHeader() {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [showPrompt, setShowPrompt] = useState(true)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY
      if (sy > 80 && sy > lastScrollY) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      setLastScrollY(sy)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [lastScrollY])

  const handleUnmute = useCallback(() => {
    setSoundEnabled(true)
    setShowPrompt(false)
    window.dispatchEvent(new CustomEvent("cinematic-unmute"))
  }, [])

  return (
    <header
      className="fixed left-0 right-0 top-0 z-40 px-6 pt-6 md:px-10 md:pt-8"
      style={{ pointerEvents: "none" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 4.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-10 w-10 items-center justify-center border border-accent/40 bg-background/60 text-sm font-medium tracking-wider text-accent backdrop-blur-sm transition-colors hover:bg-accent/10"
          style={{ pointerEvents: "auto" }}
          aria-label="Home"
        >
          N
        </motion.a>

        <AnimatePresence>
          {showPrompt && !soundEnabled && (
            <motion.button
              key="sound-toggle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
              onClick={handleUnmute}
              className="flex items-center gap-2 rounded-full border border-accent/30 bg-background/80 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-accent backdrop-blur-sm transition-all hover:bg-accent/10"
              style={{ pointerEvents: "auto" }}
              aria-label="Enable sound"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Tap to Enable Sound
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
