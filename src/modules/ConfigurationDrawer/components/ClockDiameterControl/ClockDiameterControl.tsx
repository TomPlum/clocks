import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { InputLabel, InputWrapper, Slider } from '@mantine/core'

export const ClockDiameterControl = () => {
  const { clockDiameter, setClockDiameter } = useConfigContext()

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
        Clock Diameter (px)
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
          { label: 'Dynamic', value: 0 },
          { label: '20px', value: 20 },
          { label: '40px', value: 40 },
          { label: '60px', value: 60 }
        ]}
      />
    </InputWrapper>
  )
}