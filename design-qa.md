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
