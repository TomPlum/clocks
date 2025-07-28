import { Drawer } from '@mantine/core'
import { ThemeSelector } from 'modules/ConfigurationDrawer/components/ThemeSelector'
import type { ConfigurationDrawerProps } from 'modules/ConfigurationDrawer/types'
import { ManualTimeSelector } from 'modules/ConfigurationDrawer/components/ManualTimeSelector'
import styles from './ConfigurationDrawer.module.scss'
import { ResetTimeButton } from 'modules/ConfigurationDrawer/components/ResetTimeButton'

export const ConfigurationDrawer = ({ opened, onClose }: ConfigurationDrawerProps) => {
  return (
    <Drawer
      size='sm'
      opened={opened}
      onClose={onClose}
      position='right'
      title='Configuration'
      classNames={{
        body: styles.Drawer__Content
      }}
    >
      <ThemeSelector />
      <ManualTimeSelector />
      <ResetTimeButton />
    </Drawer>
  )
}