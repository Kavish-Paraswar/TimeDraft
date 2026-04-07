# TimeDraft — Premium Interactive Wall Calendar

A beautifully designed, production-level interactive wall calendar component built with **Next.js 15**, **Framer Motion**, and **Vanilla CSS**. This project translates the physical charm of a printed wall calendar into a fluid, highly functional digital experience, optimized for a single-screen view.

---

## 🌟 Overview

TimeDraft isn't just a grid of dates—it's a productivity tool designed with a focus on visual excellence and tactile interactions. It features a stunning 12-month hero gallery, dynamic theming that adapts to each month's mood, and a robust notes system for tracking personal milestones and date ranges.

## 🚀 Key Features

*   **Compact Single-Screen UI**: Systematically refined to fit all features—hero images, calendar grid, and notes—within a single viewport without scrolling.
*   **3D Flip Animations**: Experience smooth, physical-feeling page transitions using advanced 3D transforms when switching months.
*   **Dynamic Theming**: The interface automatically extracts and applies accent colors from each month's unique hero image for a cohesive visual look.
*   **Advanced range selection**: Effortlessly select date ranges with a 3-click flow (Start → End → Reset) and live hover previews.
*   **Integrated Notes System**: Dedicated space for monthly goals, specific date range plans, and daily quick-notes, all saved automatically to your browser.
*   **Indian Holiday Dataset**: Pre-loaded with major Indian festivals and public holidays, marked with subtle, color-coded indicators.
*   **Full Responsiveness**: Seamlessly transitions from a premium side-by-side desktop layout to a touch-optimized mobile experience with swipe gestures.
*   **Dark & Light Modes**: Meticulously crafted themes that maintain readability and contrast in any environment.

## 🛠 Tech Stack

*   **Framework**: Next.js 15 (App Router)
*   **Language**: TypeScript
*   **Animations**: Framer Motion
*   **Styling**: Vanilla CSS Modules (Zero-runtime overhead)
*   **Icons**: Lucide React
*   **State**: React Hooks (useCalendar, useNotes, useTheme, useSwipe)
*   **Persistence**: localStorage API

## 🏃 How to Run

1.  **Clone & Install**:
    ```bash
    git clone <repository-url>
    cd tuf
    npm install
    ```
2.  **Start Development Server**:
    ```bash
    npm run dev
    ```
3.  **View App**:
    Open [http://localhost:3000](http://localhost:3000)

## 🧪 Demo Instructions

*   **Navigate**: Use the `<` and `>` buttons to trigger the 3D month flip.
*   **Select Range**: Click one date, hover around to see the preview, and click a second date to lock the range.
*   **Add Notes**: 
    1.  Click the "Monthly" tab to jot down notes for the month.
    2.  Select a range, then click the "Range" tab to add notes specifically for those dates.
    3.  Click a single date and head to the "Daily" tab to see or add notes for that day.
*   **Identify Holidays**: Hover over colored dots on specific dates (like Jan 26 or Aug 15) to see holiday names.
*   **Toggle Theme**: Use the action bar at the bottom to switch between Dark and Light modes.

---

*Built with ❤️ for a premium user experience.*
