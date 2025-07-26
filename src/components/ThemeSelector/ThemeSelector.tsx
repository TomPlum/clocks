import { CustomSelect } from '../CustomSelect'
import { type Theme, useThemeContext } from 'context/ThemeContext'

export const ThemeSelector = () => {
  const { theme, setTheme } = useThemeContext()

  return (
    <CustomSelect<Theme>
      label='Theme'
      value={theme}
      theme={theme}
      width={180}
      onChange={setTheme}
      options={[
        {
          label: 'Light',
          value: 'light'
        },
        {
          label: 'Dark',
          value: 'dark'
        }
      ]}
    />
  )
}