import React, { useState } from "react";

export default function TaskForm({ task = null, saving = false, error = "", onSave, onCancel }) {
  const [form, setForm] = useState({
    name: task?.name || "",
    description: task?.description || "",
    subject: task?.subject || "",
    priority: task?.priority || "Medium",
    status: task?.status || "To Do",
    dueDate: task?.dueDate || "",
    estimatedHours: task?.estimatedHours ?? 1,
  });

  function change(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    onSave({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      subject: form.subject.trim(),
      estimatedHours: Number(form.estimatedHours),
    });
  }

  return (
    <form className="form-card" onSubmit={submit}>
      {error && <p className="alert error" role="alert">{error}</p>}
      <div className="form-grid">
        <label className="wide">Task name<input required maxLength="100" disabled={saving} value={form.name} onChange={(e) => change("name", e.target.value)} placeholder="e.g. Finish React routing homework" /></label>
        <label className="wide">Description<textarea required rows="4" disabled={saving} value={form.description} onChange={(e) => change("description", e.target.value)} placeholder="What needs to be done?" /></label>
        <label>Subject<input required disabled={saving} value={form.subject} onChange={(e) => change("subject", e.target.value)} placeholder="React, English, Golang..." /></label>
        <label>Priority<select disabled={saving} value={form.priority} onChange={(e) => change("priority", e.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label>
        <label>Status<select disabled={saving} value={form.status} onChange={(e) => change("status", e.target.value)}><option>To Do</option><option>In Progress</option><option>Completed</option></select></label>
        <label>Due date<input type="date" required disabled={saving} value={form.dueDate} onChange={(e) => change("dueDate", e.target.value)} /></label>
        <label>Estimated hours<input type="number" min="0.5" step="0.5" required disabled={saving} value={form.estimatedHours} onChange={(e) => change("estimatedHours", e.target.value)} /></label>
      </div>
      <div className="actions">
        <button className="button" disabled={saving || !form.name.trim() || !form.description.trim() || !form.subject.trim()} type="submit">{saving ? "Saving..." : task ? "Save changes" : "Create task"}</button>
        <button className="button secondary" disabled={saving} type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
