import { ThemeContextProvider } from 'context/ThemeContext'
import { Layout } from 'components/Layout'
import { ConfigContextProvider } from 'context/ConfigContext/ConfigContextProvider'
import { type TimeDisplayRefHandle } from 'modules/TimeDisplay'
import { useRef } from 'react'
import { AnimationContextProvider } from 'context/AnimationContext'

const ClocksApplication = () => {
  const timeDisplayRef = useRef<TimeDisplayRefHandle>(null)

  const resetTime = () => {
    timeDisplayRef.current?.reset()
  }

  const handleSetManualTime = (time?: Date) => {
    timeDisplayRef.current?.setManualTime(time)
  }

  return (
    <ThemeContextProvider>
      <ConfigContextProvider onResetTime={resetTime} onSetManualTime={handleSetManualTime}>
        <AnimationContextProvider>
          <Layout ref={timeDisplayRef} />
        </AnimationContextProvider>
      </ConfigContextProvider>
    </ThemeContextProvider>
  )
}

export default ClocksApplication
