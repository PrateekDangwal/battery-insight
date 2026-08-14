import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const links = [
    { path: '/', label: 'Dashboard' },
    { path: '/analyze', label: 'Analyze Battery' },
    { path: '/batteries', label: 'Batteries' },
    { path: '/history', label: 'History' },
    { path: '/about', label: 'About' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-bg-card border border-border-color rounded"
      >
        <span className="block w-5 h-0.5 bg-text-primary mb-1"></span>
        <span className="block w-5 h-0.5 bg-text-primary mb-1"></span>
        <span className="block w-5 h-0.5 bg-text-primary"></span>
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 w-64 h-screen bg-bg-secondary border-r border-border-color
          p-6 overflow-y-auto z-40
          transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Brand */}
        <div className="mb-8">
          <h1 className="text-lg font-semibold text-text-primary">Battery Insight</h1>
          <p className="text-xs text-text-muted mt-1">Battery Telemetry Analytics</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`
                px-4 py-2.5 rounded text-sm font-medium transition-colors
                ${
                  isActive(link.path)
                    ? 'bg-bg-elevated text-text-primary border border-border-color'
                    : 'text-text-secondary hover:bg-bg-elevated'
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  )
}
