import { Combobox, InputBase, InputLabel, InputWrapper, useCombobox } from '@mantine/core'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import type { TimeDisplayPattern } from 'modules/TimeDisplay'
import { useTranslation } from 'react-i18next'

const patterns: TimeDisplayPattern[] = [
  'circular',
  'point-towards-middle',
  'horizontal',
  'vertical',
  'away-from-x-axis',
  'diagonal'
]

export const ClockPatternSelector = () => {
  const { timeDisplayPattern, setTimeDisplayPattern } = useConfigContext()

  const { t } = useTranslation('translation', {
    keyPrefix: 'configuration-drawer.sections.theming.pattern-selector'
  })

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  })

  const toDisplayName = (animation: TimeDisplayPattern) => {
    return t(`patterns.${animation}`)
  }

  const options = patterns.map((item: TimeDisplayPattern) => (
    <Combobox.Option value={item} key={item} selected={item === timeDisplayPattern}>
      {toDisplayName(item)}
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
          setTimeDisplayPattern(val as TimeDisplayPattern)
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
            {toDisplayName(timeDisplayPattern)}
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