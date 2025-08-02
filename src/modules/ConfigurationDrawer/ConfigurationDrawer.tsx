import { Drawer, Typography } from '@mantine/core'
import { ThemeSelector } from 'modules/ConfigurationDrawer/components/ThemeSelector'
import type { ConfigurationDrawerProps } from 'modules/ConfigurationDrawer/types'
import { ManualTimeSelector } from 'modules/ConfigurationDrawer/components/ManualTimeSelector'
import styles from './ConfigurationDrawer.module.scss'
import { ResetTimeButton } from 'modules/ConfigurationDrawer/components/ResetTimeButton'
import { SkipTimeButtons } from './components/SkipTimeButtons'
import {
  IconBrush,
  IconClock,
  IconDatabase,
  IconKeyframes,
  IconSettings
} from '@tabler/icons-react'
import { ColonAnimationToggle } from 'modules/ConfigurationDrawer/components/ColonAnimationToggle'
import { ClearLocalStorageButton } from 'modules/ConfigurationDrawer/components/ClearLocalStorageButton'
import { AnimationSelector } from 'modules/ConfigurationDrawer/components/AnimationSelector'
import { ResetToDefaultsButton } from 'modules/ConfigurationDrawer/components/ResetToDefaultsButton'
import { AnimationStaggerControl } from 'modules/ConfigurationDrawer/components/AnimationStaggerControl'
import { TimeLapseDurationSelector } from 'modules/ConfigurationDrawer/components/TimeLapseDurationSelector'
import { ViewGithubButton } from 'modules/ConfigurationDrawer/components/ViewGithubButton'

export const ConfigurationDrawer = ({ opened, onClose }: ConfigurationDrawerProps) => {
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
          <Typography>Configuration</Typography>
        </div>
      )}
      classNames={{
        body: styles.Drawer__Content
      }}
    >
      <div className={styles.Section}>
        <Typography className={styles.Section__Heading}>
          <IconBrush size={16} /> Theming
        </Typography>

        <ThemeSelector />
      </div>

      <div className={styles.Section}>
        <Typography className={styles.Section__Heading}>
          <IconClock size={16} /> Manual Time Selection
        </Typography>

        <ManualTimeSelector />
        <SkipTimeButtons />
      </div>

      <div className={styles.Section}>
        <Typography className={styles.Section__Heading}>
          <IconKeyframes size={16} /> Animations
        </Typography>

        <ResetTimeButton />
        <AnimationSelector />
        <ColonAnimationToggle />
        <AnimationStaggerControl />
        <TimeLapseDurationSelector />
      </div>

      <div className={styles.Section}>
        <Typography className={styles.Section__Heading}>
          <IconDatabase size={16} /> Website Data
        </Typography>

        <ResetToDefaultsButton />
        <ClearLocalStorageButton />
        <ViewGithubButton />
      </div>
    </Drawer>
  )
}