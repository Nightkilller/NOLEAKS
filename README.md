<div align="center">
  <h1>🔒 noleaks</h1>
  <p><strong>No secrets. No leaks. No stress.</strong></p>
  <p>A beautifully simple, interactive Node.js CLI tool for detecting leaked secrets, scanning git history, and validating environment files before they become a problem.</p>
  
  [![npm version](https://badge.fury.io/js/noleaks.svg)](https://badge.fury.io/js/noleaks)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

---

## ⚡️ What is it?

Accidentally pushing a `.env` file or leaking an API key is every developer's nightmare. `noleaks` gives you an interactive, zero-configuration menu to:
- Compare your `.env` against `.env.example` to find missing or extra keys.
- Scan for high-risk patterns like AWS Access Keys, GitHub Tokens, Stripe Keys, and RSA Private Keys.
- Dig through your Git history to see if a `.env` file was ever committed.
- Automatically fix issues (e.g., adding `.env` to `.gitignore`, scaffolding `.env.example`).

## 🚀 Getting Started

You can run `noleaks` directly via `npx` without even installing it:

```bash
npx noleaks
```

Or install it globally to have it handy on your system:

```bash
npm install -g noleaks
noleaks
```

## 🛠️ Interactive Menu

When you run `noleaks` in your terminal, you'll be greeted with a slick ASCII banner and an arrow-key navigable menu. No need to memorize complex CLI flags!

```text
? What do you want to do?
❯ 🔍 Check .env vs .env.example
  🚨 Scan for secret patterns  
  📜 Scan Git history
  🛠️  Fix issues automatically
  📄 Generate .env.example
  🚪 Exit
```

## ✨ Features

- **Check `.env` vs `.env.example`**: Ensures your local environment is up-to-date and no required keys are left blank.
- **Scan for Secret Patterns**: Uses highly accurate RegEx to catch leaked `AKIA...`, `ghp_...`, `sk_live_...`, and more.
- **Scan Git History**: Runs native git commands to find out if you ever accidentally committed your secrets in the past.
- **Fix Issues Automatically**: With one click, it will add `.env` to your `.gitignore` and generate a sanitized `.env.example` template based on your current setup.
- **Zero Config**: No JSON or YAML config files required. Just run it.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/noleaks/issues).

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.
