import { useEffect, useState } from 'react'
import { usePrevious } from '@mantine/hooks'

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const previousTime = usePrevious(currentTime)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return {
    currentTime,
    previousTime
  }
}