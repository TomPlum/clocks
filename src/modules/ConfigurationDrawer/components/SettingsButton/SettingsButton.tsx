import type { SettingsButtonProps } from './types'
import { ActionIcon } from '@mantine/core'
import SettingsIcon from 'assets/settings.svg?react'
import styles from './SettingsButton.module.scss'
import classNames from 'classnames'
import { useThemeContext } from 'context/ThemeContext'

export const SettingsButton = ({ onClick, className }: SettingsButtonProps) => {
  const { themeColours } = useThemeContext()

  return (
    <ActionIcon
      onClick={onClick}
      variant='transparent'
      className={classNames(className, styles.Button)}
    >
      <SettingsIcon
        className={styles.Button__Icon}
        style={{
          color: themeColours.settingsButtonColour
        }}
      />
    </ActionIcon>
  )
}