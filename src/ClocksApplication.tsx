import { ThemeContextProvider } from 'context/ThemeContext'
import { Layout } from 'components/Layout'
import { ConfigContextProvider } from 'context/ConfigContext/ConfigContextProvider'

const ClocksApplication = () => (
  <ThemeContextProvider>
    <ConfigContextProvider>
      <Layout />
    </ConfigContextProvider>
  </ThemeContextProvider>
)

export default ClocksApplication
