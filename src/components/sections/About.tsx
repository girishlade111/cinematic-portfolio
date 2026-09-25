"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"

const stats = [
  { label: "YEARS BUILDING", value: 8, suffix: "+" },
  { label: "SHIPS TO PROD", value: 40, suffix: "+" },
  { label: "TOOLS MASTERED", value: 15, suffix: "" },
  { label: "USERS IMPACTED", value: "200K", suffix: "+" },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = Math.ceil(target / 60)
    const interval = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(start)
      }
    }, duration / 60)
    return () => clearInterval(interval)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const paragraphLines = [
  "I build products that live at the intersection",
  "of design, technology, and narrative.",
  "",
  "Every line of code tells a story —",
  "and every product is a film waiting to be",
  "experienced by its audience.",
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-120px" })

  return (
    <section
      ref={sectionRef}
      data-section="about"
      className="section-spotlight relative min-h-screen w-full bg-background px-6 py-32 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-16"
        >
          EXT. — ORIGIN STORY
        </motion.p>

        <div className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <blockquote className="mb-10 font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              &ldquo;Products are stories. Code is the medium.&rdquo;
            </blockquote>

            <div className="space-y-2 text-lg leading-relaxed text-foreground-muted">
              {paragraphLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: line === "" ? 0.2 : 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + i * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={line === "" ? "h-4" : ""}
                  aria-hidden={line === ""}
                >
                  {line || <br />}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:pl-8">
            <div className="sticky top-32 space-y-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 1.2 + i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <p className="film-caption mb-1">{stat.label}</p>
                  <p className="font-serif text-5xl text-accent sm:text-6xl">
                    {typeof stat.value === "number" ? (
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    ) : (
                      <span>
                        {stat.value}
                        {stat.suffix}
                      </span>
                    )}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
