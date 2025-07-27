import { Drawer } from '@mantine/core'
import { ThemeSelector } from 'modules/ConfigurationDrawer/components/ThemeSelector'
import type { ConfigurationDrawerProps } from 'modules/ConfigurationDrawer/types'

export const ConfigurationDrawer = ({ opened, onClose }: ConfigurationDrawerProps) => {
  return (
    <Drawer
      size='sm'
      opened={opened}
      onClose={onClose}
      position='right'
      title='Configuration'
    >
      <ThemeSelector />
    </Drawer>
  )
}