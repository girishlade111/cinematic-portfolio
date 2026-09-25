"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"

const milestones = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Started building web apps with React. Fell in love with the craft.",
  },
  {
    year: "2021",
    title: "First SaaS Ship",
    description:
      "Launched first production SaaS product. Learned infra, auth, billing \u2014 the hard way.",
  },
  {
    year: "2022",
    title: "Full-Stack Mastery",
    description:
      "Deep dive into backend architecture, databases, and cloud infrastructure. Shipped 10+ projects.",
  },
  {
    year: "2023",
    title: "AI Frontier",
    description:
      "Built LLM-powered products. Explored agents, RAG, and the intersection of AI and user experience.",
  },
  {
    year: "2024",
    title: "Voice & Ambient AI",
    description:
      "Created Auri \u2014 a conversational voice AI. Won awards. Learned what natural interaction really means.",
  },
  {
    year: "2025",
    title: "Platform & Scale",
    description:
      "Architected multi-tenant platforms, agent tooling, and cinematic web experiences at scale.",
  },
  {
    year: "2026",
    title: "The Next Reel",
    description:
      "Building the next chapter. Pushing the boundary of what software can feel like.",
  },
]

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const linesRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const totalHeight = rect.height - window.innerHeight
    const scrolled = Math.abs(rect.top)
    const progress = Math.min(Math.max(scrolled / totalHeight, 0), 1)
    setScrollProgress(progress)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const dotPositions = [0, 16.7, 33.3, 50, 66.7, 83.3, 100]

  return (
    <section
      ref={sectionRef}
      data-section="timeline"
      className="relative w-full bg-background px-6 py-32 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-4"
        >
          CHAPTER MARKERS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 font-serif text-5xl text-foreground sm:text-6xl md:text-7xl"
        >
          Career Arc
        </motion.h2>
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div
          ref={linesRef}
          className="absolute left-[23px] top-0 h-full w-[2px] bg-accent/15 md:left-1/2 md:-translate-x-px"
        >
          <div
            className="h-full w-full bg-accent transition-none"
            style={{
              clipPath: `inset(0 ${100 - scrollProgress * 100}% 0 0)`,
            }}
          />
        </div>

        <div className="space-y-40 md:space-y-48">
          {milestones.map((milestone, i) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative flex flex-col md:flex-row ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="md:w-1/2" />

              <div className="relative flex items-start gap-8 md:w-1/2 md:px-12">
                <div className="relative z-10 mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-background">
                  <div className="h-3 w-3 rounded-full bg-accent" />
                  <div
                    className="absolute -inset-1 rounded-full bg-accent/20"
                    style={{ opacity: Math.max(0, Math.min(1, (scrollProgress - i / milestones.length) * 5)) }}
                  />
                </div>

                <div className="flex-1 pb-8">
                  <span className="font-display text-5xl tracking-wide text-accent/50 sm:text-6xl md:text-7xl">
                    {milestone.year}
                  </span>
                  <h3 className="mt-1 font-serif text-2xl text-foreground sm:text-3xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-foreground-muted">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
