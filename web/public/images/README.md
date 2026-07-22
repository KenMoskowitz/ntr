Drop these files here (exact names below), pulled from the current WordPress
media library, per the master plan's "Image Assets to Preserve" list:

- logo-header.png (referenced by Header.astro)
- elephant-footer.png (referenced by Footer.astro — Elephant-footer-254x300.png on WP, keep the mascot)
- Faces of NTR team photos (1.jpg through 5.jpg)

Favicon goes in `web/public/favicon.ico` (from cropped-favicon-270x270.png on WP).

Until these are added, the site builds and deploys fine — the `<img>` tags
just 404 for these specific assets.
