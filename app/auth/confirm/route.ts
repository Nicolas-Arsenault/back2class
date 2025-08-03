import { type EmailOtpType } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'
  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next

  if (token_hash && type) {
    const supabase = await createClient()

    // For email verification (signup), we don't want to log the user in
    if (type === 'signup') {
      // Use verifyOtp for email verification without creating a session
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      })
      
      if (!error) {
        // Sign out the user immediately after verification to prevent auto-login
        await supabase.auth.signOut()
        
        // Redirect to verified page for email verification
        redirectTo.pathname = '/verified'
        return NextResponse.redirect(redirectTo)
      }
    } else {
      // For password reset and other OTP types, use normal flow
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      })
      
      if (!error) {
        return NextResponse.redirect(redirectTo)
      }
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/auth/auth-code-error'
  return NextResponse.redirect(redirectTo)
}