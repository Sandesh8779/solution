-- Add missing fields to requests table for complete workflow
ALTER TABLE requests ADD COLUMN IF NOT EXISTS date TEXT;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS assigned_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS accepted_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS rejected_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE requests ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;

-- Fix status constraint to include all workflow statuses
ALTER TABLE requests DROP CONSTRAINT IF EXISTS requests_status_check;
ALTER TABLE requests ADD CONSTRAINT requests_status_check 
CHECK (status IN ('pending', 'assigned', 'accepted', 'in_progress', 'completed', 'cancelled', 'rejected'));

-- Add missing password field to workers table (for login)
ALTER TABLE workers ADD COLUMN IF NOT EXISTS password TEXT;

-- Create notifications table for persistent tracking
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id INTEGER NOT NULL, -- References users.id or workers.id
  user_type TEXT NOT NULL CHECK (user_type IN ('user', 'worker', 'admin')),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  request_id UUID REFERENCES requests(id),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assignment history table
CREATE TABLE IF NOT EXISTS assignment_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id UUID REFERENCES requests(id) NOT NULL,
  worker_id INTEGER REFERENCES workers(id),
  assigned_by INTEGER REFERENCES users(id),
  action TEXT NOT NULL CHECK (action IN ('assigned', 'accepted', 'rejected', 'completed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_requests_worker_status ON requests(worker_id, status);
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_assignment_history_request ON assignment_history(request_id);

-- Enable RLS for new tables
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own notifications" ON notifications 
FOR SELECT USING (true); -- Simplified for now

CREATE POLICY "Anyone can view assignment history" ON assignment_history 
FOR SELECT USING (true); -- Simplified for now