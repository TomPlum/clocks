import { Combobox, InputBase, InputLabel, InputWrapper, useCombobox } from '@mantine/core'
import type { ClockLoadingAnimation } from 'modules/TimeDisplay/components/Clock'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { useTranslation } from 'react-i18next'

const animations: ClockLoadingAnimation[] = ['random', 'clockwise-rotation']

export const LoadingAnimationSelector = () => {
  const { loadingAnimation, setLoadingAnimation } = useConfigContext()

  const { t } = useTranslation('translation', {
    keyPrefix: 'configuration-drawer.sections.animations.loading-animation-selector'
  })

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  })

  const options = animations.map((item: ClockLoadingAnimation) => (
    <Combobox.Option value={item} key={item} selected={item === loadingAnimation}>
      {t(`animations.${item}`)}
    </Combobox.Option>
  ))

  return (
    <InputWrapper>
      <InputLabel>
        {t('label')}
      </InputLabel>
      
      <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
          setLoadingAnimation(val as ClockLoadingAnimation)
          combobox.closeDropdown()
        }}
      >
        <Combobox.Target>
          <InputBase
            pointer
            id='theme'
            type="button"
            component="button"
            rightSectionPointerEvents="none"
            rightSection={<Combobox.Chevron />}
            onClick={() => combobox.toggleDropdown()}
          >
            {t(`animations.${loadingAnimation}`)}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </InputWrapper>
  )
}