import { Button } from '@mantine/core'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { IconTrashX } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export const ClearLocalStorageButton = () => {
  const { clearStoredConfig } = useConfigContext()

  const { t } = useTranslation('translation', {
    keyPrefix: 'configuration-drawer.sections.developer.clear-local-storage-button'
  })

  return (
    <Button
      size='sm'
      color='red'
      onClick={clearStoredConfig}
      leftSection={<IconTrashX size={20} />}
    >
      {t('label')}
    </Button>
  )
}