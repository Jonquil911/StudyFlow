import test from "node:test";
import assert from "node:assert/strict";

const storage = new Map();
globalThis.localStorage = {
  getItem: (key) => storage.has(key) ? storage.get(key) : null,
  setItem: (key, value) => storage.set(key, value),
  removeItem: (key) => storage.delete(key),
};
Math.random = () => 0.99;
globalThis.setTimeout = (callback) => queueMicrotask(callback);

const service = await import("../src/services/service.js");

test("API seeds twenty-four study tasks", async () => {
  const tasks = await service.getAllTasks();
  assert.equal(tasks.length, 24);
  assert.equal(new Set(tasks.map((task) => task.subject)).size, 6);
  assert.equal(service.getDashboardStats(tasks).completed, 9);
  assert.equal(service.getDashboardStats(tasks).inProgress, 7);
});

test("search, filters, sorting and breakdown use task data", async () => {
  const tasks = await service.getAllTasks();
  assert.ok(service.filterTasks(tasks, { search: "React" }).length >= 1);
  assert.ok(service.filterTasks(tasks, { priority: "High" }).every((task) => task.priority === "High"));
  assert.ok(service.filterTasks(tasks, { status: "Completed" }).every((task) => task.status === "Completed"));
  assert.ok(service.filterTasks(tasks, { subject: "IoT" }).every((task) => task.subject === "IoT"));
  const byName = service.filterTasks(tasks, { sort: "name" });
  assert.ok(byName[0].name.localeCompare(byName[1].name) <= 0);
  assert.equal(service.getBreakdown(tasks, "subject").reduce((sum, row) => sum + row.count, 0), tasks.length);
});

test("create, fetch, update and delete are persisted through API", async () => {
  const created = await service.createTask({
    name: "Async API Test", description: "Test save operation", subject: "React",
    priority: "High", status: "To Do", dueDate: "2026-11-15", estimatedHours: 2,
  });
  assert.equal(created.id, 25);
  assert.equal((await service.getTask(created.id)).subject, "React");
  const changed = await service.setTaskStatus(created.id, "Completed");
  assert.equal(changed.status, "Completed");
  const edited = await service.saveTask(created.id, {
    name: "Updated test", description: "Edited", subject: "Golang", priority: "Low",
    status: "Completed", dueDate: "2026-11-16", estimatedHours: 4,
  });
  assert.equal(edited.name, "Updated test");
  assert.equal((await service.getTask(created.id)).subject, "Golang");
  await service.removeTask(created.id);
  assert.equal((await service.getAllTasks()).length, 24);
  await assert.rejects(service.getTask(created.id), /Item not found/);
});

test("invalid task IDs do not load", async () => {
  await assert.rejects(service.getTask("unknown"), /Task not found/);
  await assert.rejects(service.getTask(-1), /Task not found/);
});
