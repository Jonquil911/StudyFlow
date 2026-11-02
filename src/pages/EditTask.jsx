import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/TaskForm.jsx";
import LoadState from "../components/LoadState.jsx";
import useTask from "../hooks/useTask.js";
import { saveTask } from "../services/service.js";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { task, status, error, reload } = useTask(id);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const validTask = status === "success" && task?.id === Number(id);

  async function handleSave(form) {
    if (saving || !validTask) return;
    const targetId = task.id;
    setSaving(true);
    setSaveError("");
    try {
      await saveTask(targetId, form);
      navigate(`/tasks/${targetId}`, { replace: true, state: { notice: "Task updated successfully." } });
    } catch (reason) {
      setSaveError(reason.message);
      setSaving(false);
    }
  }

  return (
    <section className="page-stack narrow-page">
      <div className="breadcrumb"><Link to={`/tasks/${id}`}>← Task details</Link><span>/</span><span>Edit</span></div>
      <div className="section-intro"><h2>Edit task</h2><p>Update assignment details and save your changes.</p></div>
      <LoadState status={status} error={error} onRetry={reload} />
      {validTask && <TaskForm key={task.id} task={task} saving={saving} error={saveError} onSave={handleSave} onCancel={() => navigate(`/tasks/${id}`)} />}
    </section>
  );
}
