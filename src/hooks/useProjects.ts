import { useEffect, useState, useCallback } from "react";

type File = {
  name: string;
  path: string;
};

type ProjectMap = Record<string, File[]>;

export function useProjects() {
  const [projects, setProjects] = useState<ProjectMap>({});
  const [isLoading, setIsLoading] = useState(true);

  const refreshProjects = useCallback(() => {
    setIsLoading(true);
    window.electronAPI.loadProjects().then((data) => {
      setProjects(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  return { projects, isLoading, refreshProjects };
}
