import { useEffect, useState } from "react";
import { getAllTasks } from "../services/service.js";

export default function useAllTasks() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;
    setStatus("loading");
    setError("");

    getAllTasks()
      .then((result) => {
        if (ignore) return;
        setTasks(result);
        setStatus("success");
      })
      .catch((reason) => {
        if (ignore) return;
        setError(reason.message);
        setStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  return { tasks, status, error, reload: () => setReloadKey((value) => value + 1) };
}
