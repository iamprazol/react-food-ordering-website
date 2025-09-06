# Contributing to React Food Ordering Website

First of all, thank you for considering contributing to this project! 🎉
Your help is greatly appreciated and will make the project better for everyone.

---

## 🛠 Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/iamprazol/react-food-ordering-website.git
   cd react-food-ordering-website
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run start
   ```

---

## 📂 Project Structure

```
react-food-ordering-website/
├── public/             # Static files
├── src/                # Application source code
│   ├── app/     		# App-level setup ( routing )
│   ├── context/        # Global state (e.g. Cart, Auth)
│   ├── features/     	# Domain-driven feature modules (e.g., cart, auth, menu)
│   ├── pages/          # Page-level components
│   ├── shared/     	# Reusable utilities, helpers, constants
│   ├── widgets/        # UI building blocks
│   ├── index.scss      # Global styles
│   └── index.js        # Entry point
├── webpack/            # Webpack configs
├── .env                # Environment variables
├── package.json
└── README.md
```

---

## ✅ Contribution Guidelines

- Follow the **existing folder structure**.
- Write **clear and descriptive commit messages**.
- Use **Prettier/ESLint** for code formatting (`npm run lint`).
- Document new features and components when necessary.
- Open an issue before starting on **large changes**.

---

## 🌱 Branching Model

- `master` → always contains production-ready code.
- Feature branches:
  ```bash
  git checkout -b feature/your-feature-name
  ```
- Bugfix branches:
  ```bash
  git checkout -b fix/issue-name
  ```

---

## 🔄 Submitting Changes

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add: short description of your change"
   ```
2. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
3. Open a **Pull Request** against the `develop` branch.
4. Request a review.

---

## 🙌 Code of Conduct

Please note that this project follows a **Code of Conduct**:
- Be respectful and inclusive.
- Provide constructive feedback.
- Help foster a positive environment.

---

## 💡 Questions?

If you have any questions or need clarification:
- Open an **issue** on GitHub.
- Or start a **discussion** in the repo.

---

We’re excited to see your contributions 🚀
Thank you for helping improve the React Food Ordering Website! 💙
