# 🎭 XRP Insight Tips

AI-powered insights platform with XRP tipping functionality.

## Features

- ✨ **AI-Powered Summaries**: Submit insights and get AI-generated summaries
- 💎 **XRP Tipping**: Send XRP tips to content creators
- 🚀 **Modern Stack**: Next.js 14 + TypeScript + Tailwind CSS
- 🌙 **Dark Mode**: Beautiful gradient UI with glassmorphism

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI**: OpenAI API (mock implementation for demo)
- **Crypto**: XRP Ledger (xrpl.js)
- **Deployment**: Coolify with nixpacks

## Getting Started

### Local Development

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

## Deployment to Coolify

This app is configured for Coolify deployment using nixpacks:

1. **Repository**: https://github.com/theharkco/xrp-insight-tips
2. **Build Command**: `npm run build`
3. **Start Command**: `npm start`
4. **Environment Variables**:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `XRP_WALLET_SECRET`: Your XRP wallet secret (for production)

### Coolify Configuration

The app uses `nixpacks.toml` for build configuration:

```toml
[phases.setup]
nixPkgs = ["nodejs-20_x"]

[phases.install]
cmds = ["npm ci --only=production"]

[phases.build]
cmds = ["npm run build"]

[options]
path = "."
```

## API Endpoints

- `POST /api/insights` - Generate AI summary
- `POST /api/tips` - Send XRP tip
- `GET /api/tips` - Check API status

## Security Notes

⚠️ **Important**: For production deployment:
- Store XRP wallet secrets in environment variables
- Use proper authentication for API endpoints
- Implement rate limiting
- Add proper error handling

## License

MIT

---

Built with ❤️ by minihark 🎭
v1.2.0