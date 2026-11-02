import React from "react";
import { Link } from "react-router-dom";
import LoadState from "../components/LoadState.jsx";
import useAllTasks from "../hooks/useAllTasks.js";

export default function SubjectAnalytics() {
  const { tasks, status, error, reload } = useAllTasks();
  const subjectNames = [...new Set(tasks.map((task) => task.subject || "Unassigned"))].sort();
  const rows = subjectNames.map((subject) => {
    const group = tasks.filter((task) => (task.subject || "Unassigned") === subject);
    const completed = group.filter((task) => task.status === "Completed").length;
    const hours = group.reduce((sum, task) => sum + (Number(task.estimatedHours) || 0), 0);
    return { subject, total: group.length, completed, hours, percent: group.length ? Math.round(completed / group.length * 100) : 0 };
  });

  return (
    <section className="page-stack">
      <div className="list-meta"><div><h2>Progress by subject</h2><p>Completion rates and estimated workload across your courses.</p></div><button className="button secondary small" disabled={status === "loading"} onClick={reload}>Reload</button></div>
      <LoadState status={status} error={error} onRetry={reload} empty={status === "success" && rows.length === 0} emptyText="No subjects are available yet." />
      {status === "success" && rows.length > 0 && <div className="subjects-grid">{rows.map((row) => (
        <article className="card-surface subject-card" key={row.subject}>
          <div className="subject-top"><h3>{row.subject}</h3><span>{row.percent}% complete</span></div>
          <div className="bar-track"><div className="bar-fill" style={{ width: `${row.percent}%` }} /></div>
          <div className="subject-stats"><div><strong>{row.total}</strong><span>Tasks</span></div><div><strong>{row.completed}</strong><span>Completed</span></div><div><strong>{row.hours}</strong><span>Hours</span></div></div>
          <Link className="inline-link" to={`/tasks?subject=${encodeURIComponent(row.subject)}`}>Open {row.subject} tasks →</Link>
        </article>
      ))}</div>}
    </section>
  );
}
