import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { InputLabel, InputWrapper, Slider } from '@mantine/core'

export const TimeLapseDurationSelector = () => {
  const { digitAnimationDuration, setDigitAnimationDuration } = useConfigContext()

  return (
    <InputWrapper style={{ marginTop: 20 }}>
      <InputLabel>
        Digit Animation Duration (s)
      </InputLabel>

      <Slider
        step={1000}
        max={5000}
        min={0}
        showLabelOnHover={false}
        value={digitAnimationDuration}
        onChange={setDigitAnimationDuration}
        marks={[
          { label: 'None', value: 0 },
          { label: '1s', value: 1000 },
          { label: '2s', value: 2000 },
          { label: '3s', value: 3000 },
          { label: '4s', value: 4000 },
          { label: '5s', value: 5000 }
        ]}
      />
    </InputWrapper>
  )
}