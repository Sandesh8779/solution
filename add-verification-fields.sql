-- Add verification fields to requests table
ALTER TABLE requests ADD COLUMN photos TEXT[];
ALTER TABLE requests ADD COLUMN videos TEXT[];
ALTER TABLE requests ADD COLUMN verification_status TEXT DEFAULT 'pending';