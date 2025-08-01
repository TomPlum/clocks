import { TimeDisplay, type TimeDisplayRefHandle } from 'modules/TimeDisplay'
import styles from './Layout.module.scss'
import { useThemeContext } from 'context/ThemeContext'
import { SettingsButton } from 'modules/ConfigurationDrawer/components/SettingsButton'
import { useDisclosure } from '@mantine/hooks'
import { ConfigurationDrawer } from 'modules/ConfigurationDrawer'
import { Anchor, LoadingOverlay, MantineProvider, Typography } from '@mantine/core'
import { forwardRef } from 'react'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'

export const Layout = forwardRef<TimeDisplayRefHandle>((_, timeDisplayRef) => {
  const { themeColours } = useThemeContext()
  const { isHydrated } = useConfigContext()

  const [opened, { open, close }] = useDisclosure(false)

  return (
    <MantineProvider
      theme={{ fontFamily: 'JetBrains Mono' }}
      forceColorScheme={themeColours.mantineColourScheme}
    >
      <div
        className={styles.Container}
        style={{ backgroundColor: themeColours.backgroundColour }}
      >
        {isHydrated && (
          <>
            <Typography className={styles.Container__Inspiration}>
              Inspired by 'A million times' by

              <Anchor
                c='yellow'
                target='_blank'
                underline='never'
                className={styles.Link}
                href='https://www.humanssince1982.com/en-uk/pages/studio-story'
              >
                Humans Since 1982
              </Anchor>
              .
            </Typography>

            <ConfigurationDrawer
              opened={opened}
              onClose={close}
            />

            <SettingsButton
              onClick={open}
              className={styles.SettingsButton}
            />

            <TimeDisplay
              ref={timeDisplayRef}
            />
          </>
        )}

        {!isHydrated && (
          <LoadingOverlay />
        )}
      </div>
    </MantineProvider>
  )
})