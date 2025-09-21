import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from 'npm:@supabase/supabase-js';
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client with service role key
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-40db5d3a/health", (c) => {
  return c.json({ status: "ok" });
});

// User signup endpoint
app.post("/make-server-40db5d3a/signup", async (c) => {
  try {
    const { email, password, username } = await c.req.json();
    
    if (!email || !password || !username) {
      return c.json({ error: "Email, password, and username are required" }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        username,
        level: 1,
        points: 0,
        badge: 'Newbie'
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Store additional user data in KV store
    if (data.user) {
      await kv.set(`user:${data.user.id}`, {
        id: data.user.id,
        username,
        email,
        points: 0,
        level: 1,
        badge: 'Newbie',
        created_at: new Date().toISOString(),
        helped_people: 0,
        responses_given: 0,
        upvotes_received: 0,
        requests_posted: 0
      });
    }

    return c.json({ 
      message: "User created successfully",
      user: data.user 
    });
  } catch (error) {
    console.log('Server error during signup:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get user profile endpoint
app.get("/make-server-40db5d3a/user/:userId", async (c) => {
  try {
    const userId = c.req.param('userId');
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // Verify user is authenticated
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user:${userId}`);
    if (!userData) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json(userData);
  } catch (error) {
    console.log('Error fetching user:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update user points endpoint
app.post("/make-server-40db5d3a/user/:userId/points", async (c) => {
  try {
    const userId = c.req.param('userId');
    const { points, action } = await c.req.json();
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // Verify user is authenticated
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user:${userId}`);
    if (!userData) {
      return c.json({ error: 'User not found' }, 404);
    }

    // Update points and stats
    const updatedUser = {
      ...userData,
      points: userData.points + points,
      [`${action}_count`]: (userData[`${action}_count`] || 0) + 1
    };

    // Update level based on points
    const newLevel = Math.floor(updatedUser.points / 150) + 1;
    if (newLevel !== updatedUser.level) {
      updatedUser.level = newLevel;
      // Update level title
      const levelTitles = {
        1: 'Newbie', 2: 'Explorer', 3: 'Helper', 4: 'Advisor', 5: 'Stylist',
        6: 'Expert', 7: 'Guru', 8: 'Master', 9: 'Legend', 10: 'Glow Master'
      };
      updatedUser.badge = levelTitles[Math.min(newLevel, 10)] || 'Glow Master';
    }

    await kv.set(`user:${userId}`, updatedUser);
    
    return c.json(updatedUser);
  } catch (error) {
    console.log('Error updating user points:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

Deno.serve(app.fetch);