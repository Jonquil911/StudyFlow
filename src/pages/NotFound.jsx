import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return <section className="not-found card-surface"><span className="eyebrow">404 · PAGE NOT FOUND</span><h1>We couldn't find that page.</h1><p>The URL may be incorrect or the page no longer exists.</p><Link to="/" className="button">Back to Home</Link></section>;
}
