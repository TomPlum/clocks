import { TimePicker } from '@mantine/dates'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { useMemo } from 'react'
import { useCurrentTime } from 'modules/TimeDisplay/hooks/useCurrentTime'

export const ManualTimeSelector = () => {
  const { manualTime, setManualTime } = useConfigContext()

  const { currentTime } = useCurrentTime()

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