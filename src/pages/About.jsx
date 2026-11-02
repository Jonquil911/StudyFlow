import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="content-page card-surface">
      <span className="eyebrow">ABOUT THE PROJECT</span>
      <h1>StudyFlow makes coursework easier to manage.</h1>
      <p>StudyFlow is a React application built to practice routing, asynchronous operations, and reusable UI architecture. It helps students organize assignments, track progress, and explore their study workload.</p>
      <div className="about-grid">
        <div><h3>React Router</h3><p>Nested layouts, dynamic routes, navigation, and URL-based filtering.</p></div>
        <div><h3>Fake API</h3><p>Asynchronous CRUD requests with simulated delays and errors.</p></div>
        <div><h3>Local persistence</h3><p>Task data is saved through the API to browser localStorage.</p></div>
        <div><h3>Analytics</h3><p>Statistics and distributions are calculated from actual API responses.</p></div>
      </div>
      <Link className="button" to="/tasks">Go to tasks</Link>
    </div>
  );
}
