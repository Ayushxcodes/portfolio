import React from 'react'
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiBun,
  SiPostgresql,
  SiLinkedin,
  SiGithub,
  SiYoutube,
  SiInstagram,
  SiPinterest,
} from 'react-icons/si'
import { MdMail } from 'react-icons/md'
import { FaPlay } from 'react-icons/fa'

// Tech badges with react-icons
const techBadges = [
  { label: 'Typescript', icon: <SiTypescript className="mr-1.5" size={20} /> },
  { label: 'React', icon: <SiReact className="mr-1.5" size={20} /> },
  { label: 'Next.js', icon: <SiNextdotjs className="mr-1.5" size={20} /> },
  { label: 'Bun', icon: <SiBun className="mr-1.5" size={20} /> },
  { label: 'PostgreSQL', icon: <SiPostgresql className="mr-1.5" size={20} /> },
]

// Social links with react-icons
const socialLinks = [
  { icon: <SiLinkedin size={22} />, url: 'https://linkedin.com' },
  { icon: <SiGithub size={22} />, url: 'https://github.com' },
  { icon: <SiYoutube size={22} />, url: 'https://youtube.com' },
  { icon: <SiInstagram size={22} />, url: 'https://instagram.com' },
  { icon: <SiPinterest size={22} />, url: 'https://pinterest.com' },
  { icon: <MdMail size={22} />, url: 'mailto:someone@example.com' },
]

const avatarUrl = './pixel_me.jpeg' // Replace with your avatar image path

const HeroSection = () => {
  return (
    <section className="mt-12 text-left pl-8 max-w-3xl mx-auto">
      {/* Avatar */}
      <div className="flex justify-start mb-4 relative">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-[110px] h-[110px] rounded-[20%] shadow-lg object-cover"
        />
      </div>

      {/* Greeting */}
      <h1 className="font-bold text-4xl md:text-5xl mb-2">
        Hi, I'm Ayush —{' '}
        <span className="font-semibold text-gray-500">A Full Stack web developer.</span>
      </h1>

      {/* Tech badges */}
      <div className="flex flex-wrap justify-start gap-3 mb-4">
        {techBadges.map(badge => (
          <span
            key={badge.label}
            className="inline-flex items-center bg-gray-100 rounded-xl px-3 py-1 text-base font-medium shadow-sm m-0.5"
          >
            {badge.icon}
            {badge.label}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-gray-700 text-lg md:text-xl mb-6 max-w-2xl">
        I build interactive web apps using <b>Typescript</b>, <b>React</b>, <b>Next.js</b>, <b>Bun</b> and{' '}
        <span className="inline-flex items-center bg-gray-200 rounded-lg px-2 py-0.5 font-medium text-base ml-1">
          <SiPostgresql size={18} className="mr-1" />
          PostgreSQL
        </span>
        . With a focus on <b>UI</b> design. Enthusiastic about <b>Three.js</b>, driven by a keen eye for design.
      </p>

      {/* Buttons */}
      <div className="flex justify-start gap-4 mb-6">
        <button className="border border-gray-300 rounded-lg px-6 py-2 bg-white font-medium text-base hover:bg-gray-50 transition">
          <span role="img" aria-label="Resume" className="mr-2">📄</span>
          Resume / CV
        </button>
        <button className="rounded-lg px-6 py-2 bg-black text-white font-medium text-base hover:bg-gray-900 transition">
          Get in touch
        </button>
      </div>

      {/* Social icons */}
      <div className="flex justify-start gap-5 mb-8">
        {socialLinks.map((s, i) => (
          <a
            key={i}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 hover:opacity-100 transition"
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Spotify Card */}
      <div className="bg-gray-50 rounded-2xl shadow-md flex items-center max-w-xl p-4 gap-4">
        <img
          src="/kabhi-kabhi-aditi.jpg"
          alt="Kabhi Kabhi Aditi"
          className="w-14 h-14 rounded-lg object-cover"
        />
        <div className="flex-1 text-left">
          <div className="text-xs text-green-500 font-medium mb-0.5">Last played</div>
          <div className="font-semibold text-base">Kabhi Kabhi Aditi</div>
          <div className="text-xs text-gray-500">by Rashid Ali</div>
        </div>
        <button className="bg-white rounded-full w-9 h-9 flex items-center justify-center shadow hover:bg-gray-100 transition">
          <FaPlay size={18} />
        </button>
      </div>
    </section>
  )
}

export default HeroSection