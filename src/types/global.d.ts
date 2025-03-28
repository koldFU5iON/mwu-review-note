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
  saveNote: (data: SaveNoteProps) => void;
  getConfig: () => Promise<AppConfig>;
  setConfig: <K extends keyof AppConfig>(key: K, value: AppConfig[K]) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronApi;
  }
}
