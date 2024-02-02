import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple': '#8D3A87',
        'gray': '#F8F8F8',
        'dark-gray': '#908A8A',
        'btn-purple': '#92369C',
        'sch-purple': '#915797',
        'grayish-purple': '#AF94AE',
        'pinkish-purple': '#E6CDDF',
        'dark-purple': '#734A73',
        'dark-blue-bg': '#202442',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
