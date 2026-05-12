<div align="center">
  <h1>🔒 noleaks</h1>
  <p><strong>No secrets. No leaks. No stress.</strong></p>
  <p>A beautifully simple, interactive Node.js CLI tool for detecting leaked secrets, scanning git history, and validating environment files before they become a problem.</p>
  
  ![npm](https://img.shields.io/npm/v/noleaks)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

---

## ⚡️ What is it?

Accidentally pushing a `.env` file or leaking an API key is every developer's nightmare. `noleaks` gives you an interactive, zero-configuration menu to:
- Compare your `.env` against `.env.example` to find missing or extra keys.
- Scan for high-risk patterns like AWS Access Keys, GitHub Tokens, Stripe Keys, and RSA Private Keys.
- Dig through your Git history to see if a `.env` file was ever committed.
- Automatically fix issues (e.g., adding `.env` to `.gitignore`, scaffolding `.env.example`).

📦 npm → [https://lnkd.in/gD6GvpV7](https://www.npmjs.com/package/noleaks)


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

When you run `noleaks` in your terminal, you'll be greeted with a slick, bold ASCII banner and a numbered matrix menu. No need to memorize complex CLI flags!

```text
  1) Validate .env             2) Scan secrets             3) Audit Git history
  4) Auto-remediate issues     5) Scaffold .env.example    6) Exit
  7) 🌐 Scan public GitHub URL
  
✔ What do you want to do? (1-7):
```

## ✨ Features Explained

**Understanding `.env` vs `.env.example`:**
Think of your code like a locked house. Your `.env` file holds the **real keys** (passwords, API keys) and should *never* be uploaded to GitHub. Your `.env.example` file holds the **empty keyring** (blank passwords) so other developers know what keys they need to create to run your code.

- **1) Validate .env**: Compares your `.env` file against your `.env.example` file. If you added a new password to `.env` but forgot to add a blank placeholder for it in `.env.example`, it will warn you to fix it so your code doesn't crash for other developers!
- **2) Scan secrets**: Checks your local `.env` file for highly sensitive patterns (like AWS Access Keys, Stripe Keys, or GitHub tokens) to ensure you aren't accidentally exposing real secrets.
- **3) Audit Git history**: Even if you delete an accidentally committed `.env` file, it still lives in your Git history! This runs a deep search through all your past commits to see if a `.env` file was ever leaked.
- **4) Auto-remediate issues**: The magic button. It instantly adds `.env` to your `.gitignore` file (making it impossible to push to GitHub), and automatically generates a safe, blank `.env.example` file based on your real variables.
- **5) Scaffold .env.example**: If you are starting a brand new project and don't have an example file, this generates a clean, empty template for you instantly.
- **7) Scan public GitHub URL**: Paste any public GitHub link, and it will securely download the code into a hidden temporary folder, scan every single file for leaked passwords, and then delete the downloaded code completely so it leaves zero trace on your computer!
- **Zero Config**: No JSON or YAML config files required. Just run it.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/noleaks/issues).

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.
