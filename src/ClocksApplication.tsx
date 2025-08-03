import { ThemeContextProvider } from 'context/ThemeContext'
import { Layout } from 'components/Layout'
import { ConfigContextProvider } from 'context/ConfigContext/ConfigContextProvider'
import { type TimeDisplayPattern, type TimeDisplayRefHandle } from 'modules/TimeDisplay'
import { useRef } from 'react'
import { AnimationContextProvider } from 'context/AnimationContext'

const ClocksApplication = () => {
  const timeDisplayRef = useRef<TimeDisplayRefHandle>(null)

  const replayLoadingAnimation = () => {
    timeDisplayRef.current?.replayLoadingAnimation()
  }

  const handleSetManualTime = (time?: Date) => {
    timeDisplayRef.current?.setManualTime(time)
  }

  const handleChangeDisplayPattern = (pattern: TimeDisplayPattern) => {
    timeDisplayRef.current?.changePattern(pattern)
  }

  return (
    <ThemeContextProvider>
      <ConfigContextProvider
        onChangeDisplayPattern={handleChangeDisplayPattern}
        onReplayLoadingAnimation={replayLoadingAnimation}
        onSetManualTime={handleSetManualTime}
      >
        <AnimationContextProvider>
          <Layout ref={timeDisplayRef} />
        </AnimationContextProvider>
      </ConfigContextProvider>
    </ThemeContextProvider>
  )
}

export default ClocksApplication
