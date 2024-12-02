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
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        cancel: "var(--bg-cancel)",
        add: "var(--bg-add)",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
        add: "var(--add-text)",
        'btn-primary': "var(--btn-fg-primary)",
      },
      borderColor: {
        primary: "var(--border-primary)",
        secondary: "var(--border-secondary)",
        cancel: "var(--cancel-border)",
        add: "var(--add-border)",
        'btn-primary': "var(--btn-bg-primary)",
      },
      backgroundColor: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        cancel: "var(--bg-cancel)",
        add: "var(--bg-add)",
        'btn-primary': "var(--btn-bg-primary)",
      },
      boxShadow: {
        subtle: "0px 1px 2px 0px #1018280D",
      },
      borderRadius: {
        md: "8px",
      },
      fontSize: {
        '12-400': ['12px', { fontWeight: '400' }],
        '12-500': ['12px', { fontWeight: '500' }],
        '12-600': ['12px', { fontWeight: '600' }],
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
      spacing: {
        'custom': 'var(--spacing)',
      },
    },
  },
  plugins: [],
} satisfies Config;
