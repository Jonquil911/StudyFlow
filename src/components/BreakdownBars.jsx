import React from "react";
import { Link } from "react-router-dom";

export default function BreakdownBars({ title, rows, linkPrefix = "" }) {
  const max = Math.max(1, ...rows.map((item) => item.count));
  return (
    <section className="breakdown-card card-surface">
      <h3>{title}</h3>
      {rows.length === 0 ? <p className="subtle">No task data available.</p> : rows.map(({ label, count }) => (
        <div className="bar-group" key={label}>
          <div className="bar-heading">
            {linkPrefix ? <Link to={`${linkPrefix}${encodeURIComponent(label)}`}>{label}</Link> : <span>{label}</span>}
            <strong>{count}</strong>
          </div>
          <div className="bar-track"><div className="bar-fill" style={{ width: `${Math.max(0, (count / max) * 100)}%` }} /></div>
        </div>
      ))}
    </section>
  );
}
