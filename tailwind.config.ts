import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        "ac-very-dark-grayish-blue": "hsl(217, 19%, 35%)",
        "ac-desaturated-dark-blue": "hsl(214, 17%, 51%)",
        "ac-grayish-blue": "hsl(212, 23%, 69%)",
        "ac-light-grayish-blue": "hsl(210, 46%, 95%)",
      },
      fontSize: {
        body: "13px",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
      fontWeight: {
        normal: "500",
        bold: "700",
      },
      screens: {
        desktop: "1440px",
        mobile: "375px",
      },
      backgroundImage: {
        // "sample-bg": "/tsugini" // basepath of github pages
      },
    },
  },
  plugins: [],
};
export default config;
