# Expense Tracker - Setup Guide

## Quick Start (2 minutes)

### Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Click **New Project** → give it a name like "expense-tracker"
3. Set a database password (save it)
4. Choose a region close to you
5. Wait ~30 seconds for the project to be ready

### Step 2: Create the Database Table
1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Paste this SQL and click **Run**:

```sql
CREATE TABLE expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  category TEXT NOT NULL,
  payment_mode TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all" ON expenses FOR ALL USING (true) WITH CHECK (true);
```

### Step 3: Get Your Keys
1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy these two values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

### Step 4: Update the App
1. Open `script.js`
2. Replace these two lines at the top:

```js
const SUPABASE_URL = 'YOUR_SUPABASE_URL';      // ← paste your URL
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // ← paste your key
```

### Step 5: Open the App
Just open `index.html` in any browser. Works on mobile too!

## Features
- Add expenses with date, amount, category, payment mode, and notes
- Filter by category and month
- Monthly category-wise summary with visual bars
- Payment mode breakdown per month
- Delete expenses
- Data persists in cloud — accessible from any device

## Categories
Food & Dining, Transport, Shopping, Bills & Utilities, Entertainment, Health, Education, Other

## Payment Modes
Cash, UPI, Credit Card, Debit Card, Net Banking, Wallet
