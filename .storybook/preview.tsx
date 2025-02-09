import type { Preview } from "@storybook/react";
import React from "react";
import "tailwindcss/tailwind.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: "500px",
          backgroundImage: `url('bg-light.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
