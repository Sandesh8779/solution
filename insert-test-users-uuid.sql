-- Insert test credentials for your users table
INSERT INTO users (email, password, name, role) VALUES 
('admin@test.com', 'admin123', 'Admin User', 'admin'),
('user@test.com', 'user123', 'Test User', 'user')
ON CONFLICT (email) DO NOTHING;

-- Insert test worker in workers table (if it exists)
INSERT INTO workers (email, password, name, service_type, phone, location) VALUES 
('worker@test.com', 'worker123', 'Test Worker', 'electrician', '1234567890', 'Test City')
ON CONFLICT (email) DO NOTHING;