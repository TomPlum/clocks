import { Clock } from 'modules/TimeDisplay/components/Clock'
import styles from './TimeDisplay.module.scss'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { getHandDirections, iterateTimes, totalHeight, totalWidth } from './utils'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { type TimeDisplayRefHandle } from './types'
import { useAnimationContext } from 'context/AnimationContext'
import { usePrevious } from '@mantine/hooks'
import { useCurrentTime } from 'modules/TimeDisplay/hooks/useCurrentTime'
import { useTimeDisplay } from 'modules/TimeDisplay/hooks/useTimeDisplay/useTimeDisplay'

export const TimeDisplay = forwardRef<TimeDisplayRefHandle>((_, ref) => {
  const { currentTime, previousTime } = useCurrentTime()

  const { manualTime } = useConfigContext()
  const { animating, setInitialAnimating } = useAnimationContext()
  const previousManualTime = usePrevious(manualTime)

  const { initialiseClock, easeToSelectedTime, runLoadingAnimation } = useTimeDisplay()

  useEffect(() => {
    runLoadingAnimation()
  }, [runLoadingAnimation])

  useEffect(() => {
    if (!animating) {
      const currentMinute = currentTime.getMinutes()
      const previousMinute = previousTime?.getMinutes()

      const currentTimeHasLapsedTheMinute = previousMinute && currentMinute !== previousMinute

      if (currentTimeHasLapsedTheMinute) {
        easeToSelectedTime()
      }
    }
  }, [animating, currentTime, easeToSelectedTime, previousTime])

  useEffect(() => {
    const hasChanged = manualTime !== previousManualTime

    if (hasChanged) {
      easeToSelectedTime()
    }
  }, [easeToSelectedTime, manualTime, previousManualTime])

  useImperativeHandle(ref, () => ({
    reset: () => {
      setInitialAnimating(true)
      runLoadingAnimation()
    }
  }))

  return (
    <div className={styles.TimeDisplay}>
      {iterateTimes(totalWidth).flatMap((x: number) => (
        <div className={styles.TimeDisplay__Column} key={`row-${x}`}>
          {iterateTimes(totalHeight).map((y: number) => {
            const clockId = `(${x},${y})`
            const clockRef = initialiseClock(clockId)

            const { hour, minute, digit, isColon } = getHandDirections({
              time: manualTime ?? currentTime,
              x,
              y
            })

            return (
              <Clock
                id={clockId}
                digit={digit}
                colon={isColon}
                ref={clockRef}
                hourHandAngle={hour}
                minuteHandAngle={minute}
                key={`clock-${x}-${y}`}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
})