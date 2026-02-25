-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view their own profile" ON users;
DROP POLICY IF EXISTS "Users can update their own profile" ON users;

-- Create permissive policies for login to work
CREATE POLICY "Allow login access" ON users 
FOR SELECT USING (true);

CREATE POLICY "Allow user updates" ON users 
FOR UPDATE USING (true);

CREATE POLICY "Allow user inserts" ON users 
FOR INSERT WITH CHECK (true);

-- Fix workers table policies
DROP POLICY IF EXISTS "Workers can view their profile" ON workers;
CREATE POLICY "Allow worker login access" ON workers 
FOR SELECT USING (true);

CREATE POLICY "Allow worker updates" ON workers 
FOR UPDATE USING (true);

CREATE POLICY "Allow worker inserts" ON workers 
FOR INSERT WITH CHECK (true);