# Marisma brand asset

The single authoritative Marisma leaf logo is [`marisma-leaf.svg`](marisma-leaf.svg), adapted only in accessible label from the supplied leaf artwork. Its SVG paths, palette and visible geometry are unchanged.

The landing Vite app serves this folder through `publicDir`, while Storybook serves it through `staticDirs`. Both point to the same repository file; no duplicated icon copies should be committed. The landing page and Storybook manager use the leaf as their visible mark and SVG favicon. README links directly to this SVG.

The mark is **brand artwork**, not a component API, required runtime asset or packaged font. Keep it out of `@darizae/marisma` dependencies unless the owner explicitly chooses to publish brand assets. Changes to the brand icon should be separately approved.
