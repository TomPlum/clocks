import './App.css'
import { TimeDisplay } from './components/TimeDisplay'
import { DigitDisplay } from './components/Clock/DigitDisplay.tsx'

const App = () => (
  <div>
    <TimeDisplay />
    {Array.from({ length: 10 }, (_, i) => i).map((_, i) => (
      <DigitDisplay digit={i} key={i} />
    ))}
  </div>
)

export default App
