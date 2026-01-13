import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import type { Screen, PolyCanvasSession } from '@/types'
import { LandingScreen } from '@/components/screens/LandingScreen'
import { CanvasScreen } from '@/components/screens/CanvasScreen'
import { ResultScreen } from '@/components/screens/ResultScreen'
import { AboutPage } from '@/components/pages/AboutPage'
import { HowToUsePage } from '@/components/pages/HowToUsePage'
import { PrivacyPage } from '@/components/pages/PrivacyPage'
import { TermsPage } from '@/components/pages/TermsPage'

function MainApp() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [session, setSession] = useState<PolyCanvasSession | null>(null)

  const handleStart = (newSession: PolyCanvasSession) => {
    setSession(newSession)
    setScreen('canvas')
  }

  const handleFinish = (finishedSession: PolyCanvasSession) => {
    setSession(finishedSession)
    setScreen('result')
  }

  const handleRestart = () => {
    setSession(null)
    setScreen('landing')
  }

  return (
    <div className="min-h-full bg-neutral-900 text-white">
      {screen === 'landing' && (
        <LandingScreen onStart={handleStart} />
      )}
      {screen === 'canvas' && session && (
        <CanvasScreen
          initialSession={session}
          onFinish={handleFinish}
        />
      )}
      {screen === 'result' && session && (
        <ResultScreen
          session={session}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-to-use" element={<HowToUsePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
