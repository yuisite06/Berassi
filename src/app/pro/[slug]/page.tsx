'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

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
  const [error, setError] = useState('')

  useEffect(() => {
    async function login() {
      const email = SLUGS[slug as string]
      const password = PASSWORDS[slug as string]
      if (!email) { router.replace('/'); return }

      // Logout primeiro, espera 1 segundo, depois loga
      await supabase.auth.signOut()
      await new Promise(r => setTimeout(r, 1000))

      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        // Tenta de novo após 2 segundos
        await new Promise(r => setTimeout(r, 2000))
        const { error: error2 } = await supabase.auth.signInWithPassword({ email, password })
        if (error2) { setError('Erro ao entrar. Tente novamente.'); return }
      }

      router.replace('/painel')
    }
    login()
  }, [slug, router])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0d0d0d', backgroundImage: "url('/marble-bg.png')", backgroundSize: 'cover' }}>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)' }} />
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <Image src="/logo.png" alt="BERASSI" width={90} height={90} />
        {error ? (
          <p style={{ color: '#f87171', fontSize: 14 }}>{error}</p>
        ) : (
          <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid rgba(201,168,76,0.3)', borderTopColor: '#C9A84C', animation: 'spin 1s linear infinite' }} />
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}