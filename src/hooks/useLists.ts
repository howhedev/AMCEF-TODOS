import { useEffect, useState } from "react";
import { CanceledError } from "../services/apiClient";
import listService, { List } from "../services/listService";

const useLists = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = listService.getAllLists();

    request
      .then((res) => {
        setLists(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { lists, error, isLoading, setLists, setError };
};

export default useLists;
