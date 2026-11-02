import { useEffect, useState } from "react";
import { getTask } from "../services/service.js";

export default function useTask(id) {
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;
    setTask(null);
    setStatus("loading");
    setError("");

    getTask(id)
      .then((result) => {
        if (ignore) return;
        setTask(result);
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
  }, [id, reloadKey]);

  return { task, setTask, status, error, reload: () => setReloadKey((value) => value + 1) };
}
