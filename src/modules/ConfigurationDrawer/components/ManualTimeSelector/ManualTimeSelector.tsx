import { TimePicker } from '@mantine/dates'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { useMemo } from 'react'

export const ManualTimeSelector = () => {
  const { manualTime, setManualTime } = useConfigContext()

  const value = useMemo(() => {
    if (!manualTime) return undefined

    const date = new Date(manualTime)
    return `${date.getHours()}:${date.getMinutes()}`
  }, [manualTime])

  return (
    <div>
      <label htmlFor='manual-time'>
        Set Manual Time
      </label>

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
    </div>
  )
}