import { NavLink } from 'react-router-dom'

export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-orbit" />
          <span className="brand-text">
            Student<span className="brand-accent">Flow</span>
          </span>
        </div>
        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/students"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            Students
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

