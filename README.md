# 📘 Next.js Project - Complete Setup Guide

This is a **Next.js** project repository. This guide will help you set up and run the project for both development and production environments.

---

## 📁 Clone the Repository

```bash
git clone https://github.com/MasonOnePortal/masonbiz-frontend
cd masonbiz-frontend
```
---

## 📦 Install Dependencies

Make sure you have **Node.js (v18 or later)** and **npm** installed.

```bash
npm install
```

This will install all the required node modules listed in the `package.json` file.

---

## 🔐 Setup Environment Variables

Create a `.env.local` file in the project root and add necessary environment variables. For example:

```env
NEXT_PUBLIC_MAILCHIMP_API_KEY=abc123-us1
NEXT_PUBLIC_MAILCHIMP_LIST_ID=xyz987654321
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_URL=https://www.example.com
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_12345abcdef67890
NODE_TLS_REJECT_UNAUTHORIZED=0
```

> Refer to `.env.sample` if it's available in the repo for required variables.

---

## 🚀 Run the Development Server

To start the development server with hot reloading:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗 Build for Production

To create an optimized production build:

```bash
npm run build
```

This will generate a `.next` directory containing the production-ready files.

---

## 🔄 Start the Production Server

After building the project, start the production server using:

```bash
npm start
```

By default, it runs on [http://localhost:3000](http://localhost:3000). To run on a different port:

```bash
PORT=5000 npm start
```

<!-- ---

## 🧰 Optional: Using PM2 for Production

If you're deploying to a server (like a VPS), use **PM2** to keep the server running in the background:

```bash
npm install -g pm2
npm run build
pm2 start npm --name "nextjs-app" -- start
```

To save and auto-start on system reboot:

```bash
pm2 save
pm2 startup
```

---

## 🔧 Useful Commands

| Command            | Description                         |
|-------------------|-------------------------------------|
| `npm run dev`     | Start development server            |
| `npm run build`   | Build the project for production    |
| `npm start`       | Start the production server         |
| `pm2 start`       | Run production using PM2            |

---

## 📚 Additional Notes

- Make sure your firewall allows access to the port you're running the app on.
- If using **Nginx** as a reverse proxy, configure it to forward traffic to your Next.js app.
- Always restart the server after making changes in `.env.local` or production code.
-->

## 📚 Additional Notes
[Architecture Diagrams Link](https://app.eraser.io/workspace/Ux8HAqE3Acfn4DrUns0r?origin=share)

Happy Coding! 🚀 
