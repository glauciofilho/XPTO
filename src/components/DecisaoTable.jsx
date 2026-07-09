import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react'
import useTranslation from '../i18n/useTranslation'

const Icon = ({ val }) => {
  if (val.startsWith('✓')) return <CheckCircle size={14} strokeWidth={2} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
  if (val.startsWith('✗')) return <XCircle size={14} strokeWidth={2} className="text-red-500 dark:text-red-400 flex-shrink-0" />
  return <AlertCircle size={14} strokeWidth={2} className="text-secondary flex-shrink-0" />
}

export default function DecisaoTable() {
  const { t, currentLang } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()

  const criteria = [
    { label: t('decision.c_gov'), weight: t('decision.weight_high'), key: 'gov' },
    { label: t('decision.c_pbi'), weight: t('decision.weight_high'), key: 'pbi' },
    { label: t('decision.c_tco'), weight: t('decision.weight_med'), key: 'tco' },
    { label: t('decision.c_time'), weight: t('decision.weight_high'), key: 'time' },
    { label: t('decision.c_scale'), weight: t('decision.weight_med'), key: 'scale' },
    { label: t('decision.c_maint'), weight: t('decision.weight_med'), key: 'maint' },
    { label: t('decision.c_skills'), weight: t('decision.weight_low'), key: 'skills' },
    { label: t('decision.c_m365'), weight: t('decision.weight_high'), key: 'm365' },
  ]

  const scores = {
    gov: [t('decision.s_gov_fab'), t('decision.s_gov_os')],
    pbi: [t('decision.s_pbi_fab'), t('decision.s_pbi_os')],
    tco: [t('decision.s_tco_fab'), t('decision.s_tco_os')],
    time: [t('decision.s_time_fab'), t('decision.s_time_os')],
    scale: [t('decision.s_scale_fab'), t('decision.s_scale_os')],
    maint: [t('decision.s_maint_fab'), t('decision.s_maint_os')],
    skills: [t('decision.s_skills_fab'), t('decision.s_skills_os')],
    m365: [t('decision.s_m365_fab'), t('decision.s_m365_os')],
  }

  const weightColor = (w) =>
    w === t('decision.weight_high') ? 'badge-amber' : 'badge'

  return (
    <section id="decisao" className="section bg-neutral dark:bg-slate-950 border-t border-outline dark:border-slate-900 transition-colors duration-200">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-label-md text-secondary font-medium mb-2 uppercase tracking-wider">
            {t('decision.tag')}
          </p>
          <h2 className="text-headline-lg text-primary dark:text-white mb-4">
            {t('decision.title')}
          </h2>
          <p className="text-body-lg text-tertiary dark:text-slate-300 max-w-2xl">
            {t('decision.subtitle')}
          </p>
        </motion.div>

        {/* Desktop View Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:block border border-outline dark:border-slate-800 rounded-lg overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline dark:border-slate-800 bg-surface-container dark:bg-slate-900">
                <th className="px-5 py-3 text-left text-label-md text-tertiary dark:text-slate-300 w-1/3">
                  {t('decision.th_criteria')}
                </th>
                <th className="px-4 py-3 text-left text-label-md text-tertiary dark:text-slate-300 w-1/12">
                  {t('decision.th_weight')}
                </th>
                <th className="px-5 py-3 text-left text-label-md text-tertiary dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-secondary inline-block" />
                    {t('decision.th_fabric')}
                  </span>
                </th>
                <th className="px-5 py-3 text-left text-label-md text-tertiary dark:text-slate-300 border-l border-outline dark:border-slate-800">
                  {t('decision.th_opensource')}
                </th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((crit, idx) => {
                const [fab, oss] = scores[crit.key]
                const scoreFab = fab.includes('✓') ? `✓ ${fab.replace('✓', '')}` : fab.includes('✗') ? `✗ ${fab.replace('✗', '')}` : `~ ${fab.replace('~', '')}`
                const scoreOss = oss.includes('✓') ? `✓ ${oss.replace('✓', '')}` : oss.includes('✗') ? `✗ ${oss.replace('✗', '')}` : `~ ${oss.replace('~', '')}`
                return (
                  <tr
                    key={crit.key}
                    className={`border-b border-outline dark:border-slate-800/60 last:border-b-0 ${
                      idx % 2 === 0 ? 'bg-white dark:bg-slate-900/40' : 'bg-neutral-100/50 dark:bg-slate-900/10'
                    }`}
                  >
                    <td className="px-5 py-3 text-body-md text-primary dark:text-white">{crit.label}</td>
                    <td className="px-4 py-3">
                      <span className={weightColor(crit.weight)}>{crit.weight}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-2 text-body-md text-primary dark:text-white">
                        <Icon val={scoreFab} />
                        {scoreFab.substring(2)}
                      </span>
                    </td>
                    <td className="px-5 py-3 border-l border-outline dark:border-slate-800">
                      <span className="flex items-center gap-2 text-body-md text-tertiary dark:text-slate-400">
                        <Icon val={scoreOss} />
                        {scoreOss.substring(2)}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile View: Cards */}
        <div className="block md:hidden space-y-4">
          {criteria.map((crit) => {
            const [fab, oss] = scores[crit.key]
            const scoreFab = fab.includes('✓') ? `✓ ${fab.replace('✓', '')}` : fab.includes('✗') ? `✗ ${fab.replace('✗', '')}` : `~ ${fab.replace('~', '')}`
            const scoreOss = oss.includes('✓') ? `✓ ${oss.replace('✓', '')}` : oss.includes('✗') ? `✗ ${oss.replace('✗', '')}` : `~ ${oss.replace('~', '')}`
            return (
              <div key={crit.key} className="card dark:bg-slate-900 dark:border-slate-800 p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-outline dark:border-slate-800 pb-2">
                  <h4 className="font-semibold text-primary dark:text-white">{crit.label}</h4>
                  <span className={weightColor(crit.weight)}>{crit.weight}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-xs text-tertiary dark:text-slate-400 block mb-1 font-medium">{t('decision.th_fabric')}</span>
                    <span className="flex items-center gap-1.5 text-primary dark:text-white font-medium">
                      <Icon val={scoreFab} />
                      {scoreFab.substring(2)}
                    </span>
                  </div>
                  <div className="border-l border-outline dark:border-slate-800 pl-3">
                    <span className="text-xs text-tertiary dark:text-slate-400 block mb-1 font-medium">{t('decision.th_opensource')}</span>
                    <span className="flex items-center gap-1.5 text-tertiary dark:text-slate-300">
                      <Icon val={scoreOss} />
                      {scoreOss.substring(2)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recommendation callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 p-6 border border-secondary/40 bg-secondary-container/20 dark:bg-amber-950/10 dark:border-amber-900/40 rounded-lg flex items-start gap-4"
        >
          <CheckCircle size={20} strokeWidth={2} className="text-secondary mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-headline-md text-primary dark:text-white mb-1">
              {t('decision.rec_title')}
            </h3>
            <p className="text-body-md text-tertiary dark:text-slate-300">
              {t('decision.rec_desc')}
            </p>
          </div>
        </motion.div>

        {/* Path selection buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-col md:flex-row gap-4"
        >
          <button
            onClick={() => navigate(`/${currentLang}/fabric`)}
            className="btn-primary flex-1 justify-center py-4 text-base"
          >
            {t('decision.btn_explore_fabric')}
            <ArrowRight size={18} strokeWidth={2} />
          </button>
          <button
            onClick={() => navigate(`/${currentLang}/opensource`)}
            className="btn-secondary flex-1 justify-center py-4 text-base"
          >
            {t('decision.btn_explore_os')}
            <ArrowRight size={18} strokeWidth={2} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
