import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LoadState from "../components/LoadState.jsx";
import useTask from "../hooks/useTask.js";
import { isOverdue, removeTask, setTaskStatus } from "../services/service.js";

export default function TaskDetails() {
  const { id } = useParams();
  const { task, setTask, status, error, reload } = useTask(id);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const validTask = status === "success" && task?.id === Number(id);

  async function toggleComplete() {
    if (!validTask || saving) return;
    const targetId = task.id;
    const newStatus = task.status === "Completed" ? "To Do" : "Completed";
    setSaving(true);
    setNotice(null);
    try {
      const updated = await setTaskStatus(targetId, newStatus);
      setTask((current) => current?.id === targetId ? updated : current);
      setNotice({ type: "success", text: "Task status updated." });
    } catch (reason) {
      setNotice({ type: "error", text: reason.message });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!validTask || saving) return;
    const targetId = task.id;
    if (!window.confirm(`Delete “${task.name}”?`)) return;
    setSaving(true);
    setNotice(null);
    try {
      await removeTask(targetId);
      navigate("/tasks", { replace: true, state: { notice: "Task deleted successfully." } });
    } catch (reason) {
      setNotice({ type: "error", text: reason.message });
      setSaving(false);
    }
  }

  return (
    <section className="page-stack">
      <div className="breadcrumb"><button className="inline-button" onClick={() => navigate(-1)}>← Back</button><span>/</span><Link to="/tasks">All tasks</Link><span>/</span><span>Details</span></div>
      {(notice || location.state?.notice) && <div className={`alert ${notice?.type || "success"}`} role="status">{notice?.text || location.state?.notice}</div>}
      <LoadState status={status} error={error} onRetry={reload} />
      {validTask && <article className="detail-card card-surface">
        <div className="detail-heading"><div><span className="eyebrow">TASK #{task.id}</span><h2>{task.name}</h2></div><span className={`pill status-${(task.status || "to-do").toLowerCase().replaceAll(" ", "-")}`}>{task.status || "To Do"}</span></div>
        <p className="detail-description">{task.description}</p>
        {isOverdue(task) && <p className="alert warning">This task is past its due date.</p>}
        <dl className="details-grid">
          <div><dt>Subject</dt><dd>{task.subject || "Not set"}</dd></div>
          <div><dt>Priority</dt><dd>{task.priority || "Not set"}</dd></div>
          <div><dt>Status</dt><dd>{task.status || "To Do"}</dd></div>
          <div><dt>Due date</dt><dd>{task.dueDate || "Not set"}</dd></div>
          <div><dt>Estimated hours</dt><dd>{task.estimatedHours ?? "Not set"}</dd></div>
          <div><dt>Created on</dt><dd>{task.createdAt || "Not recorded"}</dd></div>
          <div><dt>Task ID</dt><dd>{task.id}</dd></div>
        </dl>
        <div className="actions">
          <button className="button" disabled={saving} onClick={toggleComplete}>{saving ? "Please wait..." : task.status === "Completed" ? "Reopen task" : "Mark completed"}</button>
          <Link className={`button secondary${saving ? " is-disabled" : ""}`} to={`/tasks/${id}/edit`} aria-disabled={saving} onClick={(event) => { if (saving) event.preventDefault(); }}>Edit task</Link>
          <button className="button danger" disabled={saving} onClick={handleDelete}>Delete task</button>
        </div>
      </article>}
      <Link to="/tasks" className="inline-link">← All tasks</Link>
    </section>
  );
}
