# ⚡ Realtime Kit

This is my official repo template for realtime kit using Next.js

## 💻 Technology Stack:
<div align="center">
  <img width="12" />
  <img src="https://socket.io/images/logo-dark.svg" height="30" alt="socketio logo"  />
  <img width="12" />
  <img src="https://orm.drizzle.team/favicon.ico" height="30" alt="drizzle logo"  />
  <img width="12" />
  <img src="https://turso.tech/favicon.ico" height="30" alt="Turso logo"  />
  <img width="12" />
  <img src="https://authjs.dev/img/etc/logo-sm.webp" height="30" alt="socketio logo"  />
  <img width="12" />
  <img src="https://cdn.fosstodon.org/accounts/avatars/111/171/620/149/728/915/original/a0df16a682fecc6b.png" height="30" alt="socketio logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=ts" height="30" alt="typescript logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=tailwind" height="30" alt="tailwindcss logo"  />
  <img width="12" />
  <img src="https://skillicons.dev/icons?i=nextjs" height="30" alt="nextjs logo"  />
  <img width="12" />
  <img src="https://lucide.dev/logo.dark.svg" height="30" alt="nextjs logo"  />
</div>

- [Socket.io](https://socket.io/)
- [Drizzle](https://orm.drizzle.team/)
- [Turso](https://turso.tech/)
- [Auth.js](https://authjs.dev/)
- [Biome](https://biomejs.dev/)
- [Next.js 14](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Typescript](https://typescriptlang.org/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Lucide](https://lucide.dev/)

## ❓ What's inside?

This monorepo includes the following packages/apps:

### 📦 Apps and Packages

- [`apps/web`][apps/web]: the main app.
- [`apps/server`][apps/server]: The WebSocket server.
- [`packages/atoms`][repo/atoms]: a stub React component library used by web app.
- [`packages/db`][repo/db]: The db client, tables and custom queries.
- [`packages/tw-config`][repo/tw-config]: Tailwind base config shared across many packages.
- [`packages/biome-config`][repo/biome-config]: Biome configurations.
- [`packages/typescript-config`][repo/typescript-config]: `tsconfig.json`s used throughout the monorepo.

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### ✨ Utilities

This monorepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [Biome](https://biomejs.dev/) for code linting and formatting.

### 🔨 Build

To build all apps and packages, run the following command:

```
cd realtime-kit-nextjs
pnpm build
```

### 💻 Develop

To develop all apps and packages, run the following command:

```
cd realtime-kit-nextjs
pnpm dev
```

[apps/web]: /apps/web
[apps/server]: /apps/server
[repo/atoms]: /packages/atoms
[repo/biome-config]: /packages/biome-config
[repo/db]: /packages/db
[repo/tw-config]: /packages/tw-config
[repo/typescript-config]: /packages/typescript-config
