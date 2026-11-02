import React from "react";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard.jsx";
import LoadState from "../components/LoadState.jsx";
import useAllTasks from "../hooks/useAllTasks.js";
import { isOverdue } from "../services/service.js";

const views = {
  completed: { title: "Completed tasks", description: "Assignments you have already finished.", test: (task) => task.status === "Completed" },
  overdue: { title: "Overdue tasks", description: "Unfinished assignments past their due date.", test: isOverdue },
  "high-priority": { title: "High priority", description: "Important assignments that need your attention.", test: (task) => task.priority === "High" },
};

export default function FilteredTasks({ kind }) {
  const { tasks, status, error, reload } = useAllTasks();
  const view = views[kind];
  const results = tasks.filter(view.test);
  return (
    <section className="page-stack">
      <div className="list-meta"><div><h2>{view.title}</h2><p>{view.description}</p></div><button className="button secondary small" disabled={status === "loading"} onClick={reload}>Reload</button></div>
      <LoadState status={status} error={error} onRetry={reload} empty={status === "success" && results.length === 0} emptyText="There are no tasks in this view." />
      {status === "success" && results.length > 0 && <div className="tasks-grid">{results.map((task) => <TaskCard task={task} key={task.id} />)}</div>}
      <Link to="/tasks" className="inline-link">← All tasks and filters</Link>
    </section>
  );
}
