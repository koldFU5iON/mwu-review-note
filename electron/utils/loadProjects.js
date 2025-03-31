import fs from "fs";
import path from "path";
import { getConfig } from "../config.js";

export function loadProjects() {
  const rootDir = getConfig().defaultProjectDirectory;
  if (!fs.existsSync(rootDir)) return {};

  console.log(`root dir: ${rootDir}`);
  const folders = fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const result = {};

  folders.forEach((folder) => {
    const folderPath = path.join(rootDir, folder);
    const files = fs
      .readdirSync(folderPath, { withFileTypes: true })
      .filter((dirent) => dirent.isFile())
      .map((file) => ({
        name: file.name,
        path: path.join(folderPath, file.name),
      }));

    result[folder] = files;
  });

  return result;
}
