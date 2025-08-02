import { Clock } from 'modules/TimeDisplay/components/Clock'
import styles from './TimeDisplay.module.scss'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { type TimeDisplayRefHandle } from './types'
import { useAnimationContext } from 'context/AnimationContext'
import { useCurrentTime } from 'modules/TimeDisplay/hooks/useCurrentTime'
import { useTimeDisplay } from 'modules/TimeDisplay/hooks/useTimeDisplay/useTimeDisplay'
import { iterateTimes } from 'modules/TimeDisplay/animation/iterateTimes'
import { totalHeight, totalWidth } from './grid'
import { getClockMetadata } from './animation/getClockMetadata'

export const TimeDisplay = forwardRef<TimeDisplayRefHandle>((_, ref) => {
  const { currentTime, previousTime } = useCurrentTime()
  const { animating, setInitialAnimating } = useAnimationContext()
  const manualTime = useRef<Date>(undefined)

  const [ranInitialLoadingAnimation, setRanInitialLoadingAnimation] = useState(false)

  const { initialiseClock, easeToTime, runLoadingAnimation } = useTimeDisplay({
    currentTime
  })

  useEffect(() => {
    if (!ranInitialLoadingAnimation) {
      runLoadingAnimation()
      setRanInitialLoadingAnimation(true)
    }
  }, [ranInitialLoadingAnimation, runLoadingAnimation])

  useEffect(() => {
    if (!animating && !manualTime.current) {
      const currentMinute = currentTime.getMinutes()
      const previousMinute = previousTime?.getMinutes()

      const currentTimeHasLapsedTheMinute = previousMinute && currentMinute !== previousMinute

      if (currentTimeHasLapsedTheMinute) {
        easeToTime(currentTime)
      }
    }
  }, [animating, currentTime, easeToTime, previousTime])

  useImperativeHandle(ref, () => ({
    replayLoadingAnimation: () => {
      setInitialAnimating(true)
      runLoadingAnimation()
    },
    setManualTime: (time?: Date) => {
      manualTime.current = time
      easeToTime(time ?? currentTime)
    }
  }))

  return (
    <div className={styles.TimeDisplay}>
      {iterateTimes(totalWidth).flatMap((x: number) => (
        <div className={styles.TimeDisplay__Column} key={`row-${x}`}>
          {iterateTimes(totalHeight).map((y: number) => {
            const { digit, isColon } = getClockMetadata({
              time: manualTime.current ?? currentTime,
              x,
              y
            })

            const clockId = `(${x},${y})`
            const clockRef = initialiseClock({
              id: clockId,
              isDigit: Boolean(digit),
              isColon
            })

            return (
              <Clock
                id={clockId}
                ref={clockRef}
                colon={isColon}
                digit={digit}
                position={{ x, y }}
                key={`clock-${x}-${y}`}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
})