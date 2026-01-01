# Track Spec: Portfolio Restructuring & Professionalization

## Overview
Restructure the existing single-page portfolio (based on `README.md`) into a multi-page, professional website using Jekyll. The goal is to improve visual hierarchy and navigation while adding dynamic activity feeds to the homepage.

## Functional Requirements
- **Multi-Page Architecture:** Split the content of `README.md` into dedicated pages:
    - **Home:** Bio, social links, and dynamic feeds.
    - **Side Projects:** Categorized list of personal projects.
    - **Slides & Talks:** Links to presentations and external slides.
    - **Open Source Contributions:** Log of contributions to major projects.
- **Navigation System:** Implement a persistent navigation bar or menu across all pages to allow easy context switching.
- **Homepage Dynamic Feeds:**
    - **GitHub Activity:** Implement client-side JavaScript to fetch and display recent commits or activity via the GitHub API.
    - **Recent Blog Posts:** Implement client-side JavaScript to fetch and display the latest posts from Blogspot/Medium (e.g., via an RSS-to-JSON service).
- **Professional Bio:** Add a dedicated section for a professional summary and links to key profiles (LinkedIn, Debian, Ubuntu).

## Non-Functional Requirements
- **Performance:** Dynamic feeds should load asynchronously to prevent blocking the initial page render.
- **Responsiveness:** The multi-page layout and navigation must be fully responsive and work on mobile devices.
- **Style Consistency:** Maintain and enhance the `jekyll-theme-minimal` aesthetic while improving typography and spacing.

## Acceptance Criteria
- [ ] The site is successfully split into at least 4 distinct pages (Home, Projects, Slides, Contributions).
- [ ] A functional navigation menu is present and working on every page.
- [ ] The homepage successfully displays real-time (client-side) activity from GitHub.
- [ ] The homepage successfully displays recent blog post titles and links.
- [ ] The build process via GitHub Actions remains functional.

## Out of Scope
- Server-side data persistence or backend databases.
- Full-text search functionality across the site.
- Deep redesign of the `jekyll-theme-minimal` base CSS (focus is on layout and content organization).
