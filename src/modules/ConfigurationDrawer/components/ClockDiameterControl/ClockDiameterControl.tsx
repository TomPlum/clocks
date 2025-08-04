import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { InputLabel, InputWrapper, Slider } from '@mantine/core'
import { useTranslation } from 'react-i18next'

export const ClockDiameterControl = () => {
  const { clockDiameter, setClockDiameter } = useConfigContext()

  const { t } = useTranslation('translation', {
    keyPrefix: 'configuration-drawer.sections.theming.clock-diameter-selector'
  })

  const handleChange = (value: number) => {
    if (value < 20) {
      setClockDiameter(undefined)
    } else {
      setClockDiameter(value)
    }
  }

  return (
    <InputWrapper>
      <InputLabel>
        {t('label')}
      </InputLabel>

      <Slider
        step={2}
        min={0}
        max={60}
        domain={[-6, 66]}
        color='grape'
        showLabelOnHover={false}
        value={clockDiameter ?? 0}
        onChange={handleChange}
        marks={[
          { label: t('dynamic'), value: 0 },
          { label: '20px', value: 20 },
          { label: '40px', value: 40 },
          { label: '60px', value: 60 }
        ]}
      />
    </InputWrapper>
  )
}