'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function ProAutoLogin() {
  const { slug } = useParams()

  useEffect(() => {
    window.location.href = `/api/autologin?slug=${slug}`
  }, [slug])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0d0d0d', backgroundImage: "url('/marble-bg.png')", backgroundSize: 'cover' }}>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)' }} />
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <Image src="/logo.png" alt="BERASSI" width={90} height={90} />
        <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid rgba(201,168,76,0.3)', borderTopColor: '#C9A84C', animation: 'spin 1s linear infinite' }} />
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}