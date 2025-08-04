import { Button } from '@mantine/core'
import { IconBug, IconBugOff } from '@tabler/icons-react'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { useTranslation } from 'react-i18next'

export const DebugToolsToggle = () => {
  const { showDebugTools, setShowDebugTools } = useConfigContext()

  const { t } = useTranslation('translation', {
    keyPrefix: 'configuration-drawer.sections.developer.debug-tools-button'
  })

  return (
    <Button
      color='orange'
      onClick={() => setShowDebugTools(!showDebugTools)}
      leftSection={showDebugTools ? <IconBugOff size={20} /> : <IconBug size={20} />}
    >
      {t(`${showDebugTools ? 'hide' : 'show'}`)}
    </Button>
  )
}