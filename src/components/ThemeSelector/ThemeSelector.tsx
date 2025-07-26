import { CustomSelect } from '../CustomSelect'
import { type Theme, useThemeContext } from 'context/ThemeContext'
import { ThemePreview } from 'components/ThemeSelector/ThemePreview'
import { getThemeColours } from 'context/ThemeContext/getThemeColours'

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
          value: 'light',
          label: (
            <ThemePreview
              theme='light'
              themeColours={getThemeColours('light')}
            />
          )
        },
        {
          value: 'dark',
          label: (
            <ThemePreview
              theme='dark'
              themeColours={getThemeColours('dark')}
            />
          )
        },
        {
          value: 'matrix',
          label: (
            <ThemePreview
              theme='matrix'
              themeColours={getThemeColours('matrix')}
            />
          )
        }
      ]}
    />
  )
}