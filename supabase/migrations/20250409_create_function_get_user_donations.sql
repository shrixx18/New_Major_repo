
-- Create a function to get user donations with old age home names
CREATE OR REPLACE FUNCTION public.get_user_donations(user_uuid UUID)
RETURNS TABLE (
  id UUID,
  created_at TIMESTAMPTZ,
  amount NUMERIC,
  user_id UUID,
  old_age_home_id UUID,
  old_age_home_name TEXT,
  status TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d.id,
    d.created_at,
    d.amount,
    d.user_id,
    d.old_age_home_id,
    d.old_age_home_name,
    d.status
  FROM 
    public.donations d
  WHERE 
    d.user_id = user_uuid
  ORDER BY 
    d.created_at DESC;
END;
$$;
