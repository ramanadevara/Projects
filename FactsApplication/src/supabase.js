import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://gxuodrypuqpxjsthcafq.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4dW9kcnlwdXFweGpzdGhjYWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5NzU4MjYsImV4cCI6MjAwNzU1MTgyNn0.bqflSDPylsGreZHQ5Hgdg0FF6RbZOSQO1PuXn2C-rWc"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
