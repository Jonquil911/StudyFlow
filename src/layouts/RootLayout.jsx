import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";

export default function RootLayout() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="container page-area">
        <Suspense fallback={<div className="message-card"><span className="spinner" /> Loading page...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="site-footer"><div className="container">StudyFlow 2026</div></footer>
    </div>
  );
}
