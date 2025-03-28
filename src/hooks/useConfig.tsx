import { useEffect, useState } from "react";
import type { AppConfig } from "@/types/global"; // if you exported it from global.d.ts

export function useConfig() {
  const [config, setConfigState] = useState<AppConfig | null>(null);

  useEffect(() => {
    window.electronAPI.getConfig().then((data) => {
      setConfigState(data);
    });
  }, []);

  const updateConfig = <K extends keyof AppConfig>(
    key: K,
    value: AppConfig[K]
  ) => {
    if (!config) return;
    const updated = { ...config, [key]: value };
    window.electronAPI.setConfig(key, value);
    setConfigState(updated);
  };

  return {
    config,
    updateConfig,
    isLoading: config === null,
  };
}
