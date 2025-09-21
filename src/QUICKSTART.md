# GlowUp Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Visit [http://localhost:3000](http://localhost:3000)

## 🔧 Getting Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings > API
4. Copy your Project URL and anon key

## 🐛 Troubleshooting

### Login Issues
- Check the health status in the bottom-right corner (development only)
- Verify your Supabase credentials are correct
- Make sure Edge Functions are deployed

### Social Auth Not Working
- Set up Pinterest/X apps with correct redirect URLs
- Enable providers in Supabase dashboard
- Follow provider-specific setup guides

### Build Errors
```bash
rm -rf node_modules
npm install
npm run build
```

## 📚 Key Files

- `/App.tsx` - Main application component
- `/components/` - All React components
- `/utils/supabase/` - Supabase configuration
- `/supabase/functions/server/` - Backend API

## 🎯 Next Steps

1. Deploy Edge Functions: `supabase functions deploy server`
2. Set up social authentication
3. Deploy to Vercel/Netlify
4. Configure custom domain

Need help? Check out the full [README.md](./README.md) and [DEPLOYMENT.md](./DEPLOYMENT.md)!