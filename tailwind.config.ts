import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundPrimary: "var(--bg-primary)",
        backgroundSecondary: "var(--bg-secondary)",
        borderPrimary: "var(--border-primary)",
        borderSecondary: "var(--border-secondary)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textTertiary: "var(--text-tertiary)",
        cancel: {
          text: "var(--cancel-text)",
          border: "var(--cancel-border)",
        },
        add: {
          text: "var(--add-text)",
          border: "var(--add-border)",
        },
      },
      boxShadow: {
        subtle: "0px 1px 2px 0px #1018280D",
      },
      fontSize: {
        '14-400': ['14px', { fontWeight: '400' }],
        '14-500': ['14px', { fontWeight: '500' }],
        '14-600': ['14px', { fontWeight: '600' }],
        '16-400': ['16px', { fontWeight: '400' }],
        '16-500': ['16px', { fontWeight: '500' }],
        '16-600': ['16px', { fontWeight: '600' }],
      },
      lineHeight: {
        '20': '20px',
        '24': '24px',
      },
    },
  },
  plugins: [],
} satisfies Config;
