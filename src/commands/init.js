import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export async function generateExample() {
  console.log(chalk.cyan('\n📄 Generating .env.example...'));

  const envPath = path.join(process.cwd(), '.env');
  const envExamplePath = path.join(process.cwd(), '.env.example');

  if (fs.existsSync(envExamplePath)) {
    console.log(chalk.yellow('⚠️  .env.example already exists! Skipping generation to prevent overwriting.'));
    return;
  }

  if (fs.existsSync(envPath)) {
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

    fs.writeFileSync(envExamplePath, exampleContent.trim() + '\n');
    console.log(chalk.green('✅ Generated .env.example based on your current .env file!'));
  } else {
    console.log(chalk.yellow('⚠️  No .env file found. Creating an empty .env.example.'));
    fs.writeFileSync(envExamplePath, '# Add your environment variables here\n\nPORT=\nDATABASE_URL=\nAPI_KEY=\n');
    console.log(chalk.green('✅ Created a default .env.example template!'));
  }
}
