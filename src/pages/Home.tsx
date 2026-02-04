import { useState, type MouseEvent } from 'react'

export function HomePage() {
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 })

  function handleMouseMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2

    const x = (offsetX / rect.width) * 16
    const y = (offsetY / rect.height) * 10

    setParallaxOffset({ x, y })
  }

  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
      onMouseMove={handleMouseMove}
    >
      <div className="hero-gradient" aria-hidden="true" />
      <div className="hero-ambient-layer" aria-hidden="true">
        <div className="hero-glass hero-glass-top" />
        <div className="hero-glass hero-glass-bottom" />
        <div className="hero-icon hero-icon-book" />
        <div className="hero-icon hero-icon-id" />
        <div className="hero-icon hero-icon-dashboard" />
      </div>
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">Student Information Application · SaaS</p>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-title-line hero-title-line-main">
              Advanced student insights,
            </span>
            <span className="hero-title-line hero-title-emphasis">
              in a calm, academic dashboard.
            </span>
          </h1>
          <p className="hero-subtitle">
            A clean, web-optimized hero for a Student Information Application featuring
            smooth motion, subtle glassmorphism, and softly animated data cards.
          </p>
          <div className="hero-actions">
            <a href="/students" className="btn btn-primary">
              View student records
            </a>
            <a href="#overview" className="btn btn-ghost">
              Explore the dashboard
            </a>
          </div>
        </div>
        <div
          className="hero-panel"
          aria-hidden="true"
          style={{
            transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0)`,
          }}
        >
          <div className="hero-metrics">
            <div className="hero-metric-card">
              <p className="hero-metric-label">Total students</p>
              <p className="hero-metric-value">120</p>
              <p className="hero-metric-hint">Random local + API records</p>
            </div>
            <div className="hero-metric-card">
              <p className="hero-metric-label">Year distribution</p>
              <p className="hero-metric-bars">
                <span className="hero-bar hero-bar-1st" />
                <span className="hero-bar hero-bar-2nd" />
                <span className="hero-bar hero-bar-3rd" />
                <span className="hero-bar hero-bar-4th" />
              </p>
              <p className="hero-metric-hint">Quick glance at levels</p>
            </div>
            <div className="hero-metric-card hero-metric-card-wide">
              <p className="hero-metric-label">Dashboard tips</p>
              <p className="hero-metric-hint">
                Use filters on the Students page to focus on a year level or API
                records only.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section id="overview" className="overview">
        <div className="overview-grid">
          <div className="overview-item">
            <h2 className="overview-title">Structured, academic layout</h2>
            <p className="overview-text">
              A calm SaaS-style hero with clear hierarchy and space, designed for
              student information systems.
            </p>
          </div>
          <div className="overview-item">
            <h2 className="overview-title">Soft motion & micro-interactions</h2>
            <p className="overview-text">
              Headlines, subtitles, and calls to action animate with gentle fades,
              slides, and scale for readability.
            </p>
          </div>
          <div className="overview-item">
            <h2 className="overview-title">Parallax & data cards</h2>
            <p className="overview-text">
              Gradient panels, blurred icons, and floating cards react subtly to
              cursor movement to create depth.
            </p>
          </div>
        </div>
      </section>
    </section>
  )
}

