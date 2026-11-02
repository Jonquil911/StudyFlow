import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-stack">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">A SMARTER WAY TO STUDY</span>
          <h1>Plan your work.<br /><span>Make progress.</span></h1>
          <p>Keep coursework organized, manage deadlines, and see how much you have accomplished with StudyFlow.</p>
          <div className="actions"><Link to="/tasks" className="button">Explore tasks <span aria-hidden="true">→</span></Link><Link to="/dashboard" className="button secondary">View dashboard</Link></div>
        </div>
        <img className="hero-art" src={`${import.meta.env.BASE_URL}hero-illustration.svg`} alt="Illustration of a study checklist, books, and a progress chart" />
      </section>
      <section className="feature-grid" aria-label="Features">
        <div className="feature-card"><span className="feature-icon">✓</span><h2>Organize</h2><p>Create and update assignments with deadlines and priorities.</p><Link to="/tasks">Browse tasks →</Link></div>
        <div className="feature-card"><span className="feature-icon">⌕</span><h2>Find faster</h2><p>Use search, filters, sorting, and sharable URL parameters.</p><Link to="/tasks?status=In%20Progress">See in-progress tasks →</Link></div>
        <div className="feature-card"><span className="feature-icon">▥</span><h2>See progress</h2><p>Review live statistics and workload breakdowns by subject.</p><Link to="/dashboard/subjects">Explore analytics →</Link></div>
      </section>
    </div>
  );
}
