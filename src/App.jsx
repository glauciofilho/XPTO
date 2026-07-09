import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Fabric from './pages/Fabric'
import OpenSource from './pages/OpenSource'
import { SUPPORTED_LANGS } from './i18n/useTranslation'

// Componente Wrapper para injetar classe 'dark' no elemento HTML
function ThemeAndLanguageWrapper({ children, isDarkMode, setIsDarkMode }) {
  const { lang } = useParams()
  const location = useLocation()
  const [isValidLang, setIsValidLang] = useState(true)

  useEffect(() => {
    // Sincronizar classe dark com o elemento html do browser
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const pathParts = location.pathname.split('/').filter(Boolean)
  const firstPart = pathParts[0]

  // Se o idioma não for suportado, vamos redirecionar
  if (firstPart && !SUPPORTED_LANGS.includes(firstPart)) {
    return <Navigate to={`/pt${location.pathname}`} replace />
  }
  if (!firstPart) {
    return <Navigate to="/pt" replace />
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      {children}
    </div>
  )
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Tenta carregar do localStorage ou prefere o do sistema
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const handleSetDarkMode = (val) => {
    setIsDarkMode(val)
    localStorage.setItem('theme', val ? 'dark' : 'light')
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirecionamento da raiz / para /pt */}
        <Route path="/" element={<Navigate to="/pt" replace />} />
        
        {/* Rotas com parâmetro :lang */}
        <Route
          path="/:lang"
          element={
            <ThemeAndLanguageWrapper isDarkMode={isDarkMode} setIsDarkMode={handleSetDarkMode}>
              <Home isDarkMode={isDarkMode} />
            </ThemeAndLanguageWrapper>
          }
        />
        <Route
          path="/:lang/fabric"
          element={
            <ThemeAndLanguageWrapper isDarkMode={isDarkMode} setIsDarkMode={handleSetDarkMode}>
              <Fabric isDarkMode={isDarkMode} />
            </ThemeAndLanguageWrapper>
          }
        />
        <Route
          path="/:lang/opensource"
          element={
            <ThemeAndLanguageWrapper isDarkMode={isDarkMode} setIsDarkMode={handleSetDarkMode}>
              <OpenSource isDarkMode={isDarkMode} />
            </ThemeAndLanguageWrapper>
          }
        />

        {/* Fallback para URLs desconhecidas */}
        <Route path="*" element={<Navigate to="/pt" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
