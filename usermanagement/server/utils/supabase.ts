import {createClient} from "@supabase/supabase-js"
const supabaseUrl = "https://clspmhqrujbyekcgvxwz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsc3BtaHFydWpieWVrY2d2eHd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyODEyNzAsImV4cCI6MjA2NDg1NzI3MH0.BFE2xffsfIXetfxVMNtjmpWh8gsOdwJVtthmrMHbIYk"


export const supabase = createClient(supabaseUrl, supabaseKey);
        