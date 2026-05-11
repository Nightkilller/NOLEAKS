#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { checkEnv } from './commands/check.js';
import { scanSecrets } from './commands/scan.js';
import { scanGitHistory } from './commands/gitScan.js';
import { fixIssues } from './commands/fix.js';
import { generateExample } from './commands/init.js';
import { scanGithubRepo } from './commands/githubScan.js';

const VERSION = '1.0.0';

async function showBanner() {
  return new Promise((resolve) => {
    figlet.text('NOLEAKS', { font: 'ANSI Shadow' }, (err, data) => {
      if (err) {
        console.log(chalk.green('NOLEAKS'));
        return resolve();
      }
      console.log(gradient(['#00ff00', '#00ffff'])(data));
      console.log(chalk.gray(`  🔒 v${VERSION}  —  No secrets. No leaks. No stress.\n`));
      resolve();
    });
  });
}

async function promptMenu() {
  console.log();
  console.log(`  1) ${chalk.cyan('Validate .env'.padEnd(25))} 2) ${chalk.magenta('Scan secrets'.padEnd(24))} 3) ${chalk.yellow('Audit Git history')}`);
  console.log(`  4) ${chalk.green('Auto-remediate issues'.padEnd(25))} 5) ${chalk.blue('Scaffold .env.example'.padEnd(24))} 6) ${chalk.red.bold('Exit')}`);
  console.log(`  7) ${chalk.white('🌐 Scan public GitHub URL')}`);
  console.log();

  const { action } = await inquirer.prompt([
    {
      type: 'input',
      name: 'action',
      message: 'What do you want to do? (1-7):',
      validate: (val) => {
        if (['1', '2', '3', '4', '5', '6', '7'].includes(val.trim())) return true;
        return 'Please enter a valid number (1-7)';
      }
    }
  ]);

  switch (action.trim()) {
    case '1':
      await checkEnv();
      break;
    case '2':
      await scanSecrets();
      break;
    case '3':
      await scanGitHistory();
      break;
    case '4':
      await fixIssues();
      break;
    case '5':
      await generateExample();
      break;
    case '6':
      console.log(chalk.green('\nStay secure! 👋\n'));
      process.exit(0);
    case '7':
      const { repoUrl } = await inquirer.prompt([
        {
          type: 'input',
          name: 'repoUrl',
          message: 'Paste the public GitHub repository URL:',
          validate: (val) => val.trim().length > 0 ? true : 'Please enter a valid URL'
        }
      ]);
      await scanGithubRepo(repoUrl.trim());
      break;
  }
}

async function main() {
  program
    .name('noleaks')
    .description('Node.js CLI tool for detecting leaked secrets and validating environment files')
    .version(VERSION);
  
  program.parse(process.argv);
  
  if (process.argv.length <= 2) {
    await showBanner();
    await promptMenu();
  } else {
    console.log(chalk.yellow('Please run noleaks without arguments for the interactive menu.'));
  }
}

main().catch(err => {
  console.error(chalk.red('\nAn unexpected error occurred:'), err);
  process.exit(1);
});
