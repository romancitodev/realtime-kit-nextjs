# 📕 Setup Guide

Inside [apps/web][apps/web] and [packages/db][packages/db] you should see a `.env.example`.
First, create a `.env.local` and copy the content from `.env.example` inside.
Then:

## 🔑 Environment Variables

In this section, you will learn how to configure correctly the enviroment variables.

| Variable | Guide |
| -- | -- |
|`AUTH_SECRET` | https://authjs.dev/getting-started/installation?framework=nextjs#setup-environment|
|`AUTH_DRIZZLE_URL` | https://authjs.dev/getting-started/adapters/drizzle#configuration|
|`TURSO_CONNECTION_URL` & `TURSO_AUTH_TOKEN` | https://orm.drizzle.team/learn/tutorials/drizzle-with-turso#setup-turso-and-drizzle-orm|

[apps/web]: /apps/web
[packages/db]: /packages/db