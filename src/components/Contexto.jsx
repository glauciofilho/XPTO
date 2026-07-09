import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { AlertTriangle, TrendingDown, Users, Clock } from 'lucide-react'
import useTranslation from '../i18n/useTranslation'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Contexto() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const problems = [
    {
      icon: AlertTriangle,
      title: t('context.problems.silos.title'),
      desc: t('context.problems.silos.desc'),
    },
    {
      icon: TrendingDown,
      title: t('context.problems.quality.title'),
      desc: t('context.problems.quality.desc'),
    },
    {
      icon: Users,
      title: t('context.problems.governance.title'),
      desc: t('context.problems.governance.desc'),
    },
    {
      icon: Clock,
      title: t('context.problems.time.title'),
      desc: t('context.problems.time.desc'),
    },
  ]

  return (
    <section id="contexto" className="section bg-neutral dark:bg-slate-950 transition-colors duration-200">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-label-md text-secondary font-medium mb-2 uppercase tracking-wider">
            {t('context.tag')}
          </p>
          <h2 className="text-headline-lg text-primary dark:text-white mb-4">
            {t('context.title')}
          </h2>
          <p className="text-body-lg text-tertiary dark:text-slate-300 max-w-2xl">
            {t('context.subtitle')}
          </p>
        </motion.div>

        {/* Problem cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-1 lg:grid-cols-2 gap-4"
        >
          {problems.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={itemVariants} className="card-hover dark:bg-slate-900 dark:border-slate-800">
              <div className="flex items-start gap-4">
                <div className="p-2 border border-outline dark:border-slate-800 rounded bg-white dark:bg-slate-950">
                  <Icon size={18} strokeWidth={2} className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-headline-md text-primary dark:text-white mb-1">{title}</h3>
                  <p className="text-body-md text-tertiary dark:text-slate-400">{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Current state code-style snippet */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 code-block"
        >
          <p className="text-neutral-200 text-label-md mb-3 font-mono">
            {t('context.current_state_title')}
          </p>
          <pre className="text-emerald-400 text-mono-md overflow-x-auto whitespace-pre">
            {t('context.current_state_desc')}
          </pre>
        </motion.div>
      </div>
    </section>
  )
}
