import { Drawer } from '@mantine/core'
import { ThemeSelector } from 'modules/ConfigurationDrawer/components/ThemeSelector'
import type { ConfigurationDrawerProps } from 'modules/ConfigurationDrawer/types'
import { ManualTimeSelector } from 'modules/ConfigurationDrawer/components/ManualTimeSelector'
import styles from './ConfigurationDrawer.module.scss'
import { ResetTimeButton } from 'modules/ConfigurationDrawer/components/ResetTimeButton'
import { SkipTimeButtons } from './components/SkipTimeButtons'

export const ConfigurationDrawer = ({ opened, onClose }: ConfigurationDrawerProps) => {
  return (
    <Drawer
      size='xs'
      opened={opened}
      onClose={onClose}
      position='right'
      title='Configuration'
      classNames={{
        body: styles.Drawer__Content
      }}
    >
      <div className={styles.Section}>
        <ThemeSelector />
      </div>

      <div className={styles.Section}>
        <ManualTimeSelector />
        <SkipTimeButtons />
      </div>

      <div className={styles.Section}>
        <ResetTimeButton />
      </div>
    </Drawer>
  )
}