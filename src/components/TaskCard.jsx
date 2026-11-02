import React from "react";
import { Link } from "react-router-dom";
import { isOverdue } from "../services/service.js";

export default function TaskCard({ task }) {
  return (
    <article className="task-card">
      <div className="task-card-top">
        <span className="eyebrow">{task.subject || "General"}</span>
        <span className={`pill status-${(task.status || "to-do").toLowerCase().replaceAll(" ", "-")}`}>
          {task.status || "To Do"}
        </span>
      </div>
      <h3><Link to={`/tasks/${task.id}`}>{task.name}</Link></h3>
      <p>{task.description || "No description"}</p>
      <div className="task-card-bottom">
        <span className={`priority priority-${(task.priority || "low").toLowerCase()}`}>{task.priority || "Low"} priority</span>
        <span className={isOverdue(task) ? "late" : "subtle"}>{isOverdue(task) ? "Overdue · " : "Due · "}{task.dueDate || "No date"}</span>
      </div>
    </article>
  );
}
