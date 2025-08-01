import { Checkbox } from '@mantine/core'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'

export const ColonAnimationToggle = () => {
  const { enableColonAnimation, setEnableColonAnimation } = useConfigContext()

  return (
    <Checkbox
      color='blue'
      checked={enableColonAnimation}
      label='Enable Colon Flashing Animation'
      onChange={() => setEnableColonAnimation(!enableColonAnimation)}
    />
  )
}