# RomanKnows browser presentation

The editable HTML source for the 15-slide presentation follows the content supplied in the user's pasted outline. The visuals use local Inter and IBM Plex Mono fonts, original report screenshots, generated conceptual artwork, and HTML/SVG diagrams.

## Open and export

The easiest option is the self-contained **RomanKnows_Presentation.html** file in the parent `public` folder. Open it in Chrome or Edge. It embeds every image, font, script and export library and needs no server or internet connection.

For the separated source files, run `npm run deck` from the repository and open **http://localhost:4173**. If the existing Next.js dev server is running, open `/romanknows/index.html` on its URL. These static files bypass the travel website's layout.

- Use the sidebar, arrow keys, or slide overview to navigate.
- **Present** or **F** enters fullscreen. Escape exits.
- **Edit text** lets you update the outlined copy. Edits are stored only in the current browser/location. Restore the supplied wording from the Export menu.
- **Download PDF** exports all slides at high resolution, including your current edits.
- **Download PowerPoint** exports image-based slides with notes. The design is preserved, but slide contents are not separate editable PowerPoint objects. Edit content in this HTML presentation and export again.
- **Print / Save PDF** offers a browser-native PDF with selectable text. Use the supplied page size, background graphics, no margins, and disable browser headers/footers.
- Click a product screenshot to inspect the original image.

## Source files

- `slides.js`: all 15 slides, copy, HTML structure and source notes.
- `styles.css`: slide typography, layouts, responsive studio and print rules.
- `app.js`: navigation, text editing, persistence, fullscreen and export controls.
- `assets/`: local fonts, logos, report screenshots and conceptual artwork.
- `vendor/export.js`: bundled PDF, PowerPoint and DOM-rendering libraries.

To rebuild dependencies and the self-contained file from the repository:

```powershell
npm install --prefix presentation
node presentation/build-vendor.mjs
node presentation/build-standalone.mjs
```

## Content boundaries

The model and milestones are presentation-friendly proposals, not a dated development record. Test cases show expected behavior, not claimed pass/fail results. The progress screenshot is synthetic Demo Mode, as labeled in the report. The concept illustrations are not product evidence. Versions on the technology slide describe the report's project, not this repository's separate travel website.

Fonts are distributed with their licenses. Brand marks come from Simple Icons. The PNG screenshots are extracted from the supplied project report. Generated artwork provenance and prompts are in `assets/presentation/README.md` at the repository root.
