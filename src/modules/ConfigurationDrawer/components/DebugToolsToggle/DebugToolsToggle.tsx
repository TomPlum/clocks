import { Button } from '@mantine/core'
import { IconBug, IconBugOff } from '@tabler/icons-react'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'

export const DebugToolsToggle = () => {
  const { showDebugTools, setShowDebugTools } = useConfigContext()

  return (
    <Button
      color='orange'
      onClick={() => setShowDebugTools(!showDebugTools)}
      leftSection={showDebugTools ? <IconBugOff size={20} /> : <IconBug size={20} />}
    >
      {`${showDebugTools ? 'Hide' : 'Show'} Debug Tools`}
    </Button>
  )
}