"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const skillCategories = [
  {
    role: "FRONTEND CINEMATOGRAPHER",
    skills: [
      { name: "React / Next.js", icon: "⚛" },
      { name: "TypeScript", icon: "📘" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "Framer Motion", icon: "✨" },
      { name: "GSAP / ScrollTrigger", icon: "📜" },
      { name: "Three.js / R3F", icon: "🔄" },
    ],
  },
  {
    role: "BACKEND ENGINEER",
    skills: [
      { name: "Node.js", icon: "🟢" },
      { name: "Python / FastAPI", icon: "🐍" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "REST / GraphQL", icon: "🔗" },
      { name: "WebSockets", icon: "🔌" },
      { name: "Redis / MQ", icon: "⚡" },
    ],
  },
  {
    role: "AI / INFRASTRUCTURE",
    skills: [
      { name: "LLM / Agent Dev", icon: "🧠" },
      { name: "RAG Pipelines", icon: "📎" },
      { name: "AWS / Cloud", icon: "☁️" },
      { name: "Docker / K8s", icon: "🐳" },
      { name: "CI/CD", icon: "🔄" },
      { name: "Vercel / Edge", icon: "▲" },
    ],
  },
  {
    role: "DESIGN / PRODUCT",
    skills: [
      { name: "UI / UX Design", icon: "✏️" },
      { name: "Design Systems", icon: "📐" },
      { name: "Figma", icon: "🖌" },
      { name: "Motion Design", icon: "🎬" },
      { name: "Product Strategy", icon: "🎯" },
      { name: "Storytelling", icon: "📖" },
    ],
  },
]

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      data-section="skills"
      className="section-spotlight relative w-full bg-background px-6 py-32 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-4"
        >
          EQUIPMENT LIST
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 font-serif text-5xl text-foreground sm:text-6xl md:text-7xl"
        >
          The Toolkit
        </motion.h2>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.role}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + catIdx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="film-caption mb-6 pb-4 border-b border-border">
                {cat.role}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {cat.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex cursor-default flex-col items-center gap-2 rounded-sm border border-border bg-card p-4 text-center transition-colors hover:border-accent/20 hover:bg-card-hover"
                  >
                    <span className="text-lg" role="img" aria-hidden="true">
                      {skill.icon}
                    </span>
                    <span className="text-xs font-medium text-foreground-muted leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
