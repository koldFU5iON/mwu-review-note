import fs from "fs";
import path from "path";
import { getConfig } from "../config.js";

/**
 * @typedef {Object} SaveNoteProps
 * @property {string} note
 * @property {string} projectName
 * @property {string} [filename]
 */

export function saveNote(data) {
  const rootDir = getConfig().defaultProjectDirectory;
  const projectDir = path.join(rootDir, data.projectName);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = data.filename || `note_${data.projectName}-${timestamp}.md`;
  const filePath = path.join(projectDir, fileName);

  // Ensure project folder exists
  fs.mkdirSync(projectDir, { recursive: true });

  // Save markdown note
  const markdown = `# Note for ${data.projectName}\n\n${data.note}`;
  fs.writeFileSync(filePath, markdown, "utf8");

  console.log(`✅ Note saved to: ${filePath}`);
}
