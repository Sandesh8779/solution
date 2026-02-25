-- ============================================
-- DATABASE SETUP FOR SOLUTION FOR U
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create workers table
CREATE TABLE workers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  service_type TEXT NOT NULL,
  location TEXT,
  profiletype INTEGER DEFAULT 1,
  availability BOOLEAN DEFAULT true,
  rating DECIMAL(2,1) DEFAULT 0.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create service_categories table
CREATE TABLE service_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create requests table
CREATE TABLE requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  worker_id UUID,
  service_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  details TEXT NOT NULL,
  location TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  date TEXT,
  assigned_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  rejected_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create notifications table
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_type TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  request_id UUID,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Insert service categories
INSERT INTO service_categories (id, name, icon) VALUES
('electrician', 'Electrician', 'Zap'),
('plumber', 'Plumber', 'Droplet'),
('carpenter', 'Carpenter', 'Hammer'),
('cleaner', 'Cleaner', 'Sparkles'),
('painter', 'Painter', 'Brush'),
('repair', 'Repair', 'Wrench'),
('gas-pipeline', 'Gas Pipeline', 'Flame'),
('motor-repair', 'Motor Repair', 'Settings'),
('bathroom-cleaner', 'Bathroom Cleaner', 'Bath'),
('tank-sump-cleaner', 'Tank Sump Cleaner', 'Droplets');

-- 7. Insert test workers
INSERT INTO workers (email, password, name, phone, service_type, location, profiletype) 
VALUES ('worker@example.com', 'password', 'John Worker', '1234567890', 'plumber', 'New York', 1);

INSERT INTO workers (email, password, name, phone, service_type, location, profiletype) 
VALUES ('worker2@example.com', 'password', 'Jane Electrician', '1234567891', 'electrician', 'Los Angeles', 1);

-- 8. Insert test users
INSERT INTO users (email, password, name, role, location) 
VALUES ('admin@example.com', 'password', 'Admin User', 'admin', 'New York');

INSERT INTO users (email, password, name, role, location) 
VALUES ('user@example.com', 'password', 'Regular User', 'user', 'Los Angeles');

-- 9. Disable RLS
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE workers DISABLE ROW LEVEL SECURITY;
ALTER TABLE requests DISABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE notifications DISABLE ROW LEVEL SECURITY;

-- 10. Create indexes
CREATE INDEX idx_workers_service_type ON workers(service_type);
CREATE INDEX idx_requests_status ON requests(status);
CREATE INDEX idx_requests_user_id ON requests(user_id);
CREATE INDEX idx_requests_worker_id ON requests(worker_id);

-- DONE!
