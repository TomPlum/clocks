import { TimePicker } from '@mantine/dates'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { useEffect, useMemo, useState } from 'react'

export const ManualTimeSelector = () => {
  const { manualTime, setManualTime } = useConfigContext()

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const value = useMemo<string>(() => {
    if (!manualTime)  {
      return `${currentTime.getHours()}:${currentTime.getMinutes()}`
    }

    const date = new Date(manualTime)
    return `${date.getHours()}:${date.getMinutes()}`
  }, [currentTime, manualTime])

  return (
    <TimePicker
      clearable
      value={value}
      onChange={(value) => {
        if (value === '') {
          setManualTime(undefined)
        } else {
          const [hours, minutes, seconds] = value.split(':').map(Number)
          const date = new Date()
          date.setHours(hours, minutes, seconds, 0)
          setManualTime(date ?? undefined)
        }
      }}
    />
  )
}