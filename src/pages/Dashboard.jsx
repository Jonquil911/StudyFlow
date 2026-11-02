import React, { useState } from "react";
import { Link } from "react-router-dom";
import BreakdownBars from "../components/BreakdownBars.jsx";
import LoadState from "../components/LoadState.jsx";
import useAllTasks from "../hooks/useAllTasks.js";
import { getBreakdown, getDashboardStats } from "../services/service.js";

export default function Dashboard() {
  const { tasks, status, error, reload } = useAllTasks();
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("");
  const subjects = [...new Set(tasks.map((task) => task.subject).filter(Boolean))].sort();
  const selected = tasks.filter((task) => (!subject || task.subject === subject) && (!priority || task.priority === priority));
  const stats = getDashboardStats(selected);
  const statusRows = getBreakdown(selected, "status");
  const subjectRows = getBreakdown(selected, "subject");
  const values = [
    { label: "Total tasks", number: stats.total, to: "/tasks" },
    { label: "Completed", number: stats.completed, to: "/tasks?status=Completed" },
    { label: "In progress", number: stats.inProgress, to: "/tasks?status=In%20Progress" },
    { label: "Overdue", number: stats.overdue, to: "/tasks/overdue" },
    { label: "Estimated hours", number: stats.hours, to: "/tasks" },
  ];
  return (
    <section className="page-stack">
      <div className="toolbar dashboard-filters card-surface">
        <label>Filter by subject<select value={subject} onChange={(e) => setSubject(e.target.value)}><option value="">All subjects</option>{subjects.map((name) => <option key={name}>{name}</option>)}</select></label>
        <label>Filter by priority<select value={priority} onChange={(e) => setPriority(e.target.value)}><option value="">All priorities</option><option>High</option><option>Medium</option><option>Low</option></select></label>
        <button className="button secondary small" disabled={status === "loading"} onClick={reload}>Reload data</button>
      </div>
      <LoadState status={status} error={error} onRetry={reload} empty={status === "success" && tasks.length === 0} emptyText="Create some tasks to see your study statistics." />
      {status === "success" && tasks.length > 0 && <>
        <div className="stats-grid">{values.map((value) => <Link to={value.to} className="stat-card card-surface" key={value.label}><span>{value.label}</span><strong>{value.number}</strong><small>View tasks →</small></Link>)}</div>
        {selected.length === 0 && <div className="message-card">No assignments match the selected dashboard filters.</div>}
        <div className="breakdown-grid">
          <BreakdownBars title="Tasks by status" rows={statusRows} linkPrefix="/tasks?status=" />
          <BreakdownBars title="Tasks by subject" rows={subjectRows} linkPrefix="/tasks?subject=" />
        </div>
        <div className="card-surface dashboard-note"><div><h3>Want a closer look?</h3><p>Explore completion progress for each subject and open related tasks.</p></div><Link className="button secondary" to="/dashboard/subjects">Subject analytics →</Link></div>
      </>}
    </section>
  );
}
