"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import dynamic from "next/dynamic"

const ParticleBackground = dynamic(
  () => import("@/components/ui/particle-background"),
  { ssr: false }
)

const easeCinematic = [0.16, 1, 0.3, 1] as const

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 2.4 + i * 0.04,
      ease: easeCinematic,
    },
  }),
}

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 3.6, ease: easeCinematic },
  },
}

const scrollCueVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 4.5, duration: 0.6 },
  },
}

export default function Hero() {
  const [revealed, setRevealed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const title = "GIRISH LADE"
  const subtitle = "Founder & Engineer"

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 3400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      data-section="hero"
      className="relative h-dvh w-full overflow-hidden bg-background"
    >
      {!isMobile && <ParticleBackground />}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <motion.p
          initial="hidden"
          animate={revealed ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 3.8, ease: easeCinematic } },
          }}
          className="eyebrow mb-6"
        >
          Cinematic Portfolio
        </motion.p>

        <h1 className="flex flex-wrap justify-center gap-x-4 font-display text-7xl leading-none tracking-wide sm:text-9xl md:text-[10rem] lg:text-[12rem]">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate={revealed ? "visible" : "hidden"}
              variants={letterVariants}
              className="inline-block text-foreground"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial="hidden"
          animate={revealed ? "visible" : "hidden"}
          variants={subtitleVariants}
          className="mt-6 text-lg tracking-[0.15em] text-foreground-muted uppercase sm:text-xl"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial="hidden"
          animate={revealed ? "visible" : "hidden"}
          variants={scrollCueVariants}
          className="absolute bottom-16 flex flex-col items-center gap-2"
        >
          <span className="film-caption text-xs">SCROLL TO BEGIN</span>
          <ChevronDown className="h-5 w-5 animate-bounce text-accent" />
        </motion.div>
      </div>
    </section>
  )
}
