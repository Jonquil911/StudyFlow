import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="eyebrow">PROGRESS AT A GLANCE</span><h1>Dashboard</h1><p>Understand your study workload from live task data.</p></div></div>
      <nav className="tab-nav" aria-label="Dashboard views">
        <NavLink to="/dashboard" end className={({ isActive }) => `tab-link${isActive ? " active" : ""}`}>Overview</NavLink>
        <NavLink to="/dashboard/subjects" className={({ isActive }) => `tab-link${isActive ? " active" : ""}`}>Subject analytics</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
