import { InputLabel, InputWrapper, Slider } from '@mantine/core'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { useTranslation } from 'react-i18next'

export const AnimationStaggerControl = () => {
  const { animationStagger, setAnimationStagger } = useConfigContext()

  const { t } = useTranslation('translation', {
    keyPrefix: 'configuration-drawer.sections.animations.animation-stagger-selector'
  })

  return (
    <InputWrapper>
      <InputLabel>
        {t('label')}
      </InputLabel>
      
      <Slider
        step={10}
        max={30}
        min={0}
        showLabelOnHover={false}
        value={animationStagger}
        onChange={setAnimationStagger}
        marks={[
          { label: t('off'), value: 0 },
          { label: '10ms', value: 10 },
          { label: '20ms', value: 20 },
          { label: '30ms', value: 30 },
        ]}
      />
    </InputWrapper>
  )
}