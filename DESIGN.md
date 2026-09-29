# Mock Test Platform — Design System & UI/UX Guidelines (`DESIGN.md`)

This document defines the visual design system, typography, color token architecture, component layouts, and UX patterns for the **Mock Test Platform**.

---

## 1. Visual Philosophy & Design Core

The design philosophy balances **Academic Focus** with **Modern EdTech Aesthetics**.

- **Focus & Anti-Distraction**: The exam testing engine uses high contrast, minimal noise, and strict layout boundaries to simulate real examination conditions (JEE, NEET, CAT).
- **Subtle Modern Sophistication**: The landing pages and student dashboard utilize sleek glassmorphism (`backdrop-filter`), rich gradients, soft shadow layers, and fluid micro-animations (Framer Motion).
- **Math Precision**: Mathematical and scientific formulas are rendered using crisp SVG and vector typography via **KaTeX** and **MathLive**.

---

## 2. Color Token Architecture

The design system uses CSS variable tokens mapped into Tailwind CSS `@theme` rules (`globals.css`).

### Primary & Accent Palette

| Token | Hex Code | Usage |
| :--- | :--- | :--- |
| `--color-primary` | `#4a40e0` | Main Brand Accent, Primary Buttons, Active Tabs |
| `--color-secondary` | `#702ae1` | Secondary Actions, Gradient Highlights |
| `--color-tertiary` | `#006947` | Success States, Verified Badges |
| `--color-primary-container` | `#9795ff` | Highlight Backgrounds, Active Item Filters |
| `--color-secondary-container` | `#dcc9ff` | Subtle Lavender Badges |

### Surface & Background Tokens

| Token | Hex Code | Visual Description |
| :--- | :--- | :--- |
| `--color-background` | `#f4f6ff` | Soft Ice Blue-Gray Page Background |
| `--color-surface-container-lowest` | `#ffffff` | Pure White Surface Cards & Panels |
| `--color-surface-container` | `#e3e8f7` | Low-contrast Container Borders |
| `--color-on-surface` | `#2a2f38` | Dark Charcoal High-contrast Body Text |
| `--color-on-surface-variant` | `#575c66` | Medium Gray Subtitles & Labels |

---

### Question Status Indicators (Exam Engine Palette)

In the real-time test interface, question status colors follow strict standardized color cues:

| Status State | Color | Hex Code | Visual Indicator |
| :--- | :--- | :--- | :--- |
| **Answered** | Emerald Green | `#10b981` | Solid Green Circle with White Number |
| **Unanswered** | Rose Red | `#f43f5e` | Solid Red Circle with White Number |
| **Marked for Review** | Purple Violet | `#8b5cf6` | Solid Purple Circle with White Number |
| **Answered & Marked** | Indigo Badge | `#6366f1` | Solid Indigo Circle with Small Checkmark Icon |
| **Not Visited** | Slate Gray | `#e2e8f0` | Outline Gray Box with Dark Text |

---

## 3. Typography & Font Hierarchy

### Font Families
- **Headline Font**: `"Plus Jakarta Sans", sans-serif` (Clean, geometric, authoritative sans-serif for headings and display cards).
- **Body Font**: `"Manrope", sans-serif` (Highly legible sans-serif optimized for long reading passages and multi-choice options).
- **Math & LaTeX Font**: KaTeX font stack (`#1e293b` high contrast dark text enforced in `math-field` elements).

### Type Scale Matrix

| Scale Level | Font Family | Size | Weight | Line Height |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | Plus Jakarta Sans | `36px - 48px` | `800 (ExtraBold)` | `1.2` |
| **Section H1** | Plus Jakarta Sans | `28px - 32px` | `700 (Bold)` | `1.25` |
| **Card Header H2** | Plus Jakarta Sans | `20px - 24px` | `600 (SemiBold)` | `1.3` |
| **Question Text** | Manrope | `16px - 18px` | `500 (Medium)` | `1.6` |
| **Option Radio Label** | Manrope | `14px - 16px` | `400 (Regular)` | `1.5` |
| **Small Caption / Timer** | Manrope / Mono | `12px - 14px` | `600 (SemiBold)` | `1.4` |

