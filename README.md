# 📊 Dashboard UI

A responsive dashboard layout built with **Next.js**, **React**, and **TailwindCSS**, featuring a metrics grid, projections chart, and a right sidebar for notifications, activities, and contacts.

## ✨ Features

* **Metrics Grid**

  * Responsive: 1 col (xs), 2 cols (sm), 4 cols (lg).
  * Each card shows a metric value with positive/negative delta indicators (`TrendingUp` / `TrendingDown` from lucide-react).
  * Special background highlight for certain indices.

* **Projections Chart**

  * Lazy-loaded with `React.Suspense`.
  * Shown below metrics on small screens.
  * On larger screens, aligned alongside the metrics.

* **Right Sidebar**

  * Contains Notifications, Activities, and Contacts.
  * Uses a unified `Avatar` component (photo or `UserCircle` fallback).
  * On **desktop (md+)**: visible as a fixed-width column (`w-72`), pushing the main content.
  * On **mobile**: hidden by default (can be converted into an overlay drawer if needed).

* **Theming**

  * Light/Dark/System themes managed via `ThemeContext`.
  * Exposes `themeStyles` with `background`, `card`, `text`, `muted`, and `border` classes.
  * Easily extendable with `accent`, `iconBg`, `iconText`, etc.
  * Supports OS-level preference syncing.

* **Icons**

  * [lucide-react](https://lucide.dev/) for clean, lightweight SVG icons.
  * Icons auto-invert on dark mode if needed (using Tailwind `dark:invert`).

---

## 📂 Project Structure

```
components/
  ├─ MetricCard.tsx        # Individual metric card
  ├─ RightSidebar.tsx      # Notifications, Activities, Contacts
  ├─ DropDownNav.tsx       # Sidebar navigation link w/ dropdown support
  ├─ OrderList.tsx         # Table with avatars, statuses, pagination
  └─ ...
context/
  └─ ThemeContext.tsx      # Theme provider + themeStyles
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 2. Run the dev server

```bash
pnpm dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

---

## 🎨 Theming

Update `ThemeContext.tsx` to customize theme colors:

```ts
const themeStyles =
  resolvedTheme === "dark"
    ? {
        background: "bg-gray-900",
        card: "bg-gray-800",
        text: "text-white",
        muted: "text-gray-400",
        border: "border-gray-700",
        accent: "bg-sky-500", // optional
      }
    : {
        background: "bg-gray-100",
        card: "bg-white",
        text: "text-gray-900",
        muted: "text-gray-500",
        border: "border-gray-200",
        accent: "bg-indigo-500",
      };
```

---

## 📦 External APIs

* **Avatars**: Uses [i.pravatar.cc](https://i.pravatar.cc) for placeholder profile images.

  * Add to `next.config.js`:

    ```js
    images: {
      domains: ["i.pravatar.cc", "randomuser.me", "picsum.photos"],
    }
    ```

---

## 🛠 Future Improvements

* [ ] Mobile overlay drawer for RightSidebar
* [ ] Add filter/sort controls to `OrderList`
* [ ] Configurable accent colors from theme
* [ ] Integrate real chart data

---

## 🧑‍💻 Tech Stack

* **Next.js 14+**
* **React 18+**
* **TailwindCSS**
* **lucide-react** for icons

---
