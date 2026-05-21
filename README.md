# Potens Frontend Internship Assignment – Civic Resolve PWA

![React](https://img.shields.io/badge/React-19.0+-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0+-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0+-0055FF?logo=framer&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa&logoColor=white)

A mobile-first, multilingual Progressive Web Application (PWA) designed for reporting civic issues. Built as part of the Potens frontend internship assignment, this project focuses heavily on **product thinking, resilient UX, performance under slow network conditions, and accessibility**.

## 🔗 Live Demo & Walkthrough

- **Live Application:** [Deploy Link Placeholder](#)
- **Loom Walkthrough:** [Loom Video Placeholder](#)

## 📸 Screenshots

<p align="center">
  <img src="public/screenshot-2.png" alt="Category Selection" width="30%">
  <img src="public/screenshot-1.png" alt="Issue Details" width="30%">
  <img src="public/screenshot-3.png" alt="Confirmation Timeline" width="30%">
</p>

## ✨ Core Features

- **Progressive Web App (PWA):** Fully installable on mobile and desktop, complete with custom manifest, service workers, and an active `beforeinstallprompt` interception for an elegant install banner.
- **Bilingual Interface:** Real-time, instant toggling between English and Hindi.
- **Native Voice Dictation:** Integration with the Web Speech API for live, hands-free issue description transcription that respects the active language setting (`en-IN` / `hi-IN`).
- **Tactile Micro-interactions:** Premium, grounded animations using Framer Motion (e.g., physical key-press effects instead of playful bouncy scaling).
- **Persistent Local State:** Form state and reference IDs are preserved via `localStorage`.

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI Library |
| **Vite** | Build Tool & Dev Server |
| **Tailwind CSS v4** | Utility-first styling & design tokens |
| **Framer Motion** | Complex route transitions & micro-interactions |
| **i18next** | Scalable internationalization (i18n) |
| **vite-plugin-pwa** | Service worker generation and offline caching |
| **Lucide React** | Scalable, consistent SVG iconography |

## 📂 Folder Structure

```text
src/
├── components/       # Reusable UI elements (VoiceInput, PageSkeleton, InstallPrompt)
├── layouts/          # Wrapper components (MainLayout with Glassmorphism header)
├── pages/            # Route-level components (CategorySelection, IssueDetails, etc.)
├── i18n.js           # Localization configuration and translation dictionaries
├── App.jsx           # App routing with React.lazy and Suspense boundaries
├── index.css         # Tailwind v4 entry and root CSS variables
└── main.jsx          # React DOM mounting
```

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Prabhat-16/potens-intern-frontend-prabhat-mishra.git
   cd potens-intern-frontend-prabhat-mishra
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

## 📱 PWA & Offline Optimization

The application utilizes `vite-plugin-pwa` with a customized Workbox configuration to aggressively cache static assets (`**/*.{js,css,html,ico,png,svg}`). 
- **Manifest:** Handled automatically, configuring `display: 'standalone'` for a native app feel.
- **Icons:** Created a scalable SVG and programmatically generated standard 192x192 and 512x512 PNG assets using `sharp`.
- **Install Prompt:** The default browser mini-infobar is intercepted on mobile to display a clean, contextual "Install Civic Resolve" banner.

## 🌍 Multilingual Support

Implemented `react-i18next` for seamless language toggling. 
- All hardcoded strings—including labels, placeholders, fallback error alerts, and temporal text like "Just now"—are abstracted into centralized dictionary objects.
- The voice dictation API dynamically listens to the `i18n.language` state to switch between English and Hindi NLP engines.

## ⚡ Performance Optimizations

Optimized specifically for **Chrome DevTools Slow 3G throttling** to ensure high Lighthouse scores:
- **Code Splitting:** Applied `React.lazy()` for route-level chunking. Users only download the specific Javascript for the screen they are viewing (chunks weigh ~3kb to 6kb each).
- **Skeleton Loading:** Used a `<Suspense>` fallback with an `animate-pulse` layout skeleton that precisely mimics the structural dimensions of the incoming page. This completely eliminates **Cumulative Layout Shift (CLS)**.
- **Lightweight Assets:** Strict reliance on SVG icons and CSS-based shadows rather than heavy raster images.

## ♿ Accessibility Considerations

- **Semantic HTML:** Proper use of `<header>`, `<main>`, `<form>`, and heading hierarchies (`h1`, `h2`, `h3`).
- **High Contrast:** Chose a deep `zinc-900` text on `#FBFBFC` off-white background to exceed WCAG AA contrast ratios.
- **Focus States:** Custom `focus:ring-zinc-900/5` applied to all interactive elements to ensure keyboard navigability without sacrificing aesthetics.

## 🎨 Design Decisions

The aesthetic deviates from typical playful consumer apps, aiming for a **"Civic-Tech Professional"** look inspired by platforms like Linear and Vercel.
- **Colors:** Avoided loud, generic "startup blues" and saturated warning colors. Utilized a restrained, monochromatic `zinc` palette with subtle opacity modifiers (e.g., `border-zinc-200/80`) to make borders feel drawn with a fine-tip pen.
- **Tactile Uniformity:** Replaced generic `scale` hover bounces with a grounded physical press animation (`y: 1, scale: 0.995`, accompanied by a tightened shadow and background shift) to make the UI feel robust.
- **Glassmorphism:** Applied `backdrop-blur-md` to the sticky header to maintain context while scrolling through long forms.

## ⚖️ Tradeoffs & Limitations

- **Backend Sync:** Due to the scope of a frontend assignment, data is persisted locally via `localStorage` rather than a remote database. In a production scenario, this would be replaced with IndexedDB for background sync when the device reconnects to a network.
- **Web Speech API:** The dictation feature relies on the native browser API, which varies in accuracy across different browsers and requires an active internet connection on some mobile operating systems.
- **Location API:** Currently accepts manual string input for location. A production app would request GPS permissions and reverse-geocode the coordinates using Mapbox or Google Maps.

## 🛣️ Future Improvements

- Migrate state management to a robust solution like Zustand or Redux Toolkit.
- Implement proper offline-first background sync using Workbox BackgroundSync.
- Add camera integration for live photo capture directly within the browser using `MediaDevices.getUserMedia()`.

## 🤖 AI Use Log

During development, AI (Google Deepmind's Gemini) was utilized responsibly to:
- Generate Hindi translation mappings for the UI dictionary.
- Scaffold the baseline configuration for `vite-plugin-pwa` and Workbox caching.
- Write a Node.js `sharp` script to rapidly downscale SVG vectors into correct PNG dimensions for the web manifest.

## 📝 Commit Philosophy

I followed a standard conventional commits structure to ensure the project history is readable and atomic:
- Maintained small, logical diffs.
- Clear, lower-case imperative commit messages (e.g., `optimize app for slow 3g`, `refine confirmation timeline ui`).

---
**Author:** Prabhat Mishra
