import { Button } from '@mantine/core'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { IconRestore } from '@tabler/icons-react'
import { loadingAnimationDuration } from 'modules/TimeDisplay'
import { useState } from 'react'

export const ResetTimeButton = () => {
  const { reloadTime } = useConfigContext()

  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    reloadTime?.()

    setTimeout(() => {
      setLoading(false)
    }, loadingAnimationDuration)
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