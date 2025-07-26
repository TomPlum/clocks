import { TimeDisplay } from './components/TimeDisplay'
import { ThemeContextProvider } from './context/ThemeContext'

const ClocksApplication = () => (
  <ThemeContextProvider>
    <TimeDisplay />
  </ThemeContextProvider>
)

export default ClocksApplication
