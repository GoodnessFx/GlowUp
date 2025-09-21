# GlowUp - Referral & Rewards Marketplace

A premium referral and rewards marketplace for fashion, skincare, and fitness where users post requests for style advice and others respond with referrals to earn points, badges, and money.

## ✨ Features

- **User Authentication** with social login (Pinterest, X/Twitter)
- **Post GlowUp Requests** for style, skincare, and fitness advice
- **Social Feed** with upvoting, comments, and engagement
- **Gamification System** with points, levels, and badges
- **Leaderboards** and achievements
- **User Profiles** with comprehensive stats
- **Premium Design** with glassmorphism effects and modern UI

## 🚀 Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + shadcn/ui components
- **Animation:** Motion (Framer Motion)
- **Backend:** Supabase (Database, Auth, Edge Functions)
- **Server:** Hono.js (Edge Function API)

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/glowup-app.git
   cd glowup-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Supabase credentials in the `.env` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_APP_URL=http://localhost:3000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🔧 Supabase Setup

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from Settings > API

### 2. Set up Edge Functions
The backend runs on Supabase Edge Functions. Deploy the server function:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy edge functions
supabase functions deploy server
```

### 3. Configure Environment Variables in Supabase
In your Supabase dashboard, go to Edge Functions > Settings and add:
- `SUPABASE_URL`: Your project URL
- `SUPABASE_ANON_KEY`: Your anon key  
- `SUPABASE_SERVICE_ROLE_KEY`: Your service role key

### 4. Set up Social Authentication (Optional)

#### Pinterest Integration:
1. Go to [Pinterest Developers](https://developers.pinterest.com/)
2. Create a new app
3. Add redirect URL: `https://your-project.supabase.co/auth/v1/callback`
4. In Supabase Dashboard > Authentication > Providers, enable Pinterest
5. Add your Pinterest App ID and Secret

#### X (Twitter) Integration:
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app
3. Add redirect URL: `https://your-project.supabase.co/auth/v1/callback`
4. In Supabase Dashboard > Authentication > Providers, enable Twitter
5. Add your Twitter Client ID and Secret

## 📁 Project Structure

```
├── src/
│   └── main.tsx              # App entry point
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── auth-modal.tsx        # Authentication modal
│   ├── landing-hero.tsx      # Landing page hero
│   ├── glowup-feed.tsx       # Main feed component
│   ├── user-profile.tsx      # User profile page
│   ├── leaderboard.tsx       # Leaderboard component
│   └── post-request.tsx      # Post request modal
├── supabase/
│   └── functions/
│       └── server/           # Edge function backend
├── utils/
│   └── supabase/             # Supabase client utilities
├── styles/
│   └── globals.css           # Global styles and Tailwind config
└── App.tsx                   # Main app component
```

## 🎨 Design System

The app uses a premium color scheme:
- **Electric Purple:** `#8B5CF6`
- **Neon Pink:** `#EC4899`  
- **Aqua Blue:** `#22D3EE`
- **Rich Black:** `#0A0A0A`

Glassmorphism effects and smooth animations throughout the UI create an addictive, premium experience.

## 🚢 Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables
4. Set up continuous deployment

### Other Platforms
The app builds to static files and can be deployed on any static hosting service.

## 🔐 Environment Variables

Create a `.env` file with these variables:

```env
# Required
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional
VITE_APP_URL=https://your-domain.com
```

## 📱 Features Walkthrough

### Authentication
- Email/password signup and login
- Social login with Pinterest and X (Twitter)
- Automatic user profile creation

### Feed System
- Post requests for style advice
- Browse and respond to others' requests
- Upvote helpful responses
- Comment on posts

### Gamification
- Earn points for helping others
- Level up and unlock badges
- Compete on leaderboards
- Track your impact and stats

### User Profiles
- View comprehensive user stats
- See badges and achievements
- Track points and level progress

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/yourusername/glowup-app/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the backend infrastructure
- [shadcn/ui](https://ui.shadcn.com) for the beautiful components
- [Tailwind CSS](https://tailwindcss.com) for the styling system
- [Motion](https://motion.dev) for smooth animations