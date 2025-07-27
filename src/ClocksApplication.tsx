import { ThemeContextProvider } from 'context/ThemeContext'
import { Layout } from 'components/Layout'
import { MantineProvider } from '@mantine/core'

const ClocksApplication = () => (
  <ThemeContextProvider>
    <MantineProvider theme={{ fontFamily: 'JetBrains Mono' }}>
      <Layout />
    </MantineProvider>
  </ThemeContextProvider>
)

export default ClocksApplication
