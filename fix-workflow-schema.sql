-- Fix requests table status constraint to include 'assigned'
ALTER TABLE requests DROP CONSTRAINT IF EXISTS requests_status_check;
ALTER TABLE requests ADD CONSTRAINT requests_status_check 
CHECK (status IN ('pending', 'assigned', 'accepted', 'in_progress', 'completed', 'cancelled', 'rejected'));

-- Add assignment tracking fields
ALTER TABLE requests ADD COLUMN IF NOT EXISTS assigned_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS accepted_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS rejected_at TIMESTAMP WITH TIME ZONE;

-- Create notifications table for persistent tracking
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policy for notifications
CREATE POLICY "Users can view their own notifications" ON notifications 
FOR SELECT USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_requests_worker_status ON requests(worker_id, status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);