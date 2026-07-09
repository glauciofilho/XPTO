import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Wind, Server, BarChart2, ArrowLeft, GitBranch,
  CheckCircle, AlertTriangle, Database, Terminal, Shield, Lock
} from 'lucide-react'
import useTranslation from '../i18n/useTranslation'
import ArchCard from '../components/ArchCard'
import Mermaid from '../components/Mermaid'

export default function OpenSource({ isDarkMode }) {
  const { t, currentLang } = useTranslation()
  const navigate = useNavigate()

  const components = [
    {
      icon: Wind,
      title: t('opensource_page.comp_airflow_title'),
      subtitle: t('opensource_page.comp_airflow_sub'),
      description: t('opensource_page.comp_airflow_desc'),
      tags: ['Python', 'DAGs', 'Docker', 'CeleryExecutor'],
      recommended: false,
      delay: 0.1,
    },
    {
      icon: Database,
      title: t('opensource_page.comp_spark_title'),
      subtitle: t('opensource_page.comp_spark_sub'),
      description: t('opensource_page.comp_spark_desc'),
      tags: ['PySpark', 'Delta Lake', 'Self-hosted', 'High Scale'],
      recommended: false,
      delay: 0.2,
    },
    {
      icon: Server,
      title: t('opensource_page.comp_minio_title'),
      subtitle: t('opensource_page.comp_minio_sub'),
      description: t('opensource_page.comp_minio_desc'),
      tags: ['S3 API', 'MinIO-Cluster', 'Erasure coding'],
      recommended: false,
      delay: 0.3,
    },
    {
      icon: GitBranch,
      title: t('opensource_page.comp_dbt_title'),
      subtitle: t('opensource_page.comp_dbt_sub'),
      description: t('opensource_page.comp_dbt_desc'),
      tags: ['SQL', 'Models', 'dbt Tests', 'Version Control'],
      recommended: false,
      delay: 0.4,
    },
    {
      icon: BarChart2,
      title: t('opensource_page.comp_superset_title'),
      subtitle: t('opensource_page.comp_superset_sub'),
      description: t('opensource_page.comp_superset_desc'),
      tags: ['Dashboards', 'SQL Lab', 'OAuth2', 'No License Fee'],
      recommended: false,
      delay: 0.5,
    },
    {
      icon: Terminal,
      title: t('opensource_page.comp_gov_title'),
      subtitle: t('opensource_page.comp_gov_sub'),
      description: t('opensource_page.comp_gov_desc'),
      tags: ['Ranger RBAC', 'OpenMetadata', 'Manual Lineage'],
      recommended: false,
      delay: 0.6,
    },
  ]

  const tradeoffs = [
    {
      type: 'pro',
      title: t('opensource_page.pro_title'),
      items: t('opensource_page.pros', { returnObjects: true }) || [],
    },
    {
      type: 'con',
      title: t('opensource_page.con_title'),
      items: t('opensource_page.cons', { returnObjects: true }) || [],
    },
  ]

  // Formas de consumo analítico
  const consumptionModes = [
    {
      title: 'Apache Superset (Dashboards)',
      desc: 'Plataforma rica e de código aberto para criar fatiadores de dados e gráficos analíticos conectados ao warehouse de faturamento da XPTO, livre de custos recorrentes de licenças por usuário.',
      tags: ['Superset BI', 'SQL Lab', 'Charts']
    },
    {
      title: 'Trino (Queries Federadas)',
      desc: 'Motor de consulta SQL distribuído capaz de interrogar dados armazenados em MinIO (Delta Lake) e bases relacionais externas sem necessidade de mover os dados, minimizando gargalos de rede.',
      tags: ['Trino SQL', 'Ad-hoc query', 'Data Federation']
    },
    {
      title: 'dbt Docs (Dicionário & Linhagem)',
      desc: 'Documentação viva gerada a partir dos modelos SQL, oferecendo linhagem visual interativa e testes de qualidade das tabelas fato e dimensão para consumo interno da equipe de analistas.',
      tags: ['Lineage', 'Metadata', 'SQL Documentation']
    }
  ]

  // Cronograma simétrico de implantação
  const timeline = [
    { week: t('fabric_page.timeline_1_week'), desc: 'Provisionamento de infraestrutura virtual (VPS), instalação do cluster Docker, configuração do Apache Airflow e armazenamento MinIO.' },
    { week: t('fabric_page.timeline_2_week'), desc: 'Desenvolvimento das DAGs de ingestão para as 50 fontes da XPTO. Escrita de scripts PySpark para gravação de dados crus no MinIO (camada Raw/Bronze).' },
    { week: t('fabric_page.timeline_3_week'), desc: 'Montagem dos pipelines de dbt para construir e testar a camada Silver. Integração inicial das ferramentas OpenMetadata e Ranger.' },
    { week: t('fabric_page.timeline_4_week'), desc: 'Modelagem Gold de faturamento, aplicação de políticas de Row-Level Security no banco de dados analítico e configuração dos dashboards no Superset.' },
  ]

  const openSourceArchitectureChart = `
graph TD
    subgraph "${t('fabric_page.flow_sources')}"
        S1[("Banco de Dados")] & S2["Sistemas SaaS"] & S3["Arquivos/APIs"]
    end
    subgraph "${t('opensource_page.flow_infra')}"
        AF["${t('opensource_page.flow_airflow')}"] --> SP["${t('opensource_page.flow_spark')}"]
        SP --> MinIO[("${t('opensource_page.flow_minio')}")]
        MinIO --> PG[("${t('opensource_page.flow_pg')}")]
    end
    subgraph "${t('opensource_page.flow_access')}"
        PG --> SS["${t('opensource_page.flow_superset')}"]
        DH[["${t('opensource_page.flow_datahub')}"]]
    end
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
            {t('opensource_page.btn_back')}
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="badge">{t('opensource_page.tag_alt')}</span>
              <span className="badge">{t('opensource_page.tag_managed')}</span>
            </div>
            <h1 className="text-display-lg text-primary dark:text-white mb-4">
              {t('opensource_page.title')}
            </h1>
            <p className="text-body-lg text-tertiary dark:text-slate-300 max-w-2xl">
              {t('opensource_page.subtitle')}
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
          {t('opensource_page.comp_title')}
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
          <h2 className="text-headline-lg text-primary dark:text-white mb-8">{t('opensource_page.flow_title')}</h2>
          <Mermaid chart={openSourceArchitectureChart} isDarkMode={isDarkMode} />
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
            {consumptionModes.map((mode) => (
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
            <h2 className="text-headline-lg text-primary dark:text-white mb-4">{t('opensource_page.sec_gov_title')}</h2>
            <p className="text-body-md text-tertiary dark:text-slate-300">
              {t('opensource_page.sec_gov_desc')}
            </p>
          </div>
          <div className="code-block">
            <pre className="text-emerald-400 text-mono-md overflow-x-auto whitespace-pre">
              {t('opensource_page.sec_gov_code_title')}
            </pre>
          </div>
        </motion.div>

        {/* Trade-off analysis */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-16"
        >
          <h2 className="text-headline-lg text-primary dark:text-white mb-8">{t('opensource_page.tradeoffs_title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tradeoffs.map((tGroup) => (
              <div key={tGroup.type} className="card dark:bg-slate-900 dark:border-slate-800">
                <h3 className="flex items-center gap-2 text-headline-md text-primary dark:text-white mb-5">
                  {tGroup.type === 'pro' ? (
                    <CheckCircle size={18} strokeWidth={2} className="text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <AlertTriangle size={18} strokeWidth={2} className="text-secondary" />
                  )}
                  {tGroup.title}
                </h3>
                <ul className="space-y-3">
                  {tGroup.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-body-md text-tertiary dark:text-slate-400">
                      {tGroup.type === 'pro' ? (
                        <CheckCircle size={14} strokeWidth={2} className="text-emerald-500 dark:text-emerald-400 mt-1 flex-shrink-0" />
                      ) : (
                        <AlertTriangle size={14} strokeWidth={2} className="text-secondary mt-1 flex-shrink-0" />
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Implementation timeline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
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

        {/* Alternative scenario note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="p-6 bg-white dark:bg-slate-900 border border-outline dark:border-slate-800 rounded-lg"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle size={20} strokeWidth={2} className="text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-headline-md text-primary dark:text-white mb-1">
                {t('opensource_page.alt_scenario_title')}
              </h3>
              <p className="text-body-md text-tertiary dark:text-slate-300">
                {t('opensource_page.alt_scenario_desc')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col md:flex-row gap-4"
        >
          <button onClick={() => navigate(`/${currentLang}/fabric`)} className="btn-primary flex-1 justify-center py-4 text-base">
            {t('opensource_page.cta_recommended')}
          </button>
          <button onClick={() => navigate(`/${currentLang}`)} className="btn-secondary flex-1 justify-center py-4 text-base">
            {t('opensource_page.btn_back')}
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-16 border-t border-outline dark:border-slate-900 bg-white dark:bg-slate-950 transition-colors duration-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <p className="text-label-md text-tertiary dark:text-slate-400">{t('opensource_page.footer')}</p>
          <p className="text-label-md text-tertiary dark:text-slate-400">2026</p>
        </div>
      </footer>
    </main>
  )
}
