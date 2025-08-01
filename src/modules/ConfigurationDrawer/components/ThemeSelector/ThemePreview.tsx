import { Clock, type ClockRefHandler } from 'modules/TimeDisplay/components/Clock'
import type { ThemePreviewProps } from './types'
import styles from './ThemePreview.module.scss'
import { useEffect, useRef } from 'react'

export const ThemePreview = ({ theme, themeColours }: ThemePreviewProps) => {
  const ref = useRef<ClockRefHandler>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.runAnimation('random', {
        animationDuration: Infinity,
        dontNotify: true
      })
    }
  }, [])

  return (
    <div className={styles.Preview}>
      <p className={styles.Preview__ThemeName}>
        {theme[0].toUpperCase() + theme.slice(1)}
      </p>

      <Clock
        size={30}
        ref={ref}
        position={{ x: 0, y: 0 }}
        id={`${theme}-preview`}
        styles={themeColours.digitClock}
      />
    </div>
  )
}