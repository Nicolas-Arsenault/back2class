'use client';

import { createClient } from '@/utils/supabase/client';
import React from 'react'

async function page() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()

  
  return (
    <div>
      Welcome!
    </div>
  )
}

export default page
