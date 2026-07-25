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
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function login() {
      const email = SLUGS[slug as string]
      const password = PASSWORDS[slug as string]
      if (!email) { router.replace('/'); return }

      await supabase.auth.signOut()
      await new Promise(r => setTimeout(r, 800))

      let tentativas = 0
      while (tentativas < 5) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (!error) { router.replace('/painel'); return }
        tentativas++
        await new Promise(r => setTimeout(r, 1500 * tentativas))
      }

      setErro('Não foi possível entrar. Tente novamente.')
    }
    login()
  }, [slug, router])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundImage: "url('/marble-bg.png')", backgroundSize: 'cover' }}>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)' }} />
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <Image src="/logo.png" alt="BERASSI" width={90} height={90} />
        {erro ? (
          <>
            <p style={{ color: '#f87171', fontSize: 14 }}>{erro}</p>
            <button onClick={() => { setErro(''); window.location.reload() }} style={{ color: '#C9A84C', fontSize: 13, background: 'none', border: '1px solid rgba(201,168,76,0.4)', padding: '8px 20px', borderRadius: 8, cursor: 'pointer' }}>
              Tentar novamente
            </button>
          </>
        ) : (
          <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid rgba(201,168,76,0.3)', borderTopColor: '#C9A84C', animation: 'spin 1s linear infinite' }} />
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}