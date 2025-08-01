import { InputLabel, InputWrapper, Slider } from '@mantine/core'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'

export const AnimationStaggerControl = () => {
  const { animationStagger, setAnimationStagger } = useConfigContext()

  return (
    <InputWrapper>
      <InputLabel>
        Animation Stagger (ms)
      </InputLabel>
      
      <Slider
        step={10}
        max={30}
        min={0}
        showLabelOnHover={false}
        value={animationStagger}
        onChange={setAnimationStagger}
        marks={[
          { label: 'Off', value: 0 },
          { label: '10ms', value: 10 },
          { label: '20ms', value: 20 },
          { label: '30ms', value: 30 },
        ]}
      />
    </InputWrapper>
  )
}