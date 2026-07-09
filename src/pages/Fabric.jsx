import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Database, Shield, BarChart2, Cloud, Layers, ArrowLeft,
  CheckCircle, GitBranch, Lock, Server, Terminal
} from 'lucide-react'
import useTranslation from '../i18n/useTranslation'
import ArchCard from '../components/ArchCard'
import Mermaid from '../components/Mermaid'

export default function Fabric({ isDarkMode }) {
  const { t, currentLang } = useTranslation()
  const navigate = useNavigate()

  const components = [
    {
      icon: Cloud,
      title: t('fabric_page.comp_onelake_title'),
      subtitle: t('fabric_page.comp_onelake_sub'),
      description: t('fabric_page.comp_onelake_desc'),
      tags: ['Delta Lake', 'Parquet', 'ADLS Gen2', 'Multi-cloud'],
      recommended: true,
      delay: 0.1,
    },
    {
      icon: Shield,
      title: t('fabric_page.comp_purview_title'),
      subtitle: t('fabric_page.comp_purview_sub'),
      description: t('fabric_page.comp_purview_desc'),
      tags: ['Data Catalog', 'Lineage', 'LGPD / GDPR', 'RBAC', 'DLP'],
      recommended: true,
      delay: 0.2,
    },
    {
      icon: BarChart2,
      title: t('fabric_page.comp_pbi_title'),
      subtitle: t('fabric_page.comp_pbi_sub'),
      description: t('fabric_page.comp_pbi_desc'),
      tags: ['Direct Lake', 'DAX', 'Analysis Services', 'Sub-second'],
      recommended: false,
      delay: 0.3,
    },
    {
      icon: GitBranch,
      title: t('fabric_page.comp_df_title'),
      subtitle: t('fabric_page.comp_df_sub'),
      description: t('fabric_page.comp_df_desc'),
      tags: ['CDC', 'Low-code', 'Connectors', 'Real-time'],
      recommended: false,
      delay: 0.4,
    },
    {
      icon: Layers,
      title: t('fabric_page.comp_synapse_title'),
      subtitle: t('fabric_page.comp_synapse_sub'),
      description: t('fabric_page.comp_synapse_desc'),
      tags: ['Spark', 'T-SQL', 'Python', 'Notebooks'],
      recommended: false,
      delay: 0.5,
    },
    {
      icon: Lock,
      title: t('fabric_page.comp_sec_title'),
      subtitle: t('fabric_page.comp_sec_sub'),
      description: t('fabric_page.comp_sec_desc'),
      tags: ['Private Link', 'VNet', 'Zero Trust', 'IP-Restricted'],
      recommended: false,
      delay: 0.6,
    },
  ]

  const timeline = [
    { week: t('fabric_page.timeline_1_week'), desc: t('fabric_page.timeline_1_desc') },
    { week: t('fabric_page.timeline_2_week'), desc: t('fabric_page.timeline_2_desc') },
    { week: t('fabric_page.timeline_3_week'), desc: t('fabric_page.timeline_3_desc') },
    { week: t('fabric_page.timeline_4_week'), desc: t('fabric_page.timeline_4_desc') },
  ]

  // Formas de consumo analítico
  const consumptionModes = [
    {
      title: 'Power BI (Direct Lake)',
      desc: 'Visualização de relatórios em tempo real consultando os arquivos Parquet/Delta diretamente na memória da RAM do Analysis Services. Sem queries DirectQuery lentas e sem importar cópias de dados (Import Mode).',
      tags: ['Direct Lake', 'Zero Copy', 'DAX']
    },
    {
      title: 'SQL Endpoint (T-SQL)',
      desc: 'Cada Lakehouse/Warehouse expõe um endpoint SQL somente-leitura e totalmente compatível com ferramentas analíticas padrão. Permite consultas relacionais tradicionais de forma rápida e otimizada.',
      tags: ['SQL Server', 'T-SQL', 'DirectQuery']
    },
    {
      title: 'Notebooks (Python/Spark)',
      desc: 'Para cientistas e engenheiros de dados avançados, os dados em OneLake são expostos diretamente em sessões Spark prontas para uso via notebooks interativos de alta capacidade computacional.',
      tags: ['PySpark', 'Pandas', 'Machine Learning']
    }
  ]

  const fabricArchitectureChart = `
graph TD
    subgraph "${t('fabric_page.flow_sources')}"
        S1[("Banco de Dados")] & S2["Sistemas SaaS"] & S3["Arquivos/APIs"]
    end
    subgraph "${t('fabric_page.flow_fabric')}"
        SC{"${t('fabric_page.flow_shortcuts')}"} -- "Zero Copy" --> S1 & S2
        LH["${t('fabric_page.flow_lakehouse')}"] --> WH["${t('fabric_page.flow_warehouse')}"]
    end
    subgraph "${t('fabric_page.flow_governance')}"
        PV[["${t('fabric_page.flow_purview')}"]]
    end
    WH --> PBI["${t('fabric_page.flow_powerbi')}"]
    PV -.-> LH & WH
  `

  return (
    <main className="pt-16 bg-neutral dark:bg-slate-950 min-h-screen transition-colors duration-200">
      {/* Page header */}
      <div className="bg-white dark:bg-slate-900 border-b border-outline dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-16 py-12">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate(`/${currentLang}`)}
            className="flex items-center gap-2 text-label-md text-tertiary dark:text-slate-400 hover:text-primary dark:hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            {t('fabric_page.btn_back')}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="badge-amber">{t('fabric_page.tag_rec')}</span>
              <span className="badge">{t('fabric_page.tag_m365')}</span>
            </div>
            <h1 className="text-display-lg text-primary dark:text-white mb-4">
              {t('fabric_page.title')}
            </h1>
            <p className="text-body-lg text-tertiary dark:text-slate-300 max-w-2xl">
              {t('fabric_page.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Components grid */}
      <div className="max-w-6xl mx-auto px-16 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="text-headline-lg text-primary dark:text-white mb-8"
        >
          {t('fabric_page.comp_title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {components.map((comp) => (
            <ArchCard key={comp.title} {...comp} />
          ))}
        </div>

        {/* Architecture diagram (Mermaid) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-headline-lg text-primary dark:text-white mb-8">{t('fabric_page.flow_title')}</h2>
          <Mermaid chart={fabricArchitectureChart} isDarkMode={isDarkMode} />
        </motion.div>

        {/* Formas de Acesso (Consumo) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-16"
        >
          <h2 className="text-headline-lg text-primary dark:text-white mb-8">Formas de Acesso (Consumo)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {consumptionModes.map((mode, idx) => (
              <div key={mode.title} className="card dark:bg-slate-900 dark:border-slate-800 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-headline-md text-primary dark:text-white mb-2">{mode.title}</h3>
                  <p className="text-body-md text-tertiary dark:text-slate-400 mb-4">{mode.desc}</p>
                </div>
                <div className="flex flex-wrap gap-1 mt-4">
                  {mode.tags.map(tag => <span key={tag} className="badge">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Segurança & Governança (RLS) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          <div>
            <h2 className="text-headline-lg text-primary dark:text-white mb-4">{t('fabric_page.sec_gov_title')}</h2>
            <p className="text-body-md text-tertiary dark:text-slate-300">
              {t('fabric_page.sec_gov_desc')}
            </p>
          </div>
          <div className="code-block">
            <pre className="text-emerald-400 text-mono-md overflow-x-auto whitespace-pre">
              {t('fabric_page.sec_gov_code_title')}
            </pre>
          </div>
        </motion.div>

        {/* Implementation timeline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-headline-lg text-primary dark:text-white mb-8">{t('fabric_page.timeline_title')}</h2>
          <div className="space-y-0">
            {timeline.map((step, idx) => (
              <div key={step.week} className="flex gap-6">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className={`h-5 w-5 rounded-full border-2 flex-shrink-0 mt-1 ${
                    idx === 0 ? 'border-secondary bg-secondary' : 'border-outline dark:border-slate-800 bg-white dark:bg-slate-950'
                  }`} />
                  {idx < timeline.length - 1 && (
                    <div className="flex-1 w-px bg-outline dark:bg-slate-800 mt-1 mb-1" />
                  )}
                </div>
                {/* Content */}
                <div className="pb-8">
                  <span className="badge-amber mb-2 inline-block">{step.week}</span>
                  <p className="text-body-md text-tertiary dark:text-slate-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-6 bg-white dark:bg-slate-900 border border-outline dark:border-slate-800 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <CheckCircle size={20} strokeWidth={2} className="text-secondary" />
            <div>
              <p className="text-body-md font-medium text-primary dark:text-white">{t('fabric_page.cta_ready')}</p>
              <p className="text-label-md text-tertiary dark:text-slate-400">{t('fabric_page.cta_sub')}</p>
            </div>
          </div>
          <button onClick={() => navigate(`/${currentLang}/opensource`)} className="btn-secondary">
            {t('fabric_page.cta_btn')}
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-16 border-t border-outline dark:border-slate-900 bg-white dark:bg-slate-950 transition-colors duration-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-label-md text-tertiary dark:text-slate-400">
            Gláucio Alves Pereira Filho - {t('fabric_page.footer')}
          </p>
          <p className="text-label-md text-tertiary dark:text-slate-400">2026</p>
        </div>
      </footer>
    </main>
  )
}
