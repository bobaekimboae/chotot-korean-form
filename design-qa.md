# Design QA — Korean motorcycle listing form

final result: passed

Scope: Korean adaptation of the observed motorcycle form. This is a frontend demonstration, not a complete replica of the marketplace or its private APIs.

## Evidence

Source: https://www.chotot.com/dang-tin?category_group=3&ia_version=3
Implementation: http://localhost:4173/
Local-only evidence: ../../work/qa/source-mobile.png, ../../work/qa/implementation-mobile.png, ../../work/qa/source-desktop.png, ../../work/qa/implementation-desktop.png. Evidence containing a user-selected photo is intentionally excluded from the public repository.

Viewports: 390 × 844 and 1878 × 926 CSS pixels. Screenshots were requested at these viewport sizes. Source and implementation were emitted together for each comparison. Desktop in-app captures are resampled by the browser surface and were used for layout; readable mobile captures and DOM metrics were used for typography and controls. The source includes an unrelated app-install promotion which is intentionally excluded. Source price/address were empty; local test data completed them, so error-state spacing differs intentionally.

## Required surfaces

- Typography: local Noto Sans KR, 14px body and 20px textarea line height, replacing unavailable Reddit Sans. Korean labels, counters and native selects checked on mobile. No clipped field labels observed.
- Layout: 592px centered form, 16px card padding and spacing, 276px description area, 12px corners, two-column detail grid, fixed bottom action bar. Sidebar suppressed where it would extend outside the viewport.
- Tokens: white cards, #f7f7f7 page, #ffda00 main action, pale yellow uploads and pink validation borders preserve the observed hierarchy.
- Assets: original logo and upload bitmap bundled locally. User photo used only for local verification. Lucide supplies equivalent general controls. No external asset hotlinks.
- Content: observed motorcycle fields and option labels translated. VND remains unchanged. Source AI generation replaced with an explicitly described local writing template; address and vehicle identity use manual entry. No invented claim that AI or marketplace posting is connected.

## Comparison and fix history

1. Initial comparison found a small horizontal registration-column offset; center the main column independently of the guidance card. Final desktop capture and measured 592px card confirm the correction.
2. Upload control lost its accessible name after adding an image; add a persistent label and verify it in the browser accessibility tree.
3. React logged an empty image src during object URL initialization; use undefined until the URL exists.
4. Prevent the guidance sidebar from clipping at intermediate desktop widths by hiding it below 1251px.

Focused review used the readable mobile form and preview screenshots for label wrapping, photo crop, control borders, button text and dialog content. Desktop text detail is not judged from the resampled full-view screenshot.

## Functional verification

- Empty next action exposes required media and description errors.
- User-selected image attaches and renders as the cover image.
- Description input reveals the detail step.
- Title, price, address dialog, manufacturer, model, year, vehicle type and mileage accept input.
- Preview displays the uploaded image, entered values and VND formatting.
- Valid completion clearly states that no real advertisement was published.
- IndexedDB save succeeds; reloading and restoring recovers text, photo and selected year.
- 390px layout has no horizontal overflow; fixed actions remain usable.
- Production Vite build succeeds. Console inspection identified and corrected the image-src warning; no unrelated application errors were observed.

## Accepted differences and residual coverage

The source promotion, private account identity, notifications and real marketplace links are excluded or replaced with explanatory interactions. Search and chat are outside this form's scope. Native dropdowns and manual address entry replace remote autocomplete services. Actual AI and live posting are intentionally not implemented. Twenty-file boundary, video codecs, large-file storage limits, and all browser/assistive-technology combinations have not been exhaustively tested.

## Default-open update
User-requested behavior change: the entire motorcycle form is visible immediately, with no prerequisite upload step. Verified by reloading the local page with empty inputs and checking title, price, address, all detail controls and the three bottom actions. Older drafts also restore with details open. Production build passed. Existing layout is unchanged.

## Category-driven forms update
The previous motorcycle-only scope is superseded by six vehicle categories observed in the source UI: car, motorcycle, truck/dump truck, bicycle, other vehicles and parts. Category-specific fields, used/new conditional controls, preview/export projection and category-specific draft values are implemented. Native select and manual-entry substitutions remain intentional.
Browser verification exercised all six category transitions, isolation and restoration of Honda versus Hyundai manufacturer values, truck payload restoration, category-aware preview and IndexedDB reload/restore. Five regression tests passed, covering hidden-field validation, truck requirements, current-category export and new/used car conditions; these tests also run in deployment CI.
Mobile source and implementation were emitted together at 390x844. Evidence: ../../work/qa/truck-source-mobile.png and ../../work/qa/truck-implementation-mobile.png. The two-column truck fields, typography, yellow actions, card spacing and photo-free detail controls were visually reviewed. Native select labels and Korean wrapping intentionally differ; no horizontal overflow was observed. Existing desktop container styling is unchanged.
final result: passed

## Parts type select update
Read the six visible source menu entries: motorcycle, car, bicycle, electric vehicle, truck/dump truck and other parts. Replaced the free-text parts field with these Korean options. Browser verification selected truck/dump-truck parts and confirmed the same label in preview. Existing category tests and production build passed. Unsupported legacy select values require a fresh selection.

## Other vehicle type select update
Captured the source other-vehicle list: Xe chuyên dụng, Khác, Xe khách, xe buýt. Added the three corresponding Korean options in source order. Verified selecting the passenger vehicle/bus option and its preview value. Existing tests and production build passed.

Truck manufacturer update: matched all 36 options from the original dropdown (brand names retained; Other translated). Verified Isuzu selection in preview, preserved existing Hyundai value, and passed category tests and production build.
