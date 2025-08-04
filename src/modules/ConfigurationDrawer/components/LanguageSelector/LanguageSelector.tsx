import { Combobox, InputBase, InputLabel, InputWrapper, useCombobox } from '@mantine/core'
import { useConfigContext } from 'context/ConfigContext/useConfigContext'
import { useTranslation } from 'react-i18next'

const languages = ['en', 'jp']

export const LanguageSelector = () => {
  const { language, setLanguage } = useConfigContext()

  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'configuration-drawer.sections.theming.language-selector'
  })

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  })

  const toDisplayName = (language: string) => {
    return t(`languages.${language}`)
  }

  const options = languages.map((item: string) => (
    <Combobox.Option value={item} key={item} selected={item === language}>
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
        onOptionSubmit={(selectedLanguage) => {
          setLanguage(selectedLanguage)

          i18n.changeLanguage(selectedLanguage).then(() => {
            setLanguage(selectedLanguage)
          }).catch(error => {
            console.error('Failed to set language to: ', selectedLanguage, error)
          })

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
            {toDisplayName(language)}
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