import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { parseEnvFile } from '../utils/parser.js';
import { secretPatterns } from '../utils/patterns.js';

export async function scanSecrets() {
  const envPath = path.join(process.cwd(), '.env');
  console.log(chalk.cyan('\n🚨 Scanning .env for leaked secrets...'));

  if (!fs.existsSync(envPath)) {
    console.log(chalk.red('❌ No .env file found to scan.'));
    return;
  }

  const envVars = parseEnvFile(envPath);
  let foundSecrets = false;

  for (const [key, value] of envVars.entries()) {
    if (!value) continue;

    for (const pattern of secretPatterns) {
      if (pattern.regex.test(value)) {
        console.log(chalk.red(`\n❌ Secret Leaked in .env!`));
        console.log(chalk.red(`   Key: ${key}`));
        console.log(chalk.red(`   Type: ${pattern.name}`));
        foundSecrets = true;
      }
    }
  }

  if (!foundSecrets) {
    console.log(chalk.green('✅ No secrets found in .env!'));
  } else {
    console.log(chalk.red('\n🚨 Please remove the secrets from .env before committing!'));
  }
}
