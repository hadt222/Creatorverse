-- Run this in Supabase Dashboard → SQL Editor → New query
-- Then click "Run"

-- Option A: Disable RLS on creators (simplest; matches project instructions)
ALTER TABLE creators DISABLE ROW LEVEL SECURITY;

-- Option B: Keep RLS but allow anon access (if you prefer to leave RLS on)
-- Uncomment the lines below and comment out Option A above, then run.

-- CREATE POLICY "Allow public read on creators"
--   ON creators FOR SELECT
--   USING (true);

-- CREATE POLICY "Allow public insert on creators"
--   ON creators FOR INSERT
--   WITH CHECK (true);

-- CREATE POLICY "Allow public update on creators"
--   ON creators FOR UPDATE
--   USING (true)
--   WITH CHECK (true);

-- CREATE POLICY "Allow public delete on creators"
--   ON creators FOR DELETE
--   USING (true);
