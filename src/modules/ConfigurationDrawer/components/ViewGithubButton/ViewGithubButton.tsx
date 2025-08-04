import { Anchor } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons-react'
import styles from './ViewGithubButton.module.scss'
import { useTranslation } from 'react-i18next'

export const ViewGithubButton = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'configuration-drawer.sections.developer.view-source-button'
  })

  return (
    <div className={styles.Container}>
      <IconBrandGithub
        size={20}
        className={styles.Icon}
      />

      <Anchor
        fz='md'
        fw={500}
        target='_blank'
        underline='hover'
        variant='gradient'
        href='https:/github.com/TomPlum/clocks'
        gradient={{ from: 'pink', to: 'yellow' }}
      >
        {t('label')}
      </Anchor>
    </div>
  )
}