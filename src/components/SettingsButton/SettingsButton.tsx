import type { SettingsButtonProps } from './types'
import { Button } from '@mantine/core'

export const SettingsButton = ({ onClick }: SettingsButtonProps) => {
  return (
    <Button onClick={onClick}>
      Settings
    </Button>
  )
}