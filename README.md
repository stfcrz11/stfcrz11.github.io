# Stefane Ballad Cerezo – Portfolio

Static site (HTML, CSS, a little JavaScript). No build step.

## Files
- `index.html`, `style.css`, `script.js` – the site (Home, About, Resume and Portfolio views, switched with the top menu)
- `assets/Stefane-Cerezo-Resume-ATS.pdf` and `.docx` – the resume the site links to
- `assets/screens/` – project screenshots used by the Portfolio cards

## Publish on GitHub Pages
1. Create a repository named **`stfcrz11.github.io`**.
2. Upload everything in this folder (keep `assets/` and its `screens/` folder). `index.html` must be at the top level.
3. **Settings → Pages**: Source *Deploy from a branch*, branch `main`, folder `/ (root)`, Save.
4. The site goes live at `https://stfcrz11.github.io/` in a minute or two.

To update an existing site, upload the changed files again (Add file → Upload files) and commit.

## Add screenshots to a project card
Three cards (SolarCORE, Barangay Health Center, Sili-Tubig Clash) show "Screenshots coming soon" until you add images.
1. Save screenshots in `assets/screens/` (webp, jpg or png, about 1200 px wide).
2. In `index.html`, find the project's card. Replace its `<div class="thumb none" ...>` with the same block the OBE card uses:
   a `<button class="thumb" type="button" data-open="Project name" data-sub="One line about your role" data-shots="assets/screens/file1.png::Caption 1|assets/screens/file2.png::Caption 2">` containing an `<img src="assets/screens/file1.png" alt="Describe the screenshot" width="1200" height="833">` and `<span class="more">2 screenshots</span>`.
3. Commit. The card now opens a gallery with arrow-key and button navigation.

## Design notes
Layout follows the reference dark portfolio (top menu with phone number, big two-weight name, outlined buttons, three-column resume). There is no photo of you; the home view shows the OBE system's screens instead.
Usability follows Shneiderman's Eight Golden Rules: consistent components, a skip link and keyboard shortcuts in the gallery, a highlighted "you are here" menu item, clear feedback on every control, closable gallery, back button works between views, no hidden gestures, and short labelled menus.
