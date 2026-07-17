# CORS Audit Seed

This repository contains mock source configuration for a workflow that reads CORS behavior across three layers in request order:

1. Nginx under `infra/nginx/`
2. Express services under `services/`
3. Next.js routes under `web/`

Nginx is the front door and proxies requests to the app layer. Express services handle orders, payments, users, sessions, login, and public config. The Next.js app handles checkout, products, profile, admin export, and newsletter.

The runtime include used by the status route is outside the explicit CODEOWNERS patterns so fallback ownership can be exercised by the audit workflow.
