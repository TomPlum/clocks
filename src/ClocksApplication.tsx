import { ThemeContextProvider } from 'context/ThemeContext'
import { Layout } from 'components/Layout'
import { ConfigContextProvider } from 'context/ConfigContext/ConfigContextProvider'
import { type TimeDisplayRefHandle } from 'modules/TimeDisplay'
import { useRef } from 'react'

const ClocksApplication = () => {
  const timeDisplayRef = useRef<TimeDisplayRefHandle>(null)

  return (
    <ThemeContextProvider>
      <ConfigContextProvider onResetTime={() => timeDisplayRef.current?.reset()}>
        <Layout ref={timeDisplayRef} />
      </ConfigContextProvider>
    </ThemeContextProvider>
  )
}

export default ClocksApplication
