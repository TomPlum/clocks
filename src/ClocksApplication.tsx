import { ThemeContextProvider } from 'context/ThemeContext'
import { Layout } from 'components/Layout'

const ClocksApplication = () => (
  <ThemeContextProvider>
    <Layout />
  </ThemeContextProvider>
)

export default ClocksApplication
