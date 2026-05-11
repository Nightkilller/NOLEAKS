import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { parseEnvFile } from '../utils/parser.js';

export async function fixIssues() {
  console.log(chalk.cyan('\n🛠️  Fixing issues automatically...'));

  const envPath = path.join(process.cwd(), '.env');
  const envExamplePath = path.join(process.cwd(), '.env.example');
  const gitignorePath = path.join(process.cwd(), '.gitignore');

  let fixedSomething = false;

  // 1. Add to .gitignore if not present
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    if (!gitignoreContent.split('\n').some(line => line.trim() === '.env' || line.trim() === '/.env')) {
      fs.appendFileSync(gitignorePath, '\n# Ignored environment variables\n.env\n');
      console.log(chalk.green('✅ Added .env to .gitignore'));
      fixedSomething = true;
    }
  } else {
    // If no .gitignore exists, create it
    fs.writeFileSync(gitignorePath, '# Ignored environment variables\n.env\n');
    console.log(chalk.green('✅ Created .gitignore and added .env'));
    fixedSomething = true;
  }

  // 2. Generate .env.example from .env by stripping values, but keep comments and blank lines
  if (fs.existsSync(envPath)) {
    // Read raw to keep comments
    const rawContent = fs.readFileSync(envPath, 'utf-8');
    const lines = rawContent.split('\n');
    let exampleContent = '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        exampleContent += line + '\n';
        continue;
      }

      const equalsIdx = trimmed.indexOf('=');
      if (equalsIdx !== -1) {
        const key = trimmed.slice(0, equalsIdx).trim();
        exampleContent += `${key}=\n`;
      } else {
        exampleContent += line + '\n';
      }
    }

    // Only overwrite if it doesn't exist or user forces it? The prompt says: "create .env.example from existing .env by keeping all keys but blanking the values."
    // We can just overwrite it to be safe, or just merge it. Let's just create/overwrite it as a "fix" action.
    fs.writeFileSync(envExamplePath, exampleContent.trim() + '\n');
    console.log(chalk.green('✅ Generated/Updated .env.example from .env (values blanked)'));
    fixedSomething = true;
  } else {
    console.log(chalk.yellow('⚠️  No .env file found. Cannot generate .env.example.'));
  }

  if (!fixedSomething) {
    console.log(chalk.green('✅ Nothing to fix! Your setup looks good.'));
  } else {
    console.log(chalk.cyan('✨ All automated fixes applied!'));
  }
}
