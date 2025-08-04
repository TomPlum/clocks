import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import english from 'locales/en/translation.json'
import japanese from 'locales/jp/translation.json'
import type { SerialisedConfig } from 'context/ConfigContext/types'

const getLanguage = (): string => {
  const config = localStorage.getItem('tomplum.github.io/clocks-config')

  if (config) {
    const parsed = JSON.parse(config) as SerialisedConfig
    return parsed.language
  }

  return 'jp'
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: english
    },
    jp: {
      translation: japanese
    }
  },
  lng: getLanguage(),
  fallbackLng: 'jp',
  interpolation: {
    escapeValue: false
  }
}).then(() => {
  console.debug('React i18n has been initialised.')
}).catch(e => {
  console.error('Failed to initialise React i18n.', e)
})