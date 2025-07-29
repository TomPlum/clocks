import { Button } from '@mantine/core'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { IconSettingsMinus } from '@tabler/icons-react'

export const ResetToDefaultsButton = () => {
  const { resetToDefaults } = useConfigContext()

  return (
    <Button color='pink' onClick={resetToDefaults} leftSection={<IconSettingsMinus />}>
      Reset To Defaults
    </Button>
  )
}