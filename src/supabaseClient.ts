import { createClient } from '@supabase/supabase-js'

// Get these from your Supabase project settings
const supabaseUrl = "https://vjrlzvharbapdffpkund.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqcmx6dmhhcmJhcGRmZnBrdW5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1OTI4NDksImV4cCI6MjA2ODE2ODg0OX0.sk30E0qF4-Fa3Ul3ykAgT3ve8gISwkBfsNUoE1k9ph8"

// Create a single supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
