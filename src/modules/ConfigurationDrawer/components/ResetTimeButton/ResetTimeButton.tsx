import { Button } from '@mantine/core'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { IconRestore } from '@tabler/icons-react'

export const ResetTimeButton = () => {
  const { reloadTime } = useConfigContext()

  return (
    <Button
      color='orange'
      onClick={reloadTime}
      leftSection={<IconRestore size={20}/>}
    >
      Replay Loading Animation
    </Button>
  )
}