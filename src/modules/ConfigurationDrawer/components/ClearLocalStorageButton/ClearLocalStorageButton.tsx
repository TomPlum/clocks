import { Button } from '@mantine/core'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { IconTrashX } from '@tabler/icons-react'

export const ClearLocalStorageButton = () => {
  const { clearStoredConfig } = useConfigContext()

  return (
    <Button
      size='sm'
      color='red'
      onClick={clearStoredConfig}
      leftSection={<IconTrashX size={20} />}
    >
      Clear Local Storage
    </Button>
  )
}