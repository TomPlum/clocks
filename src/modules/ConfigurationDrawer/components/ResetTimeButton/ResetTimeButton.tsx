import { Button } from '@mantine/core'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { IconRestore } from '@tabler/icons-react'
import { useState } from 'react'
import { getAnimationConfig } from 'modules/TimeDisplay/hooks/useClockAnimation/getAnimationConfig'

export const ResetTimeButton = () => {
  const { reloadTime, loadingAnimation } = useConfigContext()
  const loadingAnimationDuration = getAnimationConfig(loadingAnimation).animationDuration ?? 5000

  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    reloadTime?.()

    setTimeout(() => {
      setLoading(false)
    }, loadingAnimationDuration + 3000)
  }

  return (
    <Button
      color='blue'
      loading={loading}
      onClick={handleClick}
      loaderProps={{ type: 'dots' }}
      leftSection={<IconRestore size={20}/>}
    >
      Replay Loading Animation
    </Button>
  )
}