-- Insert test admin user
INSERT INTO users (email, password, name, role) VALUES 
('admin@test.com', 'admin123', 'Admin User', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert test regular user  
INSERT INTO users (email, password, name, role) VALUES 
('user@test.com', 'user123', 'Test User', 'user')
ON CONFLICT (email) DO NOTHING;

-- Insert test worker
INSERT INTO workers (email, password, name, service_type, phone, location) VALUES 
('worker@test.com', 'worker123', 'Test Worker', 'electrician', '1234567890', 'Test City')
ON CONFLICT (email) DO NOTHING;