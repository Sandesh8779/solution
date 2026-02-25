-- Create simple users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  profiletype INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert test users
INSERT INTO users (email, password, name, profiletype) VALUES
('admin@example.com', 'password', 'Admin User', 0),
('worker@example.com', 'password', 'Worker User', 1),
('user@example.com', 'password', 'Regular User', 2);

-- Enable RLS (optional)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations" ON users FOR ALL USING (true);