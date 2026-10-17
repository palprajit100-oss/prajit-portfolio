# Prajit Pal — Portfolio Website

A responsive front-end portfolio built with plain HTML, CSS, and JavaScript for the Coursera Introduction to Web Development project.

## Files
- `index.html` — semantic page structure, project cards, contact form, and lightbox dialog
- `styles.css` — visual design, responsive breakpoints, focus styles, and reduced-motion support
- `script.js` — mobile navigation, smooth scrolling, project filters, image lightbox, live form validation, and small reveal effects
- `assets/` — local SVG illustrations for the hero and project previews
- `TESTING.md` — static validation results and browser-testing checklist

## Run locally
Open `index.html` in a browser. For best results, use VS Code's Live Server extension or another simple local server.

## Before submission
1. Replace `your.email@example.com` in the mailto link in `index.html` with your real email address.
2. Replace the generic GitHub and LinkedIn links with your profile URLs.
3. Check that the project descriptions accurately reflect your work. The Mausam project is labelled as a prototype/in-progress project.
4. Test the site in desktop and mobile browsers. See `TESTING.md` for a checklist.
5. Upload `index.html`, `styles.css`, `script.js`, `README.md`, `TESTING.md`, and the entire `assets` folder to the root of a GitHub repository.
6. In GitHub, open **Settings → Pages**, select **Deploy from a branch**, choose `main` and `/(root)`, then save.
7. Submit the published GitHub Pages URL to Coursera.

## Contact form note
The contact form performs client-side validation and displays success feedback, but it does not send messages to a server. To receive real submissions, connect a backend or a form service. This is made explicit in the user interface.

## Assignment rubric coverage
- HTML: semantic header, navigation, main, section, article, form, dialog, and footer
- Accessibility: skip link, image alternatives, input labels, ARIA-expanded/pressed/invalid attributes, live status messages, keyboard focus, native dialog, and reduced-motion support
- CSS: reusable custom properties, consistent card styling, typography, and spacing
- JavaScript: mobile menu, smooth scrolling, filters, lightbox, real-time form validation, and dynamic footer year
- Responsive design: media queries for wide desktop, tablet, and mobile widths
