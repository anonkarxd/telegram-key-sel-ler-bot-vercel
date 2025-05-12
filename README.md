# Telegram Key Seller Bot (Vercel)

Serverless Telegram Bot deployed on Vercel with PostgreSQL for orders.

## Setup

1. Install Vercel CLI: `npm i -g vercel`
2. Clone repo & install deps:
   ```bash
   git clone https://github.com/anonkarxd/telegram-key-seller-bot
   cd telegram-key-seller-bot-vercel
   npm install
   ```
3. Copy `.env.example` to `.env` & fill in vars:
   - BOT_TOKEN
   - ADMIN_PASSWORD
   - PAYMENT_MODE (manual/auto)
   - APP_URL (https://your-app.vercel.app)
   - DB_URL (from Heroku Postgres)
4. Deploy:
   ```bash
   vercel --prod
   ```
5. Set your Telegram webhook manually (only once):
   ```bash
   curl -F "url=https://your-app.vercel.app/api/bot" https://api.telegram.org/bot<your_token>/setWebhook
   ```

## Endpoints
- `GET /api/health` → healthcheck
- `POST /api/bot` → Telegram webhook
- `GET /api/admin/orders` → list orders (Basic Auth)
- `POST /api/admin/deliver` → mark order delivered (Basic Auth)

## License

MIT
