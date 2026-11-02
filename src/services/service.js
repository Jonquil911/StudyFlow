import {
  getItemsList,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../api/fakeApi.js";

export async function getAllTasks() {
  const result = await getItemsList("?limit=1000");
  return result.data;
}

export function getTask(id) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1) {
    return Promise.reject(new Error("Task not found"));
  }
  return getItem(numericId);
}

export async function createTask(data) {
  const created = await createItem({
    name: data.name,
    description: data.description,
  });
  try {
    return await updateItem(created.id, {
      subject: data.subject,
      priority: data.priority,
      status: data.status,
      dueDate: data.dueDate,
      estimatedHours: data.estimatedHours,
      createdAt: new Date().toISOString().slice(0, 10),
    });
  } catch (error) {
    const partialError = new Error("Task created, but some fields could not be saved. Open the task to finish editing it.");
    partialError.taskId = created.id;
    throw partialError;
  }
}

export function saveTask(id, data) {
  return updateItem(id, {
    name: data.name,
    description: data.description,
    subject: data.subject,
    priority: data.priority,
    status: data.status,
    dueDate: data.dueDate,
    estimatedHours: data.estimatedHours,
  });
}

export function setTaskStatus(id, status) {
  return updateItem(id, { status });
}

export function removeTask(id) {
  return deleteItem(id);
}

export function isOverdue(task) {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return Boolean(task.dueDate && task.dueDate < today && task.status !== "Completed");
}

const priorityWeight = { High: 0, Medium: 1, Low: 2 };

export function filterTasks(tasks, filters = {}) {
  const search = (filters.search || "").trim().toLowerCase();
  const status = filters.status || "";
  const priority = filters.priority || "";
  const subject = filters.subject || "";
  const sort = filters.sort || "name";

  const matches = tasks.filter((task) => {
    if (search && !`${task.name} ${task.description}`.toLowerCase().includes(search)) return false;
    if (status && task.status !== status) return false;
    if (priority && task.priority !== priority) return false;
    if (subject && task.subject !== subject) return false;
    return true;
  });

  return [...matches].sort((a, b) => {
    if (sort === "name-desc") return b.name.localeCompare(a.name);
    if (sort === "due") return (a.dueDate || "9999-12-31").localeCompare(b.dueDate || "9999-12-31");
    if (sort === "priority") return (priorityWeight[a.priority] ?? 3) - (priorityWeight[b.priority] ?? 3);
    if (sort === "newest") return (b.createdAt || "").localeCompare(a.createdAt || "");
    return a.name.localeCompare(b.name);
  });
}

export function getDashboardStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const inProgress = tasks.filter((task) => task.status === "In Progress").length;
  const overdue = tasks.filter(isOverdue).length;
  const hours = tasks.reduce((sum, task) => sum + (Number(task.estimatedHours) || 0), 0);
  return { total, completed, inProgress, overdue, hours };
}

export function getBreakdown(tasks, field) {
  const counts = tasks.reduce((result, task) => {
    const key = task[field] || "Unassigned";
    result[key] = (result[key] || 0) + 1;
    return result;
  }, {});
  return Object.entries(counts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}
