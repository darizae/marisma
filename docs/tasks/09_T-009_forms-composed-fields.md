# 09 — T-009: Forms, field compositions and file interaction

**Status:** PROPOSED FOR OWNER REVIEW · **Phase:** S3, cluster 3/5 · **Repository:** darizae/marisma
**Dependency:** T-008 accepted; interaction contracts and semantic feedback tokens available.

## Outcome and exact catalog coverage

Complete **2 general UI candidates**: Form and Dropzone. Complete **6 composed-field candidates**: Field Callout → FieldCallout, Confirmation field dialog → ConfirmationDialog, Field Group → FieldGroup, Inline change control → InlineEdit, Search field → SearchField, Vertical field separator → FieldDivider. Reuse Input, Textarea, Select, Checkbox, DateField, Alert, Dialog and other approved primitives. Composition must not duplicate their behavior.

## Public integration boundary

Core Form and fields must work with native React form state, validation and HTML submission. If a React Hook Form adapter is useful, provide it as a genuinely optional integration with a separate entry point/dependency contract; do not make that framework mandatory for Button or Input consumers. Support form field labels/description/error and required/invalid relationships; preserve consumer-controlled data and async actions. No authentication, API calls, file uploads or implicit persistence.

## Internal delivery checkpoints

**A — Form foundation:** Build Form, FieldGroup, FieldDivider and FieldCallout. Specify semantic grouping (fieldset/legend when appropriate), keyboard order, accessible error summary when needed, reset/submit, controlled/uncontrolled values, name/id propagation and disabled groups. Verify that nested inputs do not duplicate labels or IDs.

**B — Composed interactions:** ConfirmationDialog, InlineEdit and SearchField. Define confirm/cancel/escape semantics, pending state and repeated clicks; inline-edit save/cancel/revert and optimistic behavior owned by caller; search clear, submit, keyboard and empty-query policy. Preserve event and focus behavior.

**C — Dropzone:** Browser file input plus drag-and-drop, accepted MIME/extension policy, size/count limits, duplicate/rejected files, reselect, keyboard alternatives and clearing/unmount cleanup. Do not upload, execute, parse or persist files without explicit caller action. Test rejection feedback and avoid falsely promising malware scanning.

## Implementation boundary

**First read:** AGENTS.md → ENGINEERING_CONTRACT.md → this file → T-009 routing row → engineering-quality skill → catalog and relevant verification cases → existing Input/Dialog/Select/DateField, their stories and tests.

**Allowed paths:** packages/ui/src/components/, src/lib/, src/index.ts, approved optional-adapter export, relevant deps/lockfile after owner review, corresponding tests/stories/README sections. No router, form backend, network service, new styling system or charts.

## Local acceptance evidence

- Each candidate disposition tracked, with reusable public props and composition examples (or owner-approved merge) rather than opaque application-specific configuration.
- Unit tests: submit/validation/reset, error association, controlled value, pending/cancel, focus return, keyboard and DragEvent handling; negative cases and cleanup. Use realistic local fixtures without cloud services.
- Browser tests locally for keyboard focus, native drag/drop where supported and screen-reader-relevant DOM/announcement contracts. Document browser limitations and any capability needing real device confirmation.
- At cluster gate: targeted unit suite, typecheck/build, Storybook interactions and tarball-installed consumer exercise when new exports/optional peers change. No remote CI requirement.
- Ensure source/README accurately distinguish validation from security and local file selection from upload.

**Stop:** deliver reviewable commits/PR, actual test evidence and remaining blockers; do not publish or start T-010 without owner acceptance.
