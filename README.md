# Contributing to FLi-Guide

Welcome, and thank you for your interest in contributing to **FLi-Guide**, an online guide for Fantasy Life i: The Girl Who Steals Time! This website is actively maintained and live, so contributions must follow specific guidelines to ensure stability and quality.

## 💡 Getting Started

1. **Fork the repository** and clone it to your machine.
2. From the `dev-branch`, create a new branch
   - Name your branch based on what you're working on.
   - Ex:  git checkout -b Adding-Paladin-Ranks
3. This will now be the branch that you work from.
4. Make your changes in either fli-guide-react/ or fli-guide-backend/
5. When you're done, submit a pull request with a clear and descriptive summary of your changes.

## 🐳 Running FLi-Guide with Docker

If you don't wish to juggle running the two repos separately, you can use Docker to run them for you

### 📦 Prerequisites
   - [Docker](/https://www.docker.com/)
   - [Docker Compose](https://docs.docker.com/compose/)

### 🚀 Quick Start
From the root project directory:

```
docker-compose up --build
```
This will:
- Build and start the React frontend on http://localhost:5173
- Start the Node.js/Express backend on http://localhost:5000
- Start a MySQL 8 database on port 3307 (mapped to container's 3306)
- Seed the database with information the website needs to function correctly

### ⚙️ Environment Configuration
The backend expects environment variables for database connection. A template file is included. Simply run the following command in your terminal:
```
cp fli-guide-backend/.env.example fli-guide-backend/.env
```
Then edit the .env file as needed. Default values are already used in docker-compose.yml, so you can get started immediately.

### 📁 fli-guide-backend/.env.example:
```
DB_HOST=db
DB_USER=user
DB_PASSWORD=password
DB_NAME=fli_db
DB_PORT=3306
DB_DIALECT=mysql
```
💡 You don’t need to edit this unless you want to override the defaults.

### 🧹 Stopping and Cleaning Up
To stop the containers:
```
docker-compose down
```
To also remove volumes (like the MySQL data):
```
docker-compose down -v
```

## 📦 Migrations

We use **[Sequelize CLI](https://sequelize.org/docs/v6/other-topics/migrations/)** to manage the `fli_db` database schema in a consistent, version-controlled way. This ensures that **all contributors are working with the same structure** and can apply updates reliably across development and production environments.

### ⚠️ Important

> **Do not manually create or modify tables directly in the database** (e.g., through MySQL Workbench or phpMyAdmin).  
> All schema changes should go through Sequelize migrations to ensure the whole team stays in sync.

### 📌 Why We Use Migrations

- Enables reproducible changes across environments.
- Mitigates issues cause by manually changing data
- Allows teams to collaborate on database updates safely.

---

### 🗃️ Keeping Your Database Up to Date
To make sure your local database schema is current after pulling, run:

```bash
npm run migrate
npm run seed
```
This will apply any new migrations and seed data.

If you're having issues or want to reset everything from scratch, run:
```
npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
⚠️ This will erase all existing data in the database.

## ⚠️ Important Notes for Live Website

- The `main` branch powers the live site.
- All development happens on `dev-branch`
- **Never commit directly to `main`.** — safeguards are in place, but always verify your branch before working.
- Pull Requests will be reviewed before being merged to prevent breaking the live site.

## ✅ What You Can Contribute

We welcome contributions such as:

- New or updated game guide content (quests, crafting, drop info, etc.)
- Layout or UI improvements
- Bug fixes or performance optimizations
- Accessibility or mobile responsiveness
- Better documentation
- New features or enhancements

## 🚫 What You Should Avoid

- Submitting copyrighted material
- Changing the structure or style of the site without discussion
- Including personal or sensitive information
- Modifying another contributor’s work without permission
- Submitting incomplete or untested code

## 🧪 Testing

Before submitting your pull request, please ensure:
- Pages render correctly in the browser
- Code is clean, consistent, and understandable
- Everything works as expected (no console errors)
- You've tested both frontend and backend if applicable

## 📦 Adding packages

Need a package to help with your contribution?

- You're welcome to add it — just explain what it does in Discord
- Use trusted, reputable sources only
- Keep the bundle size in mind for frontend additions

## ✍️ Style Guide

- Follow existing coding conventions.
- Maintain consistent naming for variables, files, and branches.
- This project does support MUI, so you are free to use that for styling. Else standard CSS works.

## 📁 File Naming and Structure

### Front end
- [pages](../fli-guide-react/src/pages/) is where the main component of your contribution should go.
- [components](../fli-guide-react/src/components/) is where any supporting/child components go.
- Data files should go in `/src/data/`.
- You may create subfolders to stay organized, but:
   - Use clear, descriptive names so others can easily understand their purpose.
   - Avoid vague or temporary naming (e.g., `stuff`, `test`, `newfolder`).

## 🔄 Syncing Your Fork

To keep your fork up to date with the original repo:

```bash
git remote add upstream https://github.com/TiaMarieG/fli-guide-v3.git
git fetch upstream
git checkout dev-branch
git merge upstream/dev-branch
```

## 🗨️ Questions or Suggestions?

Feel free to reach out to me on discord. I'll answer as soon as possible.

## Thanks for helping make the site a better resource for everyone! 👾