# Droplo Recruitment Project

This is a recruitment project for **Droplo**. The application is built using [Next.js 15](https://nextjs.org/blog/next-15) and [React 19](https://react.dev/). While React 19 is in its RC phase, it is considered stable for use according to Next.js:

> Although React 19 is still in the RC phase, our extensive testing across real-world applications and our close work with the React team have given us confidence in its stability. The core breaking changes have been well-tested and won't affect existing App Router users. Therefore, we've decided to release Next.js 15 as stable now, so your projects are fully prepared for React 19 GA.

**[Source: Next.js 15 and React 19rc](https://nextjs.org/blog/next-15#react-19)**

The project utilizes the following technologies:
- **[Tailwind CSS](https://tailwindcss.com/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[@dnd-kit/core](https://dndkit.com/)** for drag-and-drop functionality
- **[React Hook Form](https://react-hook-form.com/)** for managing form state and validations efficiently, ensuring optimal performance by minimizing re-renders
- **[Yup](https://github.com/jquense/yup)** for schema-based form validation, providing a clean and declarative way to enforce data shape and constraints


## Getting Started

First, install the dependencies:

```bash
npm install
```

If you encounter issues installing packages, add the --legacy-peer-deps flag:

```bash
npm install --legacy-peer-deps
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 in your browser to see the application.

## Development Notes

- The main entry point for editing the app is located in `app/page.tsx`.
- The app uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to optimize font usage.

## Learn More

For further details about the technologies used in this project, explore the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial.
- [React Documentation](https://react.dev/) - Learn about React features.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Explore the Tailwind framework.
- [@dnd-kit Documentation](https://dndkit.com/docs) - Learn about drag-and-drop components.

## Deployment

The application has been deployed on Vercel.
 - https://dnd-tree-list.vercel.app
