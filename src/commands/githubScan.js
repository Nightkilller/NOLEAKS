import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';
import chalk from 'chalk';
import { secretPatterns } from '../utils/patterns.js';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    // Ignore common noisy/binary directories
    if (f === '.git' || f === 'node_modules' || f === 'dist' || f === 'build' || f === '.next') {
      return;
    }
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

export async function scanGithubRepo(repoUrl) {
  console.log(chalk.cyan(`\n🌐 Cloning repository ${repoUrl}... (this may take a moment)`));

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'noleaks-'));

  try {
    // Clone with depth=1 to make it fast
    execSync(`git clone --depth 1 ${repoUrl} .`, { cwd: tempDir, stdio: 'ignore' });
    console.log(chalk.cyan('🔍 Scanning all files for secrets...\n'));

    let foundSecrets = false;

    walkDir(tempDir, (filePath) => {
      try {
        const ext = path.extname(filePath).toLowerCase();
        const fileName = path.basename(filePath);

        // Skip lock files to prevent massive false positives on integrity hashes
        if (fileName === 'package-lock.json' || fileName === 'yarn.lock' || fileName === 'pnpm-lock.yaml') return;

        // Skip common binary and media files
        const binaryExts = ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.pdf', '.zip', '.tar', '.gz', '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.mp3', '.svg'];
        if (binaryExts.includes(ext)) return;

        // Also skip minified files
        if (filePath.endsWith('.min.js') || filePath.endsWith('.min.css')) return;

        const content = fs.readFileSync(filePath, 'utf-8');
        const relativePath = path.relative(tempDir, filePath);
        
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          for (const pattern of secretPatterns) {
            if (pattern.regex.test(line)) {
              console.log(chalk.red(`❌ Secret Leaked in: ${chalk.bold(relativePath)} (Line ${index + 1})`));
              console.log(chalk.red(`   Type: ${pattern.name}`));
              const snippet = line.trim().substring(0, 80);
              console.log(chalk.gray(`   Code: ${snippet}...`));
              console.log();
              foundSecrets = true;
            }
          }
        });
      } catch (err) {
        // Silently skip files that can't be read
      }
    });

    if (!foundSecrets) {
      console.log(chalk.green('✅ Awesome! No exposed secrets were found in this repository.'));
    } else {
      console.log(chalk.red('🚨 The repository contains exposed secrets! Treat them as compromised.'));
    }

  } catch (error) {
    console.log(chalk.red('\n❌ Failed to clone repository.'));
    console.log(chalk.yellow('Make sure the URL is correct and the repository is PUBLIC.'));
  } finally {
    // Cleanup the temporary directory silently
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (e) {}
  }
}
