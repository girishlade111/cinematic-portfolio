"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const socials = [
  { label: "GitHub", href: "https://github.com/girishlade" },
  { label: "LinkedIn", href: "https://linkedin.com/in/girishlade" },
  { label: "X / Twitter", href: "https://x.com/girishlade" },
  { label: "Email", href: "mailto:hello@girishlade.com" },
]

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      ref={ref}
      data-section="contact"
      className="section-spotlight relative w-full bg-background px-6 py-32 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-4"
        >
          END CREDITS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 font-serif text-5xl text-foreground sm:text-6xl md:text-7xl"
        >
          Let&apos;s Make Something
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-12 max-w-lg text-foreground-muted leading-relaxed"
        >
          I&apos;m always open to new projects, collaborations, or just a good
          conversation about code, design, and cinema.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-6"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-6 py-3 text-sm uppercase tracking-[0.2em] text-foreground-muted transition-colors hover:text-accent"
            >
              {s.label}
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-24 text-xs text-foreground-muted/40"
        >
          &copy; {new Date().getFullYear()} Girish Lade &mdash; Built with
          Next.js, Three.js &amp; a lot of late nights
        </motion.p>
      </div>
    </section>
  )
}
