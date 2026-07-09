import Hero from '../components/Hero'
import Contexto from '../components/Contexto'
import Modelagem from '../components/Modelagem'
import ModelagemDimensional from '../components/ModelagemDimensional'
import DecisaoTable from '../components/DecisaoTable'
import useTranslation from '../i18n/useTranslation'

export default function Home({ isDarkMode }) {
  const { t } = useTranslation()

  return (
    <main className="dark:bg-slate-950 transition-colors duration-200">
      <Hero isDarkMode={isDarkMode} />
      <Contexto />
      <Modelagem isDarkMode={isDarkMode} />
      <ModelagemDimensional isDarkMode={isDarkMode} />
      <DecisaoTable />

      {/* Footer */}
      <footer className="py-10 px-16 border-t border-outline dark:border-slate-900 bg-white dark:bg-slate-950 transition-colors duration-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-label-md text-tertiary dark:text-slate-400">
            {t('hero.tag')}
          </p>
          <p className="text-label-md text-tertiary dark:text-slate-400">
            2026
          </p>
        </div>
      </footer>
    </main>
  )
}
