import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  ["/", "Home"],
  ["/tasks", "Tasks"],
  ["/dashboard", "Dashboard"],
  ["/about", "About"],
];

export default function NavBar() {
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <NavLink to="/" className="brand"><span className="brand-icon">✓</span> StudyFlow</NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>{label}</NavLink>
          ))}
        </nav>
        <NavLink to="/login" className="button secondary nav-login">Log in</NavLink>
      </div>
    </header>
  );
}
