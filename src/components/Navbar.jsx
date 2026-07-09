import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Database, ChevronRight, Sun, Moon, Globe } from 'lucide-react'
import useTranslation, { SUPPORTED_LANGS } from '../i18n/useTranslation'

export default function Navbar({ isDarkMode, setIsDarkMode }) {
  const [scrolled, setScrolled] = useState(false)
  const { t, currentLang, changeLanguage } = useTranslation()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = location.pathname === `/${currentLang}` || location.pathname === `/${currentLang}/`

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-white border-b border-outline shadow-none dark:bg-slate-950 dark:border-slate-900'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink to={`/${currentLang}`} className="flex items-center gap-2 text-primary dark:text-white font-semibold text-body-md">
          <Database size={18} strokeWidth={2} className="text-secondary" />
          <span>XPTO</span>
          <span className="text-tertiary dark:text-slate-400 font-normal">{t('nav.platform')}</span>
        </NavLink>

        {/* Control and navigation items */}
        <div className="flex items-center gap-6">
          {/* Nav links */}
          <div className="flex items-center gap-1">
            <NavLink
              to={`/${currentLang}`}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded text-label-md transition-colors duration-150 ${
                  isActive
                    ? 'bg-neutral-100 text-primary dark:bg-slate-900 dark:text-white font-medium'
                    : 'text-tertiary dark:text-slate-400 hover:text-primary dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-slate-900'
                }`
              }
              end
            >
              {t('nav.home')}
            </NavLink>
            <NavLink
              to={`/${currentLang}/fabric`}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded text-label-md transition-colors duration-150 flex items-center gap-1 ${
                  isActive
                    ? 'bg-secondary-container text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 font-medium'
                    : 'text-tertiary dark:text-slate-400 hover:text-primary dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-slate-900'
                }`
              }
            >
              {t('nav.fabric')}
            </NavLink>
            <NavLink
              to={`/${currentLang}/opensource`}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded text-label-md transition-colors duration-150 ${
                  isActive
                    ? 'bg-neutral-100 text-primary dark:bg-slate-900 dark:text-white font-medium'
                    : 'text-tertiary dark:text-slate-400 hover:text-primary dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-slate-900'
                }`
              }
            >
              {t('nav.opensource')}
            </NavLink>
          </div>

          {/* Divider */}
          <span className="h-5 w-px bg-outline dark:bg-slate-800" />

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-slate-900 px-2 py-1 rounded">
              <Globe size={14} className="text-tertiary dark:text-slate-400" />
              {SUPPORTED_LANGS.map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`text-xs px-1.5 py-0.5 rounded font-medium uppercase transition-colors ${
                    currentLang === lang
                      ? 'bg-white dark:bg-slate-800 text-primary dark:text-white shadow-sm'
                      : 'text-tertiary dark:text-slate-400 hover:text-primary dark:hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-slate-900 text-tertiary dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
