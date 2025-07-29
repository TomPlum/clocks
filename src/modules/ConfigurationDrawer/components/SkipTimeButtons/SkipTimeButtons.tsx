import { ActionIcon, type DefaultMantineColor } from '@mantine/core'
import { IconRewindBackward15, IconRewindBackward5,
  IconRewindBackward60, IconRewindForward15, IconRewindForward5, IconRewindForward60 } from '@tabler/icons-react'
import styles from './SkipTimeButtons.module.scss'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { useCallback } from 'react'

export const SkipTimeButtons = () => {
  const { manualTime, setManualTime } = useConfigContext()

  const handleRewind = useCallback((minutes: number) => {
    const time = manualTime ?? new Date()
    time.setMinutes(time.getMinutes() - minutes)
    setManualTime(time)
  }, [manualTime, setManualTime])

  const handleForward = useCallback((minutes: number) => {
    const time = manualTime ?? new Date()
    time.setMinutes(time.getMinutes() + minutes)
    setManualTime(time)
  }, [manualTime, setManualTime])

  const backwardColour: DefaultMantineColor = 'yellow'
  const forwardColour: DefaultMantineColor = 'lime'

  return (
    <div className={styles.Container}>
      <div className={styles.Container__Section}>
        <ActionIcon color={backwardColour} size={40} onClick={() => handleRewind(60)}>
          <IconRewindBackward60 />
        </ActionIcon>

        <ActionIcon color={backwardColour} size={40} onClick={() => handleRewind(15)}>
          <IconRewindBackward15 />
        </ActionIcon>

        <ActionIcon color={backwardColour} size={40} onClick={() => handleRewind(5)}>
          <IconRewindBackward5 />
        </ActionIcon>
      </div>

      <div className={styles.Container__Section}>
        <ActionIcon color={forwardColour} size={40} onClick={() => handleForward(5)}>
          <IconRewindForward5 />
        </ActionIcon>

        <ActionIcon color={forwardColour} size={40} onClick={() => handleForward(15)}>
          <IconRewindForward15 />
        </ActionIcon>

        <ActionIcon color={forwardColour} size={40} onClick={() => handleForward(60)}>
          <IconRewindForward60 />
        </ActionIcon>
      </div>
    </div>
  )
}