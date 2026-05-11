import chalk from 'chalk';
import path from 'path';
import { parseEnvFile } from '../utils/parser.js';

export async function checkEnv() {
  const envPath = path.join(process.cwd(), '.env');
  const envExamplePath = path.join(process.cwd(), '.env.example');

  console.log(chalk.cyan('\n🔍 Checking .env against .env.example...'));

  const envVars = parseEnvFile(envPath);
  const exampleVars = parseEnvFile(envExamplePath);

  if (!envVars) {
    console.log(chalk.red('❌ No .env file found in the current directory.'));
    return;
  }

  if (!exampleVars) {
    console.log(chalk.red('❌ No .env.example file found. Generate one first!'));
    return;
  }

  let hasIssues = false;

  // Check for missing keys in .env
  for (const key of exampleVars.keys()) {
    if (!envVars.has(key)) {
      console.log(chalk.red(`❌ Missing key in .env: ${key}`));
      hasIssues = true;
    }
  }

  // Check for extra keys in .env
  for (const key of envVars.keys()) {
    if (!exampleVars.has(key)) {
      console.log(chalk.yellow(`⚠️  Extra key in .env (not in .env.example): ${key}`));
      hasIssues = true;
    }
  }

  // Check for empty values in .env
  for (const [key, value] of envVars.entries()) {
    if (!value) {
      console.log(chalk.yellow(`⚠️  Empty value in .env for key: ${key}`));
      hasIssues = true;
    }
  }

  if (!hasIssues) {
    console.log(chalk.green('✅ All good! .env matches .env.example perfectly.'));
  } else {
    console.log(chalk.red('\n🚨 Issues found! Please update your .env or .env.example file.'));
  }
}
