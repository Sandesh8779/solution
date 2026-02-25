-- Check what users exist
SELECT * FROM users;

-- Check what workers exist  
SELECT * FROM workers;

-- Delete any existing test users and insert fresh ones
DELETE FROM users WHERE email IN ('admin@test.com', 'user@test.com');
DELETE FROM workers WHERE email = 'worker@test.com';

-- Insert fresh test accounts
INSERT INTO users (email, password, name, role) VALUES 
('admin@test.com', 'admin123', 'Admin User', 'admin'),
('user@test.com', 'user123', 'Test User', 'user');

INSERT INTO workers (email, password, name, service_type) VALUES 
('worker@test.com', 'worker123', 'Test Worker', 'electrician');