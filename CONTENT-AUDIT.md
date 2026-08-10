# Content and style cleanup — static edition

## Removed from this edition

- React/Vinext runtime scripts and their duplicate generated markup.
- Broken references to build-only `/assets/index-*.css` and JavaScript chunks.
- Root-relative asset paths that fail when an HTML file is opened directly from a computer.
- The identical general FAQ block from About, Services, and Contact. It remains on the homepage; individual service pages keep their own service-specific FAQ blocks.

## Checked

- 23 public pages: one H1, a page title, and a meta description on each.
- No duplicate IDs within a page.
- All local images, videos, CSS, JavaScript, and internal HTML links resolve inside the static package.
- No React runtime, module-preload tags, or root-relative local asset paths remain in the generated HTML.
- All styles are compiled into one local file: `preview/assets/site.css`.

## Intentional repeated elements

The shared header, navigation, footer, and compact project-contact CTA remain consistent across pages. They are repeated intentionally for navigation and conversion, but their wording does not compete with page H1s or the primary page content.
