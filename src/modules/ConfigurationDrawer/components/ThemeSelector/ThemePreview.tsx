import { Clock, type ClockRefHandler } from 'modules/TimeDisplay/components/Clock'
import type { ThemePreviewProps } from './types'
import styles from './ThemePreview.module.scss'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export const ThemePreview = ({ theme, themeColours }: ThemePreviewProps) => {
  const ref = useRef<ClockRefHandler>(null)

  const { t } = useTranslation('translation', {
    keyPrefix: 'configuration-drawer.sections.theming.theme-selector'
  })

  const themeName = t(`themes.${theme}`)

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
        {themeName[0].toUpperCase() + themeName.slice(1)}
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