# GlowUp Deployment Guide

This guide covers how to deploy GlowUp to various platforms and set up the required services.

## 🚀 Quick Deploy Options

### Vercel (Recommended)

1. **Push to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/glowup-app.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project
   - Add environment variables:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
   - Deploy!

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your Git repository for continuous deployment
   - Add environment variables in Site Settings > Environment Variables

## 🔧 Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready
4. Go to Settings > API to get your keys

### 2. Deploy Edge Functions

Install Supabase CLI:
```bash
npm install -g supabase
```

Login and link project:
```bash
supabase login
supabase link --project-ref your-project-ref
```

Deploy the server function:
```bash
supabase functions deploy server
```

### 3. Configure Environment Variables

In Supabase Dashboard > Edge Functions > Settings, add:
- `SUPABASE_URL`: Your project URL
- `SUPABASE_ANON_KEY`: Your anon key
- `SUPABASE_SERVICE_ROLE_KEY`: Your service role key (from Settings > API)

### 4. Set up Social Authentication

#### Pinterest Integration

1. Go to [Pinterest Developers](https://developers.pinterest.com/)
2. Create a new app
3. In "Redirect URIs", add: `https://your-project.supabase.co/auth/v1/callback`
4. Copy your App ID and Secret
5. In Supabase Dashboard:
   - Go to Authentication > Providers
   - Enable Pinterest
   - Add your Pinterest App ID and Secret
   - Save configuration

#### X (Twitter) Integration

1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app
3. In "Callback URLs", add: `https://your-project.supabase.co/auth/v1/callback`
4. Copy your Client ID and Client Secret
5. In Supabase Dashboard:
   - Go to Authentication > Providers
   - Enable Twitter
   - Add your Twitter Client ID and Secret
   - Save configuration

**Important:** After setting up social providers, users must complete the provider setup by following the official documentation links, otherwise they'll see "provider is not enabled" errors.

## 🌐 Environment Variables

### For Frontend (.env)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_URL=https://your-domain.com
```

### For Supabase Edge Functions
Set these in Supabase Dashboard > Edge Functions > Settings:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 🔍 Troubleshooting

### Login Issues

1. **Check your Supabase URL and keys are correct**
2. **Verify Edge Function is deployed and running**
   ```bash
   curl https://your-project.supabase.co/functions/v1/make-server-40db5d3a/health
   ```
3. **Check browser console for errors**
4. **Verify CORS is configured correctly**

### Social Auth Issues

1. **Verify redirect URLs match exactly** (include https://)
2. **Check provider credentials are correct**
3. **Ensure providers are enabled in Supabase**
4. **Complete provider setup following official docs**

### Build Issues

1. **Clear node_modules and reinstall**
   ```bash
   rm -rf node_modules
   npm install
   ```

2. **Check TypeScript errors**
   ```bash
   npm run type-check
   ```

3. **Verify all dependencies are installed**

## 📊 Performance Optimization

### For Production

1. **Enable compression** (Vercel/Netlify do this automatically)
2. **Configure caching headers**
3. **Optimize images** using next-gen formats
4. **Monitor Core Web Vitals**

### Supabase Optimization

1. **Enable Row Level Security (RLS)** when you add custom tables
2. **Create indexes** for frequently queried data
3. **Use connection pooling** for high traffic
4. **Monitor performance** in Supabase Dashboard

## 🔒 Security Checklist

- [ ] Environment variables are set correctly
- [ ] Service role key is never exposed to frontend
- [ ] CORS is configured properly
- [ ] Social auth redirect URLs are exact matches
- [ ] SSL/HTTPS is enabled on your domain
- [ ] API endpoints validate user authentication

## 📱 Domain Setup

### Custom Domain on Vercel

1. Go to your project settings
2. Add your custom domain
3. Configure DNS records as shown
4. Update `VITE_APP_URL` environment variable

### Custom Domain on Netlify

1. Go to Domain settings
2. Add custom domain
3. Update DNS records
4. Enable HTTPS
5. Update environment variables

## 🚨 Emergency Rollback

If something goes wrong:

1. **Revert to previous deployment** (available in Vercel/Netlify dashboard)
2. **Check environment variables** are set correctly
3. **Verify Supabase services** are running
4. **Check recent changes** in git history

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Look at browser console and network tabs
3. Check Supabase logs in the dashboard
4. Review deployment platform logs
5. Create an issue in the repository with detailed information

Remember to never share your service role key publicly!