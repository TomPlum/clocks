import { Button } from '@mantine/core'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { IconSettingsMinus } from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

export const ResetToDefaultsButton = () => {
  const { resetToDefaults } = useConfigContext()

  const { t } = useTranslation('translation', {
    keyPrefix: 'configuration-drawer.sections.developer.reset-to-defaults-button'
  })

  return (
    <Button color='pink' onClick={resetToDefaults} leftSection={<IconSettingsMinus />}>
      {t('label')}
    </Button>
  )
}