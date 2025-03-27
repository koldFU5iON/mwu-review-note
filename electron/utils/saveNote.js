import fs from 'fs';
import path from 'path';
import os from 'os';

export function saveNote(data) {
  const desktopDir = path.join(os.homedir(), 'Desktop');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = data.filename || `note_${timestamp}.txt`;
  const filePath = path.join(desktopDir, fileName);

  fs.writeFileSync(filePath, data.note, 'utf8');

  console.log(`✅ Note saved to: ${filePath}`);
}
