import { Button } from '@mantine/core'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { IconRestore } from '@tabler/icons-react'
import { useState } from 'react'
import { getAnimationConfig } from 'modules/TimeDisplay/hooks/useClockAnimation/getAnimationConfig'

export const ReplayLoadingAnimationButton = () => {
  const { reloadTime, loadingAnimation, animationStagger } = useConfigContext()

  const loadingAnimationDuration = getAnimationConfig(loadingAnimation).animationDuration ?? 5000
  const easeToTimeDuration = getAnimationConfig('ease-to-time').animationDuration ?? 3000
  const animationStaggerOffset = 260 * animationStagger // 260 clocks
  const totalAnimationDuration = loadingAnimationDuration + easeToTimeDuration + animationStaggerOffset

  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    reloadTime?.()

    setTimeout(() => {
      setLoading(false)
    }, totalAnimationDuration)
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