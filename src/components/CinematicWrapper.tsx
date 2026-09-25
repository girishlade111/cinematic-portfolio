"use client"

import { useEffect, useRef, useState } from "react"

const SECTION_NAMES = ["hero", "about", "projects", "skills", "timeline", "contact"]

export default function CinematicWrapper({ children }: { children: React.ReactNode }) {
  const [letterboxClosed, setLetterboxClosed] = useState(true)
  const [cutActive, setCutActive] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const lastSection = useRef(0)
  const cutTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const letterboxTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty("--letterbox-h", reducedMotion ? "0px" : "5vh")
    document.documentElement.style.setProperty("--grain-opacity", reducedMotion ? "0.02" : "0.04")

    if (!reducedMotion) {
      letterboxTimer.current = setTimeout(() => {
        setLetterboxClosed(false)
      }, 3400)
    } else {
      setLetterboxClosed(false)
    }

    return () => {
      clearTimeout(letterboxTimer.current)
    }
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) return

    const sectionElements: Element[] = []
    for (const name of SECTION_NAMES) {
      const el = document.querySelector(`[data-section="${name}"]`)
      if (el) sectionElements.push(el)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = SECTION_NAMES.indexOf(
              entry.target.getAttribute("data-section") || ""
            )
            if (idx >= 0 && idx !== lastSection.current && idx > 0) {
              lastSection.current = idx
              setCutActive(true)
              clearTimeout(cutTimer.current)
              cutTimer.current = setTimeout(() => setCutActive(false), 200)
            } else if (idx === 0) {
              lastSection.current = 0
            }
          }
        }
      },
      { threshold: 0.15 }
    )

    for (const el of sectionElements) observer.observe(el)
    return () => observer.disconnect()
  }, [reducedMotion])

  return (
    <>
      <div
        className={`letterbox-bar letterbox-top ${letterboxClosed ? "letterbox-closed" : ""}`}
      />
      <div
        className={`letterbox-bar letterbox-bottom ${letterboxClosed ? "letterbox-closed" : ""}`}
      />
      <div className={`section-cut ${cutActive ? "active" : ""}`} />
      {children}
    </>
  )
}
