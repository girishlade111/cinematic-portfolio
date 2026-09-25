"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Film, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const projects = [
  {
    title: "Auri",
    logline: "AI voice assistant that lives in your home. Alexa meets Claude.",
    tags: ["AWS", "Alexa", "LLM", "Voice AI"],
    image: "/project-auri.jpg",
    color: "#c9923a",
    caseStudy: {
      problem:
        "Smart home voice assistants lacked genuine conversational intelligence. Users wanted a companion, not a command line.",
      process:
        "Built a multi-layered architecture integrating Alexa's voice pipeline with Claude's reasoning. Designed personality frameworks, context persistence, and proactive interaction patterns.",
      result:
        "Launched as a free tier with premium subscription. Users reported 4x longer engagement sessions compared to standard voice assistants.",
    },
  },
  {
    title: "Leiloeiro IA",
    logline: "AI-powered Brazilian auction analysis platform.",
    tags: ["AI/ML", "FastAPI", "React", "NLP"],
    image: "/project-leiloeiro.jpg",
    color: "#8b5e3c",
    caseStudy: {
      problem:
        "Brazilian real estate auctions were opaque \u2014 hidden fees, legal risks, and market mispricing left buyers vulnerable.",
      process:
        "Developed a multi-module AI system that cross-references auction notices, court records, market comps, and legal regulations in real-time.",
      result:
        "Processed 10,000+ auction listings with 94% accuracy on risk prediction. Reduced due-diligence time from days to minutes.",
    },
  },
  {
    title: "Cinematic Portfolio",
    logline: "This site \u2014 a documentary-style engineering showcase.",
    tags: ["Next.js", "Three.js", "GSAP", "Framer Motion"],
    image: "/project-portfolio.jpg",
    color: "#a0764a",
    caseStudy: {
      problem:
        "Developer portfolios felt templated and lifeless. Engineering craft deserved cinematic presentation.",
      process:
        "Designed every interaction with film-making principles \u2014 letterbox transitions, scroll-driven timelines, diegetic UI cues, and a persistent cinematic score.",
      result:
        "A portfolio that feels like watching a documentary. 98+ Lighthouse score with all the motion richness intact.",
    },
  },
  {
    title: "NerdZ\u00E3o Elite",
    logline: "Full-stack SaaS boilerplate with AI agent integration.",
    tags: ["Next.js", "PostgreSQL", "AI Agents", "Stripe"],
    image: "/project-nerdzao.jpg",
    color: "#6b8f5e",
    caseStudy: {
      problem:
        "SaaS founders spent weeks on boilerplate before building their actual product.",
      process:
        "Architected a production-grade starter with auth, billing, multi-tenant DB, AI agent tooling, and deployment pipeline.",
      result:
        "Shipped to early users in 3 days. Cut MVP build time by 80% for subsequent projects.",
    },
  },
]

const zoomOrigins = ["center", "top right", "bottom left", "top center"]

export default function Projects() {
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      data-section="projects"
      className="relative w-full bg-background px-6 py-32 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-4"
        >
          REEL 01 \u2014 PROJECTS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 font-serif text-5xl text-foreground sm:text-6xl md:text-7xl"
        >
          Selected Works
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, i) => (
            <motion.button
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => setSelected(project)}
              className="group relative flex flex-col items-start overflow-hidden border border-border bg-card text-left transition-all duration-700 hover:border-accent/30 hover:bg-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-zinc-900">
                <Film className="absolute h-10 w-10 text-foreground-muted/20" />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="relative object-cover transition-all duration-[6000ms] ease-out group-hover:scale-105"
                  style={{ transformOrigin: zoomOrigins[i % zoomOrigins.length] }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLElement
                    target.style.display = "none"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="mb-1 font-serif text-xl text-foreground">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-foreground-muted">
                    {project.logline}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-foreground-muted ring-1 ring-inset ring-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <p className="eyebrow mb-2">CASE STUDY</p>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription className="mt-2 text-base">
                  {selected.logline}
                </DialogDescription>
              </DialogHeader>

              <div className="mb-6 aspect-video w-full bg-zinc-900 flex items-center justify-center relative overflow-hidden">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = "none"
                  }}
                />
              </div>

              <div className="space-y-8">
                <div>
                  <p className="film-caption mb-2 text-xs">PROBLEM</p>
                  <p className="text-foreground-muted leading-relaxed">
                    {selected.caseStudy.problem}
                  </p>
                </div>
                <div>
                  <p className="film-caption mb-2 text-xs">PROCESS</p>
                  <p className="text-foreground-muted leading-relaxed">
                    {selected.caseStudy.process}
                  </p>
                </div>
                <div>
                  <p className="film-caption mb-2 text-xs">RESULT</p>
                  <p className="text-foreground-muted leading-relaxed">
                    {selected.caseStudy.result}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs uppercase tracking-[0.15em] text-accent ring-1 ring-inset ring-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
