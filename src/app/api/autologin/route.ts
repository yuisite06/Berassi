import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const SLUGS: Record<string, string> = {
  'bete': 'bete@berassi.com',
  'simone': 'simone@berassi.com',
  'tom': 'tom@berassi.com',
  'talita-rosan': 'talitarosan@berassi.com',
  'renata': 'renata@berassi.com',
  'talita': 'talita@berassi.com',
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')
  const email = SLUGS[slug ?? '']
  if (!email) return NextResponse.json({ error: 'not found' }, { status: 404 })

  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email,
  })

  if (error || !data.properties?.action_link) {
    return NextResponse.json({ error: error?.message }, { status: 500 })
  }

  return NextResponse.redirect(data.properties.action_link)
}