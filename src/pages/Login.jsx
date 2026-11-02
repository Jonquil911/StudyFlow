import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="login-card card-surface">
      <span className="eyebrow">ACCOUNT ACCESS</span><h1>Welcome back</h1>
      <p>This is a design placeholder. Authentication is not enabled in this project.</p>
      <label>Email address<input disabled type="email" placeholder="student@example.com" /></label>
      <label>Password<input disabled type="password" placeholder="••••••••" /></label>
      <button className="button" disabled>Sign in (coming soon)</button>
      <Link to="/" className="inline-link">Back to Home</Link>
    </section>
  );
}
