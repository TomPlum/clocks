import { Combobox, InputBase, useCombobox } from '@mantine/core'
import type { ClockLoadingAnimation } from 'modules/TimeDisplay/components/Clock'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'

const animations: ClockLoadingAnimation[] = ['random', 'clockwise-rotation']

export const AnimationSelector = () => {
  const { loadingAnimation, setLoadingAnimation } = useConfigContext()

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  })

  const toDisplayName = (animation: ClockLoadingAnimation) => {
    return animation[0].toUpperCase() + animation.slice(1)
  }

  const options = animations.map((item: ClockLoadingAnimation) => (
    <Combobox.Option value={item} key={item} selected={item === loadingAnimation}>
      {toDisplayName(item)}
    </Combobox.Option>
  ))

  return (
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
          {toDisplayName(loadingAnimation)}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}