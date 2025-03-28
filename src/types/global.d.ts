// global.d.ts

export interface AppConfig {
  defaultProjectDirectory: string;
  autoSave: boolean;
  lastOpenedProject: string | null;
}

export interface SaveNoteProps {
  note: string;
  projectName: string;
  filename?: string;
}

export interface ElectronApi {
  saveNote: (data: SaveNoteProps) => Promise<void>;
  getConfig: () => Promise<AppConfig>;
  setConfig: <K extends keyof AppConfig>(key: K, value: AppConfig[K]) => void;
  loadProjects: () => Promise<Record<string, { name: string; path: string }[]>>;
}

declare global {
  interface Window {
    electronAPI: ElectronApi;
  }
}
