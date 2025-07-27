import { type Theme, useThemeContext } from 'context/ThemeContext'
import { ThemePreview } from 'components/ThemeSelector/ThemePreview'
import { getThemeColours } from 'context/ThemeContext/getThemeColours'
import { Combobox, InputBase, useCombobox } from '@mantine/core'

const themes: Theme[] = ['light', 'dark', 'matrix']

export const ThemeSelector = () => {
  const { theme, setTheme } = useThemeContext()

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
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
    <div>
      <label htmlFor='theme'>
        Theme
      </label>

      <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
          setTheme(val as Theme)
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
            {theme[0].toUpperCase() + theme.slice(1)}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  )
}