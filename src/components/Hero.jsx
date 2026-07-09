import { motion } from 'framer-motion'
import { ArrowDown, BarChart3, Shield, Zap } from 'lucide-react'
import useTranslation from '../i18n/useTranslation'

export default function Hero({ isDarkMode }) {
  const { t, currentLang } = useTranslation()

  const scrollToSection = () => {
    document.getElementById('contexto')?.scrollIntoView({ behavior: 'smooth' })
  }

  const stats = [
    { icon: BarChart3, label: t('hero.stat_sources'), value: '50+' },
    { icon: Shield, label: t('hero.stat_gov'), value: '100%' },
    { icon: Zap, label: t('hero.stat_value'), value: t('decision.s_time_fab') },
  ]

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-white dark:bg-slate-950 border-b border-outline dark:border-slate-900 overflow-hidden transition-colors duration-200">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #E2E8F0 1px, transparent 1px),
            linear-gradient(to bottom, #E2E8F0 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-16 pt-32 pb-16">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="badge-amber">{t('hero.tag')}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-display-lg text-primary dark:text-white mb-6 max-w-3xl leading-tight"
        >
          {t('hero.title_1')}
          <br />
          <span className="text-tertiary dark:text-slate-400">{t('hero.title_2')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-body-lg text-tertiary dark:text-slate-300 max-w-xl mb-12"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-4 mb-20"
        >
          <button onClick={scrollToSection} className="btn-primary">
            {t('hero.btn_explore')}
            <ArrowDown size={16} strokeWidth={2} />
          </button>
          <a href="#decisao" className="btn-secondary">
            {t('hero.btn_compare')}
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-3 gap-6 border-t border-outline dark:border-slate-900 pt-10"
        >
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="mt-0.5 p-2 border border-outline dark:border-slate-800 rounded bg-neutral-100 dark:bg-slate-900">
                <Icon size={16} strokeWidth={2} className="text-tertiary dark:text-slate-300" />
              </div>
              <div>
                <div className="text-headline-md text-primary dark:text-white">{value}</div>
                <div className="text-label-md text-tertiary dark:text-slate-400">{label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-tertiary dark:text-slate-400"
      >
        <ArrowDown size={20} strokeWidth={1.5} />
      </motion.div>
    </section>
  )
}
