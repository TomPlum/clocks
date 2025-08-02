import { Combobox, InputBase, InputLabel, InputWrapper, useCombobox } from '@mantine/core'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import type { TimeDisplayPattern } from 'modules/TimeDisplay'

const patterns: TimeDisplayPattern[] = ['circular', 'point-towards-middle']

export const ClockPatternSelector = () => {
  const { timeDisplayPattern, setTimeDisplayPattern } = useConfigContext()

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  })

  const toDisplayName = (animation: TimeDisplayPattern) => {
    switch (animation) {
      case 'circular': {
        return 'Circular'
      }
      case 'point-towards-middle': {
        return 'Point Towards Center'
      }
    }
  }

  const options = patterns.map((item: TimeDisplayPattern) => (
    <Combobox.Option value={item} key={item} selected={item === timeDisplayPattern}>
      {toDisplayName(item)}
    </Combobox.Option>
  ))

  return (
    <InputWrapper>
      <InputLabel>
        Non-Digit Clocks Pattern
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