import { motion } from 'framer-motion'

export default function ArchCard({ icon: Icon, title, subtitle, description, tags = [], delay = 0, recommended = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`card h-full flex flex-col transition-all duration-200 dark:bg-slate-900 dark:border-slate-800 ${
        recommended ? 'border-secondary/60 ring-1 ring-secondary/30 dark:border-secondary/80 dark:ring-secondary/20' : ''
      }`}
    >
      {/* Icon + recommended badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 border border-outline dark:border-slate-800 rounded bg-neutral-100 dark:bg-slate-950">
          <Icon size={20} strokeWidth={2} className={recommended ? 'text-secondary' : 'text-tertiary dark:text-slate-400'} />
        </div>
        {recommended && (
          <span className="badge-amber text-xs">Recomendado</span>
        )}
      </div>

      <h3 className="text-headline-md text-primary dark:text-white mb-1">{title}</h3>
      <p className="text-label-md text-tertiary dark:text-slate-400 mb-3">{subtitle}</p>
      <p className="text-body-md text-tertiary dark:text-slate-300 flex-1">{description}</p>

      {tags.length > 0 && (
        <div className="mt-5 pt-4 border-t border-outline dark:border-slate-800/80 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="badge dark:bg-slate-850 dark:text-slate-300">{tag}</span>
          ))}
        </div>
      )}
    </motion.div>
  )
}
