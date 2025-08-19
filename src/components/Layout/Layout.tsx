import { TimeDisplay, type TimeDisplayRefHandle } from 'modules/TimeDisplay'
import styles from './Layout.module.scss'
import { useThemeContext } from 'context/ThemeContext'
import { SettingsButton } from 'modules/ConfigurationDrawer/components/SettingsButton'
import { useDisclosure } from '@mantine/hooks'
import { ConfigurationDrawer } from 'modules/ConfigurationDrawer'
import { Anchor, LoadingOverlay, MantineProvider, Typography } from '@mantine/core'
import { forwardRef } from 'react'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import classNames from 'classnames'
import { DebugTools } from 'modules/DebugTools'
import { useTranslation } from 'react-i18next'

export const Layout = forwardRef<TimeDisplayRefHandle>((_, timeDisplayRef) => {
  const { themeColours, isMobile } = useThemeContext()
  const { isHydrated, showDebugTools } = useConfigContext()

  const { t } = useTranslation('translation')

  const [opened, { open, close }] = useDisclosure(false)

  return (
    <MantineProvider
      theme={{ fontFamily: 'JetBrains Mono' }}
      forceColorScheme={themeColours.mantineColourScheme}
    >
      <div
        className={classNames(
          styles.Container,
          { [styles.DrawerOffset]: opened && isMobile }
        )}
        style={{ backgroundColor: themeColours.backgroundColour }}
      >
        {isHydrated && (
          <>
            {showDebugTools && (
              <DebugTools />
            )}
            
            <Typography className={styles.Container__Inspiration}>
              {t('inspired-by-title.start')}

              <Anchor
                c='yellow'
                target='_blank'
                underline='never'
                className={styles.Link}
                href='https://www.humanssince1982.com/en-uk/pages/studio-story'
              >
                {t('inspired-by-title.name')}
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