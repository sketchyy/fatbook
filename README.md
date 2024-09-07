# Fatbook

Small app to track calories for personal use.

Use google account to login:

https://fatbook.pages.dev/

## Infra

* **Cloudflare Pages** - web hosting
* **Supabase** - DB, Auth
* **Google** - Auth Provider

## Running app locally

Install dependencies:

```bash
npm install
```

Run in development mode:

```bash
npm dev
```

Prod build:

```bash
npm build
```

## Check bundle size

```bash
npx vite-bundle-visualizer
```
