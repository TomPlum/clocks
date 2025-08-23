import { Clock } from 'modules/TimeDisplay/components/Clock'
import styles from './TimeDisplay.module.scss'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { type TimeDisplayPattern, type TimeDisplayRefHandle } from './types'
import { useAnimationContext } from 'context/AnimationContext'
import { useCurrentTime } from 'modules/TimeDisplay/hooks/useCurrentTime'
import { useTimeDisplay } from 'modules/TimeDisplay/hooks/useTimeDisplay/useTimeDisplay'
import { iterateTimes } from 'modules/TimeDisplay/animation/iterateTimes'
import { getClockMetadata } from './animation/getClockMetadata'
import { useThemeContext } from 'context/ThemeContext'

export const TimeDisplay = forwardRef<TimeDisplayRefHandle>((_, ref) => {
  const { isMobile } = useThemeContext()
  const { currentTime, previousTime } = useCurrentTime()
  const { animating, setInitialAnimating } = useAnimationContext()

  const manualTime = useRef<Date>(undefined)

  const [ranInitialLoadingAnimation, setRanInitialLoadingAnimation] = useState(false)

  const {
    easeToTime,
    easeToPattern,
    gridDimensions: {
      width, height
    },
    initialiseClock,
    resetDigitClocks,
    runLoadingAnimation,
  } = useTimeDisplay({
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
      const isDifferentMinute = currentMinute !== previousMinute

      const hasLapsedMinute = previousMinute && isDifferentMinute

      if (hasLapsedMinute) {
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
    },
    changePattern: (pattern: TimeDisplayPattern) => {
      resetDigitClocks(manualTime.current ?? currentTime)
      easeToPattern(pattern)
    }
  }))

  return (
    <div className={styles.TimeDisplay}>
      {iterateTimes(width).flatMap((x: number) => (
        <div className={styles.TimeDisplay__Column} key={`row-${x}`}>
          {iterateTimes(height).map((y: number) => {
            const clockId = `(${x},${y})`

            const { digit, isColon, isColonCenterLine } = getClockMetadata({
              time: manualTime.current ?? currentTime,
              x,
              y,
              vertical: isMobile
            })

            const clockRef = initialiseClock({
              id: clockId,
              isCenterLine: isColonCenterLine,
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