# 🚀 Auto-radio monorepo

This is an official monorepo for Auto-radio.

## ❓ What's inside?

This monorepo includes the following packages/apps:

### 📦 Apps and Packages

- `web`: the main app.
- `@repo/ui`: a stub React component library used by `web` app.
- `@repo/shared`: a primitive React component library used into `@repo/ui` lib.
- `@repo/biome-config`: `biome` configurations.
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### ✨ Utilities

This monorepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [Biome](https://biomejs.dev/) for code linting and formatting.

### 🔨 Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### 💻 Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```