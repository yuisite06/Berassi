'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const SLUGS: Record<string, string> = {
  'bete': 'bete@berassi.com',
  'simone': 'simone@berassi.com',
  'tom': 'tom@berassi.com',
  'talita-rosan': 'talitarosan@berassi.com',
  'renata': 'renata@berassi.com',
  'talita': 'talita@berassi.com',
}

const PASSWORDS: Record<string, string> = {
  'bete': 'Bete@123',
  'simone': 'Simone@123',
  'tom': 'Tom@123',
  'talita-rosan': 'TalitaRosan@123',
  'renata': 'Renata86425051',
  'talita': 'Talita@123',
}

export default function ProAutoLogin() {
  const { slug } = useParams()
  const router = useRouter()

  useEffect(() => {
    async function login() {
      const email = SLUGS[slug as string]
      const password = PASSWORDS[slug as string]
      if (!email) { router.replace('/'); return }
      await supabase.auth.signOut()
      await supabase.auth.signInWithPassword({ email, password })
      router.replace('/painel')
    }
    login()
  }, [slug, router])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0d0d' }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid rgba(201,168,76,0.3)', borderTopColor: '#C9A84C', animation: 'spin 1s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}