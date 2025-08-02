import { Anchor } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons-react'
import styles from './ViewGithubButton.module.scss'

export const ViewGithubButton = () => {
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
        View source on GitHub
      </Anchor>
    </div>
  )
}