import { TimeDisplay } from 'components/TimeDisplay'
import styles from './Layout.module.scss'
import { ThemeSelector } from 'components/ThemeSelector'
import { useThemeContext } from 'context/ThemeContext'
import { Drawer } from '@mantine/core'
import { SettingsButton } from 'components/SettingsButton'
import { useDisclosure } from '@mantine/hooks'

export const Layout = () => {
  const { themeColours } = useThemeContext()

  const [opened, { open, close }] = useDisclosure(false)
  
  return (
    <div
      className={styles.Container}
      style={{ backgroundColor: themeColours.backgroundColour }}
    >
      <Drawer opened={opened} onClose={close} title='Configuration' position='right'>
        <ThemeSelector />
      </Drawer>

      <SettingsButton onClick={open} />

      <TimeDisplay />
    </div>
  )
}