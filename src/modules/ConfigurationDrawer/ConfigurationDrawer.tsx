import { Drawer, Typography } from '@mantine/core'
import { ThemeSelector } from 'modules/ConfigurationDrawer/components/ThemeSelector'
import type { ConfigurationDrawerProps } from 'modules/ConfigurationDrawer/types'
import { ManualTimeSelector } from 'modules/ConfigurationDrawer/components/ManualTimeSelector'
import styles from './ConfigurationDrawer.module.scss'
import { ReplayLoadingAnimationButton } from 'modules/ConfigurationDrawer/components/ReplayLoadingAnimationButton'
import { SkipTimeButtons } from './components/SkipTimeButtons'
import {
  IconBrush,
  IconClock,
  IconKeyframes,
  IconSettings, IconTerminal2
} from '@tabler/icons-react'
import { ColonAnimationToggle } from 'modules/ConfigurationDrawer/components/ColonAnimationToggle'
import { ClearLocalStorageButton } from 'modules/ConfigurationDrawer/components/ClearLocalStorageButton'
import { LoadingAnimationSelector } from 'modules/ConfigurationDrawer/components/LoadingAnimationSelector'
import { ResetToDefaultsButton } from 'modules/ConfigurationDrawer/components/ResetToDefaultsButton'
import { AnimationStaggerControl } from 'modules/ConfigurationDrawer/components/AnimationStaggerControl'
import { TimeLapseDurationSelector } from 'modules/ConfigurationDrawer/components/TimeLapseDurationSelector'
import { ViewGithubButton } from 'modules/ConfigurationDrawer/components/ViewGithubButton'
import { ClockDiameterControl } from 'modules/ConfigurationDrawer/components/ClockDiameterControl'
import { ClockPatternSelector } from 'modules/ConfigurationDrawer/components/ClockPatternSelector'
import { DebugToolsToggle } from 'modules/ConfigurationDrawer/components/DebugToolsToggle'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from 'modules/ConfigurationDrawer/components/LanguageSelector'

export const ConfigurationDrawer = ({ opened, onClose }: ConfigurationDrawerProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'configuration-drawer' })
  
  return (
    <Drawer
      size='xs'
      opened={opened}
      onClose={onClose}
      position='right'
      overlayProps={{
        backgroundOpacity: 0.15
      }}
      title={(
        <div className={styles.Drawer__Title}>
          <IconSettings size={19} />
          <Typography>{t('title')}</Typography>
        </div>
      )}
      classNames={{
        body: styles.Drawer__Content
      }}
    >
      <div className={styles.SectionContainer}>
        <div className={styles.Section}>
          <Typography className={styles.Section__Heading}>
            <IconBrush size={16} /> {t('sections.theming.title')}
          </Typography>

          <ThemeSelector />
          <LanguageSelector />
          <ClockPatternSelector />
          <ClockDiameterControl />
        </div>

        <div className={styles.Section}>
          <Typography className={styles.Section__Heading}>
            <IconClock size={16} /> {t('sections.manual-time-selection.title')}
          </Typography>

          <ManualTimeSelector />
          <SkipTimeButtons />
        </div>

        <div className={styles.Section}>
          <Typography className={styles.Section__Heading}>
            <IconKeyframes size={16} /> {t('sections.animations.title')}
          </Typography>

          <ReplayLoadingAnimationButton />
          <LoadingAnimationSelector />
          <ColonAnimationToggle />
          <AnimationStaggerControl />
          <TimeLapseDurationSelector />
        </div>

        <div className={classNames(styles.Section, styles['Section--Condensed'])}>
          <Typography className={styles.Section__Heading}>
            <IconTerminal2 size={16} /> {t('sections.developer.title')}
          </Typography>

          <DebugToolsToggle />
          <ResetToDefaultsButton />
          <ClearLocalStorageButton />
          <ViewGithubButton />
        </div>
      </div>
    </Drawer>
  )
}