import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const tabs = [
  ["/tasks", "All tasks"],
  ["/tasks/completed", "Completed"],
  ["/tasks/overdue", "Overdue"],
  ["/tasks/high-priority", "High priority"],
];

export default function TasksLayout() {
  return (
    <div className="page-stack">
      <div className="page-heading">
        <div><span className="eyebrow">YOUR WORKSPACE</span><h1>Study tasks</h1><p>Track assignments, deadlines and progress in one place.</p></div>
        <NavLink className="button" to="/tasks/new">+ New task</NavLink>
      </div>
      <nav className="tab-nav" aria-label="Task views">
        {tabs.map(([to, label]) => <NavLink key={to} end to={to} className={({ isActive }) => `tab-link${isActive ? " active" : ""}`}>{label}</NavLink>)}
      </nav>
      <Outlet />
    </div>
  );
}
