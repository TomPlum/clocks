import { Checkbox } from '@mantine/core'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { useTranslation } from 'react-i18next'

export const ColonAnimationToggle = () => {
  const { enableColonAnimation, setEnableColonAnimation } = useConfigContext()

  const { t } = useTranslation('translation', {
    keyPrefix: 'configuration-drawer.sections.animations.colon-flashing-animation-toggle'
  })

  return (
    <Checkbox
      color='blue'
      checked={enableColonAnimation}
      label={t('label')}
      onChange={() => setEnableColonAnimation(!enableColonAnimation)}
    />
  )
}