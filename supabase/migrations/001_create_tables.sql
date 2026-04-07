-- Create proposals table
CREATE TABLE proposals (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                text UNIQUE NOT NULL,
  status              text DEFAULT 'draft', -- draft | sent | viewed
  created_by          uuid REFERENCES auth.users(id),
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now(),

  -- Practice
  dentist_first_name  text,
  dentist_last_name   text,
  practice_name       text,
  city                text,
  state               text,

  -- Sender
  sender_name         text,
  sender_email        text,
  sender_phone        text,
  sender_calendar_url text,

  -- Proposal content
  loom_video_id       text,
  bonus_expiry_date   date,
  bonuses_offered     jsonb, -- [{title, description, value}]

  -- Practice context (AI inputs)
  biggest_concerns    text[],
  services_focus      text[],
  current_marketing   text,
  additional_notes    text,

  -- AI-generated copy
  ai_hero_headline    text,
  ai_mirror_quote     text,
  ai_city_callout     text,

  -- Tracking
  first_opened_at     timestamptz,
  last_opened_at      timestamptz,
  open_count          integer DEFAULT 0
);

-- Create template table
CREATE TABLE template (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  html        text NOT NULL,
  updated_at  timestamptz DEFAULT now(),
  updated_by  uuid REFERENCES auth.users(id),
  is_active   boolean DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE template ENABLE ROW LEVEL SECURITY;

-- RLS Policies for proposals
-- Users can only see their own proposals
CREATE POLICY "Users can view own proposals" ON proposals
  FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Users can insert own proposals" ON proposals
  FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update own proposals" ON proposals
  FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete own proposals" ON proposals
  FOR DELETE
  USING (auth.uid() = created_by);

-- RLS Policies for template
-- All authenticated users can read templates
CREATE POLICY "Authenticated users can view templates" ON template
  FOR SELECT
  TO authenticated
  USING (true);

-- Only service role can update templates (done via server action)
-- No INSERT/UPDATE/DELETE policies for regular users

-- Create indexes for common queries
CREATE INDEX idx_proposals_created_by ON proposals(created_by);
CREATE INDEX idx_proposals_slug ON proposals(slug);
CREATE INDEX idx_proposals_created_at ON proposals(created_at DESC);
CREATE INDEX idx_template_is_active ON template(is_active);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at on proposals
CREATE TRIGGER update_proposals_updated_at
  BEFORE UPDATE ON proposals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger to auto-update updated_at on template
CREATE TRIGGER update_template_updated_at
  BEFORE UPDATE ON template
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
