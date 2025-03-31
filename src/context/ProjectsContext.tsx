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
    const attemptLoad = (retries = 5) => {
      if (!window.electronAPI?.loadProjects) {
        console.warn("⏳ Waiting for electronAPI...");
        if (retries > 0) {
          setTimeout(() => attemptLoad(retries - 1), 300);
        }
        return;
      }

      console.log("🚀 Loading projects via Electron...");
      window.electronAPI
        .loadProjects()
        .then((data) => {
          console.log("✅ Projects loaded:", data);
          setProjects(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("❌ Failed to load projects:", err);
        });
    };

    attemptLoad();
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
