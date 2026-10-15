# Stefane Ballad Cerezo – Portfolio

Static site (HTML, CSS, a little JavaScript). No build step.

## Files
- `index.html`, `style.css`, `script.js` – the site
- `assets/Stefane-Cerezo-Resume-ATS.pdf` and `.docx` – the resume the site links to

## Publish on GitHub Pages
1. Create a repository named **`stfcrz11.github.io`** (your username plus `.github.io`). The resume already links to `https://stfcrz11.github.io`.
2. Upload everything in this folder, keeping the `assets` folder.
3. Open **Settings → Pages**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, then save.
4. The site goes live at `https://stfcrz11.github.io/` after about a minute.

If you use a different repository name, the site will be at `https://stfcrz11.github.io/<repo-name>/`. Update the portfolio link in the resume header to match.

## How the design applies Shneiderman's Eight Golden Rules
1. **Consistency** – one colour, type and spacing system; every list, button and link behaves the same way throughout.
2. **Shortcuts** – "Skip to content" link, a sticky bar with section links, and a Resume button that is always visible.
3. **Informative feedback** – the current section is highlighted in the bar; "Copy email address" confirms with a message; buttons show hover and keyboard focus.
4. **Closure** – actions say what happened ("Email address copied"), and links that open a new tab say so for screen readers.
5. **Error prevention** – text labels instead of icon-only controls, large tap targets, and a visible email address in case copying fails.
6. **Easy reversal** – project rows open and close, and the theme toggle switches back.
7. **User control** – no autoplay or scroll-triggered animation; it respects reduced-motion and light/dark system settings.
8. **Low memory load** – short navigation, plain section names, the same details in the same order for every project.

## Updating
Replace the files in `assets/` with the same names to update the resume, or edit `index.html` directly.
