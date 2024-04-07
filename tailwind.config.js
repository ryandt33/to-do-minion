/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            p: {
              marginTop: "0.25rem",
              marginBottom: "0.25rem",
            },
            strong: {
              color: "inherit",
            },
            h1: {
              color: "inherit",
            },
            h2: {
              color: "inherit",
            },
            h3: {
              color: "inherit",
            },
            h4: {
              color: "inherit",
            },
            h5: {
              color: "inherit",
            },
            prose: {
              color: "inherit",
            },
            thead: {
              color: "inherit",
            },
            tbody: {
              color: "inherit",
            },
            "thead th": {
              color: "inherit",
            },
            th: {
              color: "inherit",
            },
            td: {
              color: "inherit",
            },
            tr: {
              color: "inherit",
            },
            prose: {
              color: "inherit",
            },
            code: {
              color: "inherit",
              "white-space": "auto",
            },
            pre: {
              "white-space": "auto",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
