import { useState } from 'react'
import type { Screen, PolyCanvasSession } from '@/types'
import { LandingScreen } from '@/components/screens/LandingScreen'
import { CanvasScreen } from '@/components/screens/CanvasScreen'
import { ResultScreen } from '@/components/screens/ResultScreen'

function App() {
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

export default App
