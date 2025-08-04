import styles from './DebugTools.module.scss'
import { useAnimationContext } from 'context/AnimationContext'
import { Text } from '@mantine/core'
import {
  IconBrandFlickr,
  IconClock,
  IconKeyframeAlignHorizontal,
  IconKeyframes,
  IconKeyframesFilled,
  IconWaveSawTool
} from '@tabler/icons-react'
import { useCurrentTime } from 'modules/TimeDisplay/hooks/useCurrentTime'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { useFps } from 'react-fps'
import { useTranslation } from 'react-i18next'

export const DebugTools = () => {
  const { currentTime } = useCurrentTime()
  const { currentFps, avgFps, maxFps } = useFps(20)
  const { enableColonAnimation } = useConfigContext()
  const { animating, initialAnimating, currentAnimation } = useAnimationContext()

  const { t } = useTranslation('translation', { keyPrefix: 'debug-info' })

  const animateColons = enableColonAnimation && !initialAnimating

  return (
    <div className={styles.Container}>
      <div className={styles.Container__Section}>
        <IconClock size={16} />
        <Text size='sm'>
          {currentTime.toString()}
        </Text>
      </div>

      <div className={styles.Container__Section}>
        <IconKeyframes size={16} />

        <Text size='sm'>
          {t('animating')}:
        </Text>

        <Text c={animating ? 'green' : 'red'} size='sm'>
          {String(animating)}
        </Text>
      </div>

      <div className={styles.Container__Section}>
        <IconKeyframesFilled size={16} />

        <Text size='sm'>
          {t('initial-animating')}:
        </Text>

        <Text c={initialAnimating ? 'green' : 'red'} size='sm'>
          {String(initialAnimating)}
        </Text>
      </div>

      <div className={styles.Container__Section}>
        <IconKeyframeAlignHorizontal size={16} />

        <Text size='sm'>
          {t('current-animation')}:
        </Text>

        <Text c={currentAnimation ? 'yellow' : 'gray'} size='sm'>
          {currentAnimation ?? 'none'}
        </Text>
      </div>

      <div className={styles.Container__Section}>
        <IconBrandFlickr
          size={16}
        />

        <Text size='sm'>
          {t('animating-colons')}:
        </Text>

        <Text c={animateColons ? 'green' : 'red'} size='sm'>
          {String(animateColons)}
        </Text>
      </div>

      <div className={styles.Container__Section}>
        <IconWaveSawTool size={16} />

        <Text size='sm'>
          {t('frame-rate')}:
        </Text>

        <Text c='blue' size='sm'>
          {currentFps}
        </Text>

        <Text c='orange' size='sm'>
          ({t('frame-rate-avg')}: {avgFps})
        </Text>

        <Text c='green' size='sm'>
          ({t('frame-rate-max')}: {maxFps})
        </Text>
      </div>
    </div>
  )
}