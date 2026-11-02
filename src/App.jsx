import React from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./layouts/RootLayout.jsx";
import TasksLayout from "./layouts/TasksLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";

const Home = React.lazy(() => import("./pages/Home.jsx"));
const About = React.lazy(() => import("./pages/About.jsx"));
const Login = React.lazy(() => import("./pages/Login.jsx"));
const Tasks = React.lazy(() => import("./pages/Tasks.jsx"));
const TaskDetails = React.lazy(() => import("./pages/TaskDetails.jsx"));
const NewTask = React.lazy(() => import("./pages/NewTask.jsx"));
const EditTask = React.lazy(() => import("./pages/EditTask.jsx"));
const FilteredTasks = React.lazy(() => import("./pages/FilteredTasks.jsx"));
const Dashboard = React.lazy(() => import("./pages/Dashboard.jsx"));
const SubjectAnalytics = React.lazy(() => import("./pages/SubjectAnalytics.jsx"));
const NotFound = React.lazy(() => import("./pages/NotFound.jsx"));

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="tasks" element={<TasksLayout />}>
          <Route index element={<Tasks />} />
          <Route path="completed" element={<FilteredTasks kind="completed" />} />
          <Route path="overdue" element={<FilteredTasks kind="overdue" />} />
          <Route path="high-priority" element={<FilteredTasks kind="high-priority" />} />
          <Route path="new" element={<NewTask />} />
          <Route path=":id/edit" element={<EditTask />} />
          <Route path=":id" element={<TaskDetails />} />
        </Route>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="subjects" element={<SubjectAnalytics />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
