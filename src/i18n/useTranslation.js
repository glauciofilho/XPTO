import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import pt from './pt.json'
import en from './en.json'
import es from './es.json'

const translations = { pt, en, es }
export const SUPPORTED_LANGS = ['pt', 'en', 'es']

export default function useTranslation() {
  const { lang } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  // Normalizar e determinar o idioma ativo
  const currentLang = SUPPORTED_LANGS.includes(lang) ? lang : 'pt'

  useEffect(() => {
    // Se a URL não tiver idioma ou for um idioma inválido, redirecionar para /pt
    const pathParts = location.pathname.split('/').filter(Boolean)
    const firstPart = pathParts[0]

    if (!SUPPORTED_LANGS.includes(firstPart)) {
      // Redireciona mantendo o resto do caminho
      const newPath = `/${currentLang}${location.pathname}`
      navigate(newPath, { replace: true })
    }
  }, [lang, location.pathname, navigate, currentLang])

  const t = (keyPath) => {
    const dict = translations[currentLang] || pt
    const keys = keyPath.split('.')
    let current = dict

    for (const key of keys) {
      if (current[key] === undefined) {
        // Fallback para português caso falte a chave
        let fallback = pt
        for (const fbKey of keys) {
          if (fallback[fbKey] === undefined) return keyPath
          fallback = fallback[fbKey]
        }
        return fallback
      }
      current = current[key]
    }
    return current
  }

  // Função para mudar o idioma atualizando a URL
  const changeLanguage = (newLang) => {
    if (!SUPPORTED_LANGS.includes(newLang)) return

    const pathParts = location.pathname.split('/').filter(Boolean)
    // Se o primeiro elemento é o idioma atual, substitua
    if (SUPPORTED_LANGS.includes(pathParts[0])) {
      pathParts[0] = newLang
    } else {
      pathParts.unshift(newLang)
    }
    navigate('/' + pathParts.join('/'), { replace: true })
  }

  return { t, currentLang, changeLanguage }
}
