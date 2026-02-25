-- Create users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('user', 'worker', 'admin')) DEFAULT 'user',
  location TEXT,
  service_type TEXT,
  availability BOOLEAN DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create service_categories table
CREATE TABLE service_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create requests table
CREATE TABLE requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  worker_id UUID REFERENCES users(id),
  service_type TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
  details TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert service categories
INSERT INTO service_categories (id, name, icon) VALUES
('electrician', 'Electrician', 'Zap'),
('plumber', 'Plumber', 'Droplet'),
('carpenter', 'Carpenter', 'Hammer'),
('cleaner', 'Cleaner', 'Sparkles'),
('painter', 'Painter', 'Brush'),
('repair', 'Repair', 'Wrench');

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Anyone can view service categories" ON service_categories FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can view their own requests" ON requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Workers can view assigned requests" ON requests FOR SELECT USING (auth.uid() = worker_id);
CREATE POLICY "Users can create requests" ON requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their requests" ON requests FOR UPDATE USING (auth.uid() = user_id);