---

## 4. Component Layout Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        EXAM INTERFACE LAYOUT GRID                      │
├──────────────────────────────────────────┬─────────────────────────────┤
│ [Header Bar] Test Title  │  Section Tabs  │  Timer Pill (02:45:00)     │
├──────────────────────────────────────────┼─────────────────────────────┤
│                                          │ [Question Palette Sidebar]  │
│ [Question Area - 75% Width]              │                             │
│ Q1. Calculate integral \int x^2 dx       │  🟢 1   🔴 2   🟣 3   ⚪ 4   │
│                                          │  ⚪ 5   ⚪ 6   ⚪ 7   ⚪ 8   │
│ (A) \frac{x^3}{3} + C                    │  ...                        │
│ (B) x^3 + C                              │                             │
│ (C) 2x + C                               │                             │
│                                          │ [Status Legend]             │
├──────────────────────────────────────────┴─────────────────────────────┤
│ [Footer Action Bar]  Clear | Mark for Review | Save & Next | Submit    │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Main Navigation Header (`/app/layout.tsx`)
- Position: Sticky Top (`sticky top-0 z-50`).
- Surface: Glassmorphic White (`bg-white/80 backdrop-blur-md border-b border-slate-200/80`).
- Features: Brand Logo, Exam Category Navigation Pills, User Profile Pill.

### 2. Real-Time Exam Engine (`ExamInterface.js`)
- **Fullscreen Layout**: Removes external headers and sidebars to eliminate distraction.
- **Timer Pill**: Prominent SVG Clock Icon with live countdown timer text. Flashes red when `< 5 minutes` remain.
- **Question Stem & Formula Box**: Styled with subtle gray border (`border-slate-200`) and white card background.
- **Option Selector Component**: Radio options enclosed in hoverable rounded containers (`hover:border-indigo-500 hover:bg-indigo-50/30 transition-all`).

### 3. Analytics Dashboard & Charts (`AnalyticsDashboard.js`)
- **Score Metrics Header**: 4-column stat card layout with gradient backgrounds and Lucide icons.
- **Recharts Integration**: Subject-wise accuracy breakdown rendered as responsive bar charts (`ResponsiveContainer`) with custom tooltips.

### 4. Admin Multi-Modal Interfaces (`AdminDashboard.js`)
- **Backdrop Overlay**: `bg-slate-900/60 backdrop-blur-sm`.
- **AI PDF Importer Modal (`GeminiPdfUploadModal.js`)**: Split-screen preview showing original PDF page on left and editable extracted questions JSON on right.

---

## 5. Micro-Interactions & Custom Scrollbars

- **Smooth Scrolling**: Enforced globally on `html { scroll-behavior: smooth; }`.
- **Custom Apex Scrollbars (`.apex-scrollbar`)**:
  - Track: Transparent background.
  - Thumb: Light slate gray (`#e2e8f0`) transitioning to vibrant indigo (`#6366f1`) on hover.
  - Width: Narrow 6px for non-intrusive UI.
- **Touch & Mobile Pan Handling**: `.touch-pan-y` utility applied to scrollable viewports on mobile devices to prevent touch conflict during exam navigation.

---

## 6. Accessibility & Responsiveness

- **WCAG AA Compliance**: High-contrast text colors against surface backgrounds (`#2a2f38` body text on `#ffffff` surface).
- **Keyboard Shortcuts in Exam Interface**:
  - `Key 1-4`: Select Options A-D.
  - `S` or `Enter`: Save & Next.
  - `M`: Mark for Review & Next.
  - `C`: Clear Response.
- **Responsive Breakpoints**:
  - `sm: 640px` (Mobile optimized layout).
  - `md: 768px` (Tablet view with collapsible palette drawer).
  - `lg: 1024px+` (Full split-screen exam workspace).
