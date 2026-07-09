import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import useTranslation from '../i18n/useTranslation'
import Mermaid from './Mermaid'

export default function ModelagemDimensional({ isDarkMode }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  // Diagrama Star Schema traduzível
  const starSchemaChart = `
erDiagram
    ${t('star_schema.diag_sales_fact')} ||--o{ ${t('star_schema.diag_prod_dim')} : "Product_Key"
    ${t('star_schema.diag_sales_fact')} ||--o{ ${t('star_schema.diag_date_dim')} : "Date_Key"
    ${t('star_schema.diag_sales_fact')} ||--o{ ${t('star_schema.diag_cust_dim')} : "Customer_Key"
    
    ${t('star_schema.diag_sales_fact')} {
        int sales_id
        float total_amount
        int quantity
    }
    ${t('star_schema.diag_prod_dim')} {
        string name
        string category
        string brand
    }
    ${t('star_schema.diag_date_dim')} {
        date date
        int month
        int year
    }
    ${t('star_schema.diag_cust_dim')} {
        string name
        string email
        string region
    }
  `

  return (
    <section ref={ref} className="section bg-neutral dark:bg-slate-950 border-t border-outline dark:border-slate-900 transition-colors duration-200">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-left"
        >
          <p className="text-label-md text-secondary font-medium mb-2 uppercase tracking-wider">
            {t('medallion.tag')} — STAR SCHEMA
          </p>
          <h2 className="text-headline-lg text-primary dark:text-white mb-4">
            {t('star_schema.title')}
          </h2>
          <p className="text-body-lg text-tertiary dark:text-slate-300 max-w-2xl">
            {t('star_schema.subtitle')}
          </p>
        </motion.div>

        {/* Content Split: 3 points explanation + Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Points column */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card dark:bg-slate-900 dark:border-slate-800"
            >
              <h3 className="text-headline-md text-primary dark:text-white mb-2">
                {t('star_schema.perf_title')}
              </h3>
              <p className="text-body-md text-tertiary dark:text-slate-400">
                {t('star_schema.perf_desc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card dark:bg-slate-900 dark:border-slate-800"
            >
              <h3 className="text-headline-md text-primary dark:text-white mb-2">
                {t('star_schema.usability_title')}
              </h3>
              <p className="text-body-md text-tertiary dark:text-slate-400">
                {t('star_schema.usability_desc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card dark:bg-slate-900 dark:border-slate-800"
            >
              <h3 className="text-headline-md text-primary dark:text-white mb-2">
                {t('star_schema.maint_title')}
              </h3>
              <p className="text-body-md text-tertiary dark:text-slate-400">
                {t('star_schema.maint_desc')}
              </p>
            </motion.div>
          </div>

          {/* Diagram column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <Mermaid chart={starSchemaChart} isDarkMode={isDarkMode} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
