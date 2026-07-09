import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Inbox, Layers, Award } from 'lucide-react'
import useTranslation from '../i18n/useTranslation'
import Mermaid from './Mermaid'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Modelagem({ isDarkMode }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const layers = [
    {
      id: 'raw',
      icon: Inbox,
      name: t('medallion.raw_name'),
      subtitle: t('medallion.raw_sub'),
      color: 'border-l-neutral-200 dark:border-l-slate-700 bg-white dark:bg-slate-900',
      iconColor: 'text-tertiary dark:text-slate-400',
      badgeClass: 'badge',
      badgeText: t('medallion.raw_badge'),
      items: t('medallion.raw_items', { returnObjects: true }) || [],
      schema: '{ raw_id, source_ts, payload_json }',
    },
    {
      id: 'bronze',
      icon: Layers,
      name: t('medallion.bronze_name'),
      subtitle: t('medallion.bronze_sub'),
      color: 'border-l-amber-300 dark:border-l-amber-500 bg-white dark:bg-slate-900',
      iconColor: 'text-amber-600 dark:text-amber-400',
      badgeClass: 'badge',
      badgeText: t('medallion.bronze_badge'),
      items: t('medallion.bronze_items', { returnObjects: true }) || [],
      schema: '{ id, source, ingested_at, is_valid, ... }',
    },
    {
      id: 'silver',
      icon: Layers,
      name: t('medallion.silver_name'),
      subtitle: t('medallion.silver_sub'),
      color: 'border-l-slate-400 dark:border-l-slate-600 bg-white dark:bg-slate-900',
      iconColor: 'text-slate-500 dark:text-slate-400',
      badgeClass: 'badge',
      badgeText: t('medallion.silver_badge'),
      items: t('medallion.silver_items', { returnObjects: true }) || [],
      schema: '{ entity_key, valid_from, valid_to, ... }',
    },
    {
      id: 'gold',
      icon: Award,
      name: t('medallion.gold_name'),
      subtitle: t('medallion.gold_sub'),
      color: 'border-l-yellow-400 dark:border-l-yellow-600 bg-white dark:bg-slate-900',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      badgeClass: 'badge-amber',
      badgeText: t('medallion.gold_badge'),
      items: t('medallion.gold_items', { returnObjects: true }) || [],
      schema: '{ fact_key, dim_*, metric_*, updated_at }',
    },
  ]

  const medallionChart = `
graph LR
    subgraph "${t('medallion.diagram_lake')}"
        Raw["<b>${t('medallion.raw_name')}</b><br/>${t('medallion.diagram_raw_desc')}"] --> Bronze["<b>${t('medallion.bronze_name')}</b><br/>${t('medallion.diagram_bronze_desc')}"]
        Bronze --> Silver["<b>${t('medallion.silver_name')}</b><br/>${t('medallion.diagram_silver_desc')}"]
    end
    subgraph "${t('medallion.diagram_dw')}"
        Silver --> Gold["<b>${t('medallion.gold_name')}</b><br/>${t('medallion.diagram_gold_desc')}"]
    end
    Gold --> BI["${t('medallion.diagram_consumption')}"]
  `

  // Se for array simples de strings obtidos por split/JSON
  // t() retorna o array mapeado se o JSON possuir array
  const getListItems = (layerId) => {
    // Retorno manual das chaves para garantir 100% de precisão das traduções sem depender de interpretador de objeto
    return t(`medallion.${layerId}_items`) || []
  }

  return (
    <section id="modelagem" className="section bg-white dark:bg-slate-950 border-t border-outline dark:border-slate-900 transition-colors duration-200">
      <div className="section-container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-label-md text-secondary font-medium mb-2 uppercase tracking-wider">
            {t('medallion.tag')}
          </p>
          <h2 className="text-headline-lg text-primary dark:text-white mb-4">
            {t('medallion.title')}
          </h2>
          <p className="text-body-lg text-tertiary dark:text-slate-300 max-w-2xl">
            {t('medallion.subtitle')}
          </p>
        </motion.div>

        {/* Diagrama conceitual em Mermaid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Mermaid chart={medallionChart} isDarkMode={isDarkMode} />
        </motion.div>

        {/* Pipeline visual: cards das camadas */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {layers.map((layer) => {
            const Icon = layer.icon
            const items = getListItems(layer.id)
            return (
              <motion.div
                key={layer.id}
                variants={itemVariants}
                className={`layer-card border-l-4 ${layer.color} dark:border-slate-800 p-5 rounded-lg flex flex-col justify-between h-full`}
              >
                <div>
                  {/* Layer header */}
                  <div className="flex items-center justify-between mb-3">
                    <Icon size={18} strokeWidth={2} className={layer.iconColor} />
                    <span className={layer.badgeClass}>{layer.badgeText}</span>
                  </div>

                  <h3 className="text-headline-md text-primary dark:text-white mb-0.5">{layer.name}</h3>
                  <p className="text-label-md text-tertiary dark:text-slate-400 mb-4">{layer.subtitle}</p>

                  <ul className="space-y-2 mb-5">
                    {Array.isArray(items) && items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-body-md text-tertiary dark:text-slate-400">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-outline-variant dark:bg-slate-700 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Schema snippet */}
                <div className="mt-auto pt-3 border-t border-outline dark:border-slate-800">
                  <code className="text-mono-md text-tertiary dark:text-slate-400 break-all">{layer.schema}</code>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Progress bar legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8"
        >
          <p className="text-label-md text-tertiary dark:text-slate-400 mb-2">{t('medallion.maturity')}</p>
          <div className="flex gap-1 h-1 rounded-full overflow-hidden">
            <div className="flex-1 bg-neutral-200 dark:bg-slate-800" title="Raw" />
            <div className="flex-1 bg-amber-300 dark:bg-amber-700" title="Bronze" />
            <div className="flex-1 bg-slate-400 dark:bg-slate-600" title="Silver" />
            <div className="flex-1 bg-secondary" title="Gold" />
          </div>
          <div className="flex justify-between text-label-md text-tertiary dark:text-slate-400 mt-1">
            <span>{t('medallion.raw_label')}</span>
            <span>{t('medallion.gold_label')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
