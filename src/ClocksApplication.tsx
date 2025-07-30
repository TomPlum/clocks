import { ThemeContextProvider } from 'context/ThemeContext'
import { Layout } from 'components/Layout'
import { ConfigContextProvider } from 'context/ConfigContext/ConfigContextProvider'
import { type TimeDisplayRefHandle } from 'modules/TimeDisplay'
import { useRef } from 'react'
import { AnimationContextProvider } from 'context/AnimationContext'

const ClocksApplication = () => {
  const timeDisplayRef = useRef<TimeDisplayRefHandle>(null)

  return (
    <ThemeContextProvider>
      <ConfigContextProvider onResetTime={() => timeDisplayRef.current?.reset()}>
        <AnimationContextProvider>
          <Layout ref={timeDisplayRef} />
        </AnimationContextProvider>
      </ConfigContextProvider>
    </ThemeContextProvider>
  )
}

export default ClocksApplication
