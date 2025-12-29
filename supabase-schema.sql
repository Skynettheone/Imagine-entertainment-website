-- Supabase Database Schema for IMAGINE Entertainment
-- Run this in Supabase SQL Editor

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  event_date DATE,
  location TEXT,
  description TEXT, -- Internal only, NOT shown publicly
  cover_image_url TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Event images table (gallery images for each event)
CREATE TABLE IF NOT EXISTS event_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Gallery images table (standalone images not tied to events)
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_is_published ON events(is_published);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_event_images_event_id ON event_images(event_id);

-- Row Level Security (RLS) Policies
-- Allow public read access to published events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Public can read published events
CREATE POLICY "Public can read published events" ON events
  FOR SELECT USING (is_published = true);

-- Public can read images from published events
CREATE POLICY "Public can read event images" ON event_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM events 
      WHERE events.id = event_images.event_id 
      AND events.is_published = true
    )
  );

-- Public can read gallery images
CREATE POLICY "Public can read gallery images" ON gallery_images
  FOR SELECT USING (true);

-- Authenticated users can do everything
CREATE POLICY "Authenticated users can manage events" ON events
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage event images" ON event_images
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage gallery images" ON gallery_images
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample event for testing
INSERT INTO events (title, category, event_date, location, cover_image_url, is_published)
VALUES 
  ('CORPORATE SUMMIT 2024', 'Corporate', '2024-01-20', 'Colombo, Sri Lanka', '/corporate-event-stage-blue-lighting-conference.jpg', true);

-- Activity Logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  details JSONB,
  device_info JSONB, -- Stores browser/OS details
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for activity_logs
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Admins can read all logs (assuming authenticated users are admins for this app)
CREATE POLICY "Admins can view activity logs" ON activity_logs
  FOR SELECT USING (auth.role() = 'authenticated');

-- Admins can insert logs
CREATE POLICY "Admins can insert activity logs" ON activity_logs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
