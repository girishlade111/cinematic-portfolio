import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Projects from "@/components/sections/Projects"
import Skills from "@/components/sections/Skills"
import Timeline from "@/components/sections/Timeline"
import Contact from "@/components/sections/Contact"
import AudioPlayer from "@/components/sections/AudioPlayer"

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
      <AudioPlayer />
    </main>
  )
}
