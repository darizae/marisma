import { createElement } from "react";
import type { Preview } from "@storybook/react-vite";
import "./preview.css";

const preview: Preview = {
  globalTypes: {
    marismaAccent: {
      description: "Marisma accent family",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "reedwater", title: "Reedwater" },
          { value: "tidal-blue", title: "Tidal Blue" },
        ],
        dynamicTitle: true,
      },
    },
    marismaMode: {
      description: "Marisma color mode",
      toolbar: {
        icon: "contrast",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    marismaAccent: "reedwater",
    marismaMode: "light",
  },
  decorators: [
    (Story, context) => {
      const accent =
        context.globals.marismaAccent === "tidal-blue"
          ? "tidal-blue"
          : "reedwater";
      const mode = context.globals.marismaMode === "dark" ? "dark" : "light";

      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-marisma-accent", accent);
        document.documentElement.setAttribute("data-marisma-mode", mode);
      }

      return createElement(
        "div",
        {
          className:
            "min-h-screen bg-mar-surface p-6 font-mar-sans text-mar-text sm:p-10",
          "data-marisma-accent": accent,
          "data-marisma-mode": mode,
        },
        createElement(
          "div",
          {
            className:
              "mx-auto flex min-h-[calc(100vh-3rem)] max-w-5xl items-center justify-center sm:min-h-[calc(100vh-5rem)]",
          },
          createElement(Story),
        ),
      );
    },
  ],
  parameters: {
    controls: { expanded: true },
    layout: "fullscreen",
  },
};
export default preview;
