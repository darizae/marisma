import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

// Asset served from the single canonical repository SVG via staticDirs.
addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Marisma",
    brandUrl: "https://github.com/darizae/marisma",
    brandImage: "./marisma-leaf.svg",
    brandTarget: "_blank",
  }),
});
