# MathVista — Interactive Visual Math Learning Platform

> A free, lightweight, and responsive interactive math learning platform built with **pure HTML, CSS, and Vanilla JavaScript**. No frameworks. No build tools. No accounts required.

![MathVista Screenshot](logo.png)

---

## 🌐 Live Preview

Open `index.html` directly in your browser — no server needed.

---

## 📖 About

**MathVista** is an educational web platform designed to help students understand mathematics through **interactive visualization and computation**. Inspired by tools like Desmos and WolframAlpha, but purposefully simplified and lightweight — it runs entirely in the browser with no backend.

### Who It's For

- 🏫 Middle school students
- 🎓 High school students
- 🎓 University / college students
- 👨‍🏫 Teachers looking for a quick demo tool

---

## ✨ Features

### 🔢 Calculators

| Tool                       | Description                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Function Graph**         | Plot any f(x) with interactive zoom & pan via Plotly.js                                                       |
| **Derivative**             | Compute f'(x) symbolically, visualize tangent line with a draggable slider                                    |
| **Integral**               | Definite (numerical, Simpson's rule) & indefinite (pattern-matched) integrals with shaded area                |
| **Sigma / Summation**      | Evaluate Σ notation, visualize each term and cumulative sum as a bar chart                                    |
| **Descriptive Statistics** | Full stat analysis: mean, median, mode, std dev, variance, quartiles, skewness, kurtosis, histogram, box plot |
| **Mean / Median / Mode**   | Central tendency calculator with dot-plot visualization                                                       |
| **Standard Deviation**     | Population & sample std dev with step-by-step breakdown                                                       |
| **Variance**               | Population & sample variance with squared deviation visualization                                             |

### 🌍 Language Support (Localization)

- **Default language: Indonesian (Bahasa Indonesia)**
- Language toggle button (`ID` / `EN`) in the top header on all pages
- User preference saved to `localStorage` — persists across page reloads
- Uses `data-i18n` attribute system driven by `js/i18n.js`

### 🎨 UI / UX

- Dark theme, mobile-first, fully responsive
- Clean, readable design — reduced shadows and gradients for clarity
- Smooth micro-animations (fadeIn, stagger, scale)
- Sticky header with scroll-aware shadow
- Accessible: semantic HTML5, ARIA labels, focus outlines, keyboard navigation

### 📈 Visualization

- Powered by **Plotly.js** (CDN) — interactive zoom, pan, hover tooltips
- Dark-themed graphs consistent with app design
- Responsive graph resizing on window resize

---

## 🗂️ Project Structure

```
visual_math/
├── index.html                          # Landing page
├── logo.png                            # MathVista logo
│
├── css/
│   ├── main.css                        # Design tokens, typography, global styles, animations
│   ├── layout.css                      # Header, nav, footer, page layout, hero, responsive
│   └── calculator.css                  # Calculator UI, cards, forms, graphs, result displays
│
├── js/
│   ├── i18n.js                         # Localization engine (ID ↔ EN), localStorage preference
│   ├── app.js                          # Global UI: scroll header, mobile nav, dropdown, FAQ, tabs, toasts
│   ├── math-engine.js                  # Core math: evaluate, derivative (Math.js), integration (Simpson), sigma
│   ├── graph-engine.js                 # Plotly.js wrapper: function graph, derivative+tangent, integral area, sigma bar, histogram, box plot
│   └── statistics.js                   # Descriptive stats: mean/median/mode/variance/std dev/quartiles/skewness/kurtosis
│
└── pages/
    ├── function-graph-calculator.html
    ├── derivative-calculator.html
    ├── integral-calculator.html
    ├── sigma-calculator.html
    ├── statistics-calculator.html
    ├── mean-median-mode-calculator.html
    ├── standard-deviation-calculator.html
    └── variance-calculator.html
```

---

## 🛠️ Tech Stack

| Technology                        | Role                                         | Source |
| --------------------------------- | -------------------------------------------- | ------ |
| **HTML5**                         | Structure & semantics                        | —      |
| **CSS3** (Vanilla)                | Styling, layout, animations                  | —      |
| **JavaScript ES6+**               | Logic, computation, UI                       | —      |
| **Math.js v12**                   | Symbolic differentiation, expression parsing | CDN    |
| **Plotly.js v2.27**               | Interactive graph rendering                  | CDN    |
| **Inter** (Google Fonts)          | Primary font                                 | CDN    |
| **JetBrains Mono** (Google Fonts) | Monospace font for formulas                  | CDN    |

> ⚠️ **Internet connection required** to load CDN libraries (Math.js, Plotly.js, Google Fonts). The app itself runs offline if these are cached.

---

## 🚀 Getting Started

### Option 1 — Direct Browser Open

```bash
# Just open the file:
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

### Option 2 — Local HTTP Server (Recommended)

Some browsers restrict local file access. Use a simple server:

```bash
# Python (built-in)
python -m http.server 8080

# Node.js (npx)
npx serve .

# VS Code
# Install "Live Server" extension → right-click index.html → "Open with Live Server"
```

Then open `http://localhost:8080` in your browser.

---

## ⚙️ How It Works

### Math Engine (`js/math-engine.js`)

- Uses **Math.js** for expression parsing and symbolic differentiation (`math.derivative()`)
- Derivatives computed symbolically, then simplified and formatted
- Numerical integration via **composite Simpson's rule** (1000 sub-intervals)
- Indefinite integration via **pattern matching** (covers common forms: polynomials, trig, exp, log)
- Sigma summation via direct iterative evaluation

### Graph Engine (`js/graph-engine.js`)

- Thin wrapper around **Plotly.js** providing consistent dark-themed graph defaults
- Each calculator calls the relevant `GraphEngine.*` function
- Supports: function curves, derivative + tangent line overlay, integral shaded area, sigma bar charts, histograms with normal curve overlay, box plots

### i18n Engine (`js/i18n.js`)

- Translation dictionary object with `id` (Indonesian) and `en` (English) keys
- On page load, reads `lang` from `localStorage` (defaults to `'id'`)
- Translates all elements with `data-i18n="key"` attribute via `textContent` replacement
- Lang toggle button calls `I18n.toggle()` → switches lang, saves to `localStorage`, re-applies translations

---

## ⚠️ Known Limitations & Caveats

> The following are known issues and areas actively under development.

### 🔴 Localization (i18n) — Partially Implemented

- The localization system (`data-i18n` attributes + `js/i18n.js`) is **not uniformly applied across all pages**.
- The `index.html` landing page has the most complete i18n coverage.
- Calculator pages (`pages/*.html`) have partial coverage — primarily hero, breadcrumb, panel titles, labels, and primary buttons. Many secondary UI strings (explanation sections, FAQ, result labels, step-by-step breakdowns, chart titles) remain in English regardless of language setting.
- The `data-i18n-option` approach for `<select>` options is defined but may not be connected in all pages.
- **Status: 🔧 On Development**

### 🟡 Indefinite Integration

- Indefinite integral computation uses a **limited pattern-matching** approach, not a full symbolic CAS.
- Only covers common forms: `x^n`, `sin(x)`, `cos(x)`, `e^x`, `1/x`, `tan(x)`.
- Complex expressions (nested, products, rational functions) will return a fallback message.

### 🟡 Mobile Navigation Links on Calculator Pages

- Some mobile nav links on calculator sub-pages (`pages/`) may use incorrect relative paths (`pages/...` instead of relative sibling paths), causing 404s on mobile nav.
- **Workaround:** Use the desktop dropdown or breadcrumb links.

### 🟡 No Offline Support

- No Service Worker / PWA configuration.
- Math.js and Plotly.js are loaded from CDN — if CDN is unreachable and not cached, calculators will not function.

### 🟡 No Error Boundaries for Edge Cases

- Expressions with division by zero, undefined math functions, or very large exponents may produce `Infinity`, `NaN`, or gaps in graphs without user-friendly error messages in all cases.

### 🟡 Derivative Formatting

- Derivative expressions are returned as raw Math.js tree-to-string output (e.g., `3 * x ^ 2 + -1`).
- Formatting/simplification is basic — no LaTeX rendering.

### 🟡 SEO — Calculator Pages

- Calculator sub-pages have meta descriptions referencing "VisualMath" (old brand name) in some places, though updated to "MathVista" in titles.
- No sitemap.xml or robots.txt provided.

### 🟡 Accessibility

- Plotly.js graphs are not fully accessible for screen readers (no alternative text descriptions of graph data).
- Some dynamic content injected via JavaScript may not announce properly to assistive technology.

---

## 🛣️ Roadmap / Planned Improvements

- [ ] Complete i18n coverage across all 8 calculator pages (all text elements)
- [ ] LaTeX rendering for derivative and integral expressions (KaTeX)
- [ ] PWA / offline support (Service Worker + manifest)
- [ ] Matrix calculator
- [ ] Probability calculator (binomial, normal, Poisson distributions)
- [ ] Vector calculator
- [ ] Fix relative path issues in mobile nav on calculator sub-pages
- [ ] Add `sitemap.xml` and `robots.txt`
- [ ] Unit tests for `math-engine.js` and `statistics.js`
- [ ] Dark/light theme toggle

---

## 🎨 Design System

| Token          | Value            |
| -------------- | ---------------- |
| Primary BG     | `#0b0f1a`        |
| Secondary BG   | `#111827`        |
| Card BG        | `#161d2e`        |
| Accent Primary | `#3b82f6` (blue) |
| Accent Light   | `#60a5fa`        |
| Text Primary   | `#f1f5f9`        |
| Font Primary   | Inter            |
| Font Mono      | JetBrains Mono   |

---

## 📄 License

This project is open source and free to use for educational purposes.

---

## 👤 Author

Built as an independent mini-project for learning and educational exploration.

> _"Dibuat untuk pelajar yang ingin memahami, bukan sekadar menghitung."_
> _"Built for students who want to understand, not just compute."_
