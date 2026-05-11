import fs from 'fs';

export function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const envMap = new Map();
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    
    const equalsIdx = trimmed.indexOf('=');
    if (equalsIdx !== -1) {
      const key = trimmed.slice(0, equalsIdx).trim();
      let value = trimmed.slice(equalsIdx + 1).trim();
      
      // Remove surrounding quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.substring(1, value.length - 1);
      }
      
      envMap.set(key, value);
    }
  }
  
  return envMap;
}
