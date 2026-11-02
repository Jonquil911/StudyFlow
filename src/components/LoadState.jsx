import React from "react";

export default function LoadState({ status, error, onRetry, empty = false, emptyText = "Nothing to show yet." }) {
  if (status === "loading") {
    return <div className="message-card" role="status"><span className="spinner" /> Loading data...</div>;
  }
  if (status === "error") {
    return (
      <div className="message-card error" role="alert">
        <strong>Could not load data</strong>
        <p>{error}</p>
        {onRetry && <button className="button secondary" onClick={onRetry}>Try again</button>}
      </div>
    );
  }
  if (empty) {
    return <div className="message-card"><strong>No results</strong><p>{emptyText}</p></div>;
  }
  return null;
}
