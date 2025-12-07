import React from 'react'
import { SiTypescript, SiReact, SiNextdotjs, SiBun, SiPostgresql, SiLinkedin, SiGithub, SiYoutube, SiInstagram, SiPinterest } from 'react-icons/si'
import { MdMail } from 'react-icons/md'
import { FaPlay } from 'react-icons/fa'

// Tech badges with react-icons
const techBadges = [
  { label: 'Typescript', icon: <SiTypescript size={20} style={{ marginRight: 6 }} /> },
  { label: 'React', icon: <SiReact size={20} style={{ marginRight: 6 }} /> },
  { label: 'Next.js', icon: <SiNextdotjs size={20} style={{ marginRight: 6 }} /> },
  { label: 'Bun', icon: <SiBun size={20} style={{ marginRight: 6 }} /> },
  { label: 'PostgreSQL', icon: <SiPostgresql size={20} style={{ marginRight: 6 }} /> },
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
    <section style={{ textAlign: 'center', marginTop: 48 }}>
      {/* Avatar */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <img
          src={avatarUrl}
          alt="Avatar"
          style={{
            width: 110,
            height: 110,
            borderRadius: '20%',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            objectFit: 'cover',
          }}
        />
        {/* Notification dot */}
        <span
          style={{
            display: 'inline-block',
            width: 16,
            height: 16,
            background: '#fff',
            borderRadius: '50%',
            border: '2px solid #f3f3f3',
            position: 'relative',
            left: -20,
            top: 70,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        />
      </div>

      {/* Greeting */}
      <h1 style={{ fontWeight: 700, fontSize: 40, marginBottom: 8 }}>
        Hi, I'm Ayush — <span style={{ fontWeight: 600, color: '#888' }}>A Full Stack web developer.</span>
      </h1>

      {/* Tech badges */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
        {techBadges.map(badge => (
          <span
            key={badge.label}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#f6f6f6',
              borderRadius: 12,
              padding: '4px 12px',
              fontSize: 15,
              fontWeight: 500,
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              margin: 2,
            }}
          >
            {badge.icon}
            {badge.label}
          </span>
        ))}
      </div>

      {/* Description */}
      <p style={{ color: '#444', fontSize: 19, margin: '0 auto 24px', maxWidth: 600 }}>
        I build interactive web apps using <b>Typescript</b>, <b>React</b>, <b>Next.js</b>, <b>Bun</b> and{' '}
        <span style={{
          background: '#e9ecef',
          borderRadius: 8,
          padding: '2px 8px',
          fontWeight: 500,
          fontSize: 16,
          display: 'inline-flex',
          alignItems: 'center',
        }}>
          <SiPostgresql size={18} style={{ marginRight: 4, verticalAlign: 'middle' }} />
          PostgreSQL
        </span>
        . With a focus on <b>UI</b> design. Enthusiastic about <b>Three.js</b>, driven by a keen eye for design.
      </p>

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
        <button style={{
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: '10px 24px',
          background: '#fff',
          fontWeight: 500,
          cursor: 'pointer',
          fontSize: 16,
        }}>
          <span role="img" aria-label="Resume" style={{ marginRight: 8 }}>📄</span>
          Resume / CV
        </button>
        <button style={{
          border: 'none',
          borderRadius: 8,
          padding: '10px 24px',
          background: '#111',
          color: '#fff',
          fontWeight: 500,
          cursor: 'pointer',
          fontSize: 16,
        }}>
          Get in touch
        </button>
      </div>

      {/* Social icons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 18, marginBottom: 32 }}>
        {socialLinks.map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{ opacity: 0.8 }}>
            {s.icon}
          </a>
        ))}
      </div>

      {/* Spotify Card */}
      <div style={{
        background: '#fafbfc',
        borderRadius: 16,
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        display: 'flex',
        alignItems: 'center',
        maxWidth: 480,
        margin: '0 auto',
        padding: 18,
        gap: 18,
      }}>
        <img
          src="/kabhi-kabhi-aditi.jpg"
          alt="Kabhi Kabhi Aditi"
          style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover' }}
        />
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ fontSize: 13, color: '#3cb371', fontWeight: 500, marginBottom: 2 }}>Last played</div>
          <div style={{ fontWeight: 600, fontSize: 16 }}>Kabhi Kabhi Aditi</div>
          <div style={{ fontSize: 13, color: '#888' }}>by Rashid Ali</div>
        </div>
        <button style={{
          border: 'none',
          background: '#fff',
          borderRadius: '50%',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          cursor: 'pointer',
        }}>
          <FaPlay size={18} />
        </button>
      </div>
    </section>
  )
}

export default HeroSection