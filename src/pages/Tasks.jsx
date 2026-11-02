import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import TaskCard from "../components/TaskCard.jsx";
import LoadState from "../components/LoadState.jsx";
import useAllTasks from "../hooks/useAllTasks.js";
import { filterTasks } from "../services/service.js";

const PAGE_SIZE = 6;

export default function Tasks() {
  const { tasks, status, error, reload } = useAllTasks();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const search = searchParams.get("search") || "";
  const subject = searchParams.get("subject") || "";
  const statusFilter = searchParams.get("status") || "";
  const priority = searchParams.get("priority") || "";
  const sort = searchParams.get("sort") || "name";
  const pageParam = Number(searchParams.get("page"));
  const requestedPage = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1;
  const subjects = [...new Set(tasks.map((task) => task.subject).filter(Boolean))].sort();
  const filtered = filterTasks(tasks, { search, subject, status: statusFilter, priority, sort });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    if (key !== "page") next.delete("page");
    setSearchParams(next);
  }

  function clearFilters() {
    setSearchParams(new URLSearchParams());
  }

  return (
    <section className="page-stack">
      {location.state?.notice && <p className="alert success" role="status">{location.state.notice}</p>}
      <div className="toolbar card-surface">
        <label className="filter-search">Search<input type="search" placeholder="Search names or descriptions" value={search} onChange={(e) => updateParam("search", e.target.value)} /></label>
        <label>Subject<select value={subject} onChange={(e) => updateParam("subject", e.target.value)}><option value="">All subjects</option>{subjects.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
        <label>Status<select value={statusFilter} onChange={(e) => updateParam("status", e.target.value)}><option value="">Any status</option><option>To Do</option><option>In Progress</option><option>Completed</option></select></label>
        <label>Priority<select value={priority} onChange={(e) => updateParam("priority", e.target.value)}><option value="">Any priority</option><option>High</option><option>Medium</option><option>Low</option></select></label>
        <label>Sort by<select value={sort} onChange={(e) => updateParam("sort", e.target.value)}><option value="name">Name A–Z</option><option value="name-desc">Name Z–A</option><option value="due">Due date</option><option value="priority">Priority</option><option value="newest">Newest</option></select></label>
        <div className="filter-actions"><button className="button secondary small" onClick={clearFilters}>Clear filters</button><button className="button secondary small" onClick={reload} disabled={status === "loading"}>Reload</button></div>
      </div>
      {status === "success" && <div className="list-meta"><span>{filtered.length} {filtered.length === 1 ? "task" : "tasks"} found</span><span>Page {page} of {totalPages}</span></div>}
      <LoadState status={status} error={error} onRetry={reload} empty={status === "success" && filtered.length === 0} emptyText={tasks.length === 0 ? "Create your first task using the New task button." : "Try clearing one or more filters."} />
      {status === "success" && visible.length > 0 && <div className="tasks-grid">{visible.map((task) => <TaskCard key={task.id} task={task} />)}</div>}
      {status === "success" && totalPages > 1 && (
        <nav className="pagination" aria-label="Pagination">
          <button className="button secondary small" disabled={page <= 1} onClick={() => updateParam("page", String(page - 1))}>← Previous</button>
          <span>{page} / {totalPages}</span>
          <button className="button secondary small" disabled={page >= totalPages} onClick={() => updateParam("page", String(page + 1))}>Next →</button>
        </nav>
      )}
    </section>
  );
}
