import { Clock } from 'components/Clock'
import type { ThemePreviewProps } from 'components/ThemeSelector/types'
import { HandDirection } from 'components/TimeDisplay'
import styles from './ThemePreview.module.scss'

export const ThemePreview = ({ theme, themeColours }: ThemePreviewProps) => {
  return (
    <div className={styles.Preview}>
      <p className={styles.Preview__ThemeName}>
        {theme[0].toUpperCase() + theme.slice(1)}
      </p>

      <Clock
        size={30}
        animation='random'
        styles={themeColours}
        id={`${theme}-preview`}
        minuteDirection={HandDirection.UP}
        hourDirection={HandDirection.RIGHT}
      />
    </div>
  )
}