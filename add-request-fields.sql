-- Add name and phone fields to requests table
ALTER TABLE requests ADD COLUMN name TEXT;
ALTER TABLE requests ADD COLUMN phone TEXT;