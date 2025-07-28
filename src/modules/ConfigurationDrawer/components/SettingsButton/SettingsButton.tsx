import type { SettingsButtonProps } from './types'
import { ActionIcon } from '@mantine/core'
import styles from './SettingsButton.module.scss'
import classNames from 'classnames'
import { useThemeContext } from 'context/ThemeContext'
import { IconSettings } from '@tabler/icons-react'

export const SettingsButton = ({ onClick, className }: SettingsButtonProps) => {
  const { themeColours } = useThemeContext()

  return (
    <ActionIcon
      onClick={onClick}
      variant='transparent'
      title='Open Settings'
      className={classNames(className, styles.Button)}
    >
      <IconSettings
        className={styles.Button__Icon}
        style={{
          color: themeColours.settingsButtonColour
        }}
      />
    </ActionIcon>
  )
}