# AA Embroidery Work — Phase 1 Website

Approved visual direction: editorial, premium craft studio, warm ivory + charcoal + restrained gold.

## Preview
Because the site uses ES modules, preview it through a local web server rather than double-clicking index.html.

From this folder:
PowerShell:
`python -m http.server 8000`

Then open:
`http://127.0.0.1:8000/`

## Image slots
See `assets/images/README.txt`. Replace the placeholder image files with the actual AA Embroidery photographs while keeping the filenames.

## Latest gallery setup
- The Gallery is section-wise: Blouses, Logos & Uniforms, Custom Embroidery, and T-Shirt Prints.
- Each category is capped at 12 images.
- Gallery images open in an on-site popup/lightbox and do not navigate away.
- Update `data/gallery.js` to add image URLs for each category.
- The bottom Google CTA links to the full AA Embroidery Works Google Business photo collection.
