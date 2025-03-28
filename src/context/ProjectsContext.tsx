// context/ProjectsContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type File = { name: string; path: string };
type ProjectMap = Record<string, File[]>;

const ProjectsContext = createContext<{
  projects: ProjectMap;
  isLoading: boolean;
  refreshProjects: () => void;
} | null>(null);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<ProjectMap>({});
  const [isLoading, setIsLoading] = useState(true);

  const refreshProjects = useCallback(() => {
    window.electronAPI.loadProjects().then((data) => {
      setProjects(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  return (
    <ProjectsContext.Provider value={{ projects, isLoading, refreshProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx)
    throw new Error("useProjects must be used within a ProjectsProvider");
  return ctx;
}
