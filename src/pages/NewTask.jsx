import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm.jsx";
import { createTask } from "../services/service.js";

export default function NewTask() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [partialId, setPartialId] = useState(null);

  async function handleSave(form) {
    if (saving || partialId !== null) return;
    setSaving(true);
    setError("");
    try {
      const created = await createTask(form);
      navigate(`/tasks/${created.id}`, { replace: true, state: { notice: "Task created successfully." } });
    } catch (reason) {
      setError(reason.message);
      if (reason.taskId) setPartialId(reason.taskId);
      setSaving(false);
    }
  }

  return (
    <section className="page-stack narrow-page">
      <div className="breadcrumb"><Link to="/tasks">← All tasks</Link><span>/</span><span>New</span></div>
      <div className="section-intro"><h2>Create a task</h2><p>Set a goal, give it a deadline, and keep your schedule organized.</p></div>
      {partialId !== null ? (
        <div className="message-card error" role="alert"><p>{error}</p><Link className="button" to={`/tasks/${partialId}/edit`}>Finish editing task #{partialId}</Link></div>
      ) : <TaskForm saving={saving} error={error} onSave={handleSave} onCancel={() => navigate("/tasks")} />}
    </section>
  );
}
