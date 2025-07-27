import { type Theme, useThemeContext } from 'context/ThemeContext'
import { ThemePreview } from 'components/ThemeSelector/ThemePreview'
import { getThemeColours } from 'context/ThemeContext/getThemeColours'
import { Combobox, Input, InputBase, useCombobox } from '@mantine/core'

const themes: Theme[] = ['light', 'dark', 'matrix']

export const ThemeSelector = () => {
  const { theme, setTheme } = useThemeContext()

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })

  const options = themes.map((item: Theme) => (
    <Combobox.Option value={item} key={item}>
      <ThemePreview
        theme={item}
        themeColours={getThemeColours(item)}
      />
    </Combobox.Option>
  ))

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setTheme(val as Theme)
        combobox.closeDropdown()
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {theme || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  )
}