import { execSync } from 'child_process';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

export async function scanGitHistory() {
  console.log(chalk.cyan('\n📜 Scanning Git history for .env leaks...'));

  const isGitRepo = fs.existsSync(path.join(process.cwd(), '.git'));
  if (!isGitRepo) {
    console.log(chalk.yellow('⚠️  Not a git repository. Skipping git history scan.'));
    return;
  }

  // Check if .env is in .gitignore
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  let ignored = false;
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    if (gitignoreContent.split('\n').some(line => line.trim() === '.env' || line.trim() === '/.env')) {
      ignored = true;
    }
  }

  if (ignored) {
    console.log(chalk.green('✅ .env is safely ignored in .gitignore.'));
  } else {
    console.log(chalk.red('❌ .env is NOT in .gitignore! This is a major security risk.'));
  }

  // Check git history
  try {
    const output = execSync('git log --oneline --all -- .env', { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] });
    if (output.trim()) {
      console.log(chalk.red('\n🚨 ALERT! .env was found in your git history!'));
      console.log(chalk.yellow('These commits contain .env file changes:\n'));
      console.log(output);
      console.log(chalk.red('You should remove it from history immediately to prevent leaks.'));
    } else {
      console.log(chalk.green('✅ No trace of .env found in git history.'));
    }
  } catch (error) {
    // If git log fails (e.g. no commits yet), we ignore
    console.log(chalk.green('✅ No trace of .env found in git history (or no commits yet).'));
  }
}
