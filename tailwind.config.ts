import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/preline/preline.js',
  ],
  theme: {
    colors: {
      'blue': '#FF9EAA',
      'purple': '#97E7E1',
      'pink': '#F19ED2',
      'orange': '#ff7849',
      'green': '#DEF9C4',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#64748B',
      'gray-light': '#d3dce6',
      'ow':'#FFC6C6',
      'neon':'#4deeea'
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require('daisyui'),require('preline/plugin'),],
};
export default config;
