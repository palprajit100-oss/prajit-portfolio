# Integration, testing, and debugging record

## Automated/static checks performed

| Check | Result | Notes |
|---|---|---|
| JavaScript syntax | **Pass** | `node --check script.js` completed without reporting a syntax error. |
| HTML local resource links | **Pass** | `styles.css` is linked in the document head; `script.js` is loaded immediately before `</body>`. External Google Fonts are intentionally loaded from the web and are not local assets. |
| Local image references | **Pass** | All local image and lightbox-preview paths point to files in `assets/`. |
| In-page navigation targets | **Pass** | All authored `href="#..."` links reference IDs in the page; IDs are unique. |
| Image accessibility | **Pass by source check** | Every content image has descriptive `alt` text; decorative symbols use `aria-hidden`. |
| Form label association | **Pass by source check** | Each name/email/message control has a matching label and an error-message region. |
| Responsive and reduced-motion styles | **Pass by source check** | Media queries cover tablet/mobile layouts; reduced-motion preferences are respected. |

## Manual browser test checklist

These checks should be performed in your own browsers before you submit. They are listed here as a reproducible checklist; they are **not** claimed as already tested on physical devices.

| Environment / interaction | Steps | Expected result | Status |
|---|---|---|---|
| Desktop — Chrome or Edge | Open `index.html`; inspect all sections | Consistent layout, no missing assets, no horizontal overflow | Pending manual test |
| Tablet width (~768–1024 px) | Resize the browser | Cards and two-column sections adapt to available width | Pending manual test |
| Mobile width (≤760 px) | Resize to phone width; open and close menu | Hamburger toggles, expanded state updates, choosing a link closes menu | Pending manual test |
| Smooth navigation | Select About, Projects, Contact, Skip to main content | Page scrolls to corresponding section | Pending manual test |
| Project filters | Select All projects, Web & apps, Programming | Correct project cards remain visible and status text updates | Pending manual test |
| Lightbox | Activate each project preview with mouse and keyboard; press Escape | Correct image/title opens; Close and Escape dismiss it | Pending manual test |
| Invalid form | Submit empty fields; enter invalid email; enter short message | Field errors display, invalid field is announced and focused | Pending manual test |
| Valid form | Enter name, valid email, and a message of at least 10 characters | Validation success appears; no network submission is implied | Pending manual test |
| Reduced motion | Enable reduced motion in system/browser settings | Smooth scrolling and reveal transitions are reduced/disabled | Pending manual test |
| Other browsers | Repeat main interactions in Firefox and Safari if available | No broken layout or JavaScript errors | Pending manual test |

## Debugging notes / known limitations

- The stylesheet uses the activity-specified filename `styles.css` (plural). The HTML link must match this exact name.
- JavaScript is loaded immediately before `</body>`, so page elements exist before the script queries them.
- The lightbox uses the native dialog where available and includes a basic open/close fallback for browsers without dialog modal methods.
- The contact form intentionally does not send data anywhere. Client-side validation alone is not a backend; connect a form service or server if message delivery is required.
- Replace the placeholder email/social URLs before publishing.
- External Google Fonts require an internet connection; system sans-serif fallbacks remain available if fonts cannot load.
- Static checks cannot guarantee identical rendering in every browser. Complete the manual checks above and inspect the browser developer console for any errors before submission.
