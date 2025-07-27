import { TimeDisplay } from 'modules/TimeDisplay'
import styles from './Layout.module.scss'
import { useThemeContext } from 'context/ThemeContext'
import { SettingsButton } from 'modules/ConfigurationDrawer/components/SettingsButton'
import { useDisclosure } from '@mantine/hooks'
import { ConfigurationDrawer } from 'modules/ConfigurationDrawer'
import { MantineProvider } from '@mantine/core'

export const Layout = () => {
  const { themeColours } = useThemeContext()

  const [opened, { open, close }] = useDisclosure(false)

  return (
    <MantineProvider
      theme={{ fontFamily: 'JetBrains Mono' }}
      defaultColorScheme={themeColours.mantineColourScheme}
    >
      <div
        className={styles.Container}
        style={{ backgroundColor: themeColours.backgroundColour }}
      >
        <ConfigurationDrawer
          opened={opened}
          onClose={close}
        />

        <SettingsButton
          onClick={open}
          className={styles.SettingsButton}
        />

        <TimeDisplay />
      </div>
    </MantineProvider>
  )
}