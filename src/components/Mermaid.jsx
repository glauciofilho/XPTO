import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

let mermaidIdCounter = 0

export default function Mermaid({ chart, isDarkMode = false }) {
  const containerRef = useRef(null)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(null)
  const id = useRef(`mermaid-diagram-${++mermaidIdCounter}`)

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: isDarkMode ? 'dark' : 'neutral',
      securityLevel: 'loose',
      fontFamily: 'Inter, system-ui, sans-serif',
      themeVariables: {
        primaryColor: isDarkMode ? '#1e293b' : '#f8f9fa',
        primaryTextColor: isDarkMode ? '#f8f9fa' : '#191c1d',
        lineColor: isDarkMode ? '#475569' : '#e2e8f0',
        textColor: isDarkMode ? '#f8f9fa' : '#191c1d',
        nodeBorder: isDarkMode ? '#475569' : '#cbd5e1',
      }
    })
  }, [isDarkMode])

  useEffect(() => {
    if (!chart || !containerRef.current) return

    setSvg('')
    setError(null)

    const renderChart = async () => {
      try {
        const cleanChart = chart.trim()
        const { svg: renderedSvg } = await mermaid.render(id.current, cleanChart)
        setSvg(renderedSvg)
      } catch (err) {
        console.error('Mermaid render error:', err)
        setError(err)
        // Limpar o cache interno do mermaid em caso de erro
        const badge = document.getElementById(id.current)
        if (badge) badge.remove()
      }
    }

    // Um pequeno timeout para garantir a inicialização e evitar corrida
    const timer = setTimeout(() => {
      renderChart()
    }, 50)

    return () => clearTimeout(timer)
  }, [chart, isDarkMode])

  return (
    <div className="w-full overflow-x-auto py-4 border border-outline rounded-lg bg-white dark:bg-slate-900/40 transition-colors">
      <div ref={containerRef} className="flex justify-center min-w-[600px] px-4">
        {error ? (
          <div className="text-error text-mono-md p-4">
            Erro ao renderizar o diagrama técnico.
          </div>
        ) : svg ? (
          <div
            className="w-full flex justify-center text-primary dark:text-neutral"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="text-tertiary text-label-md py-8 animate-pulse">
            Carregando diagrama analítico...
          </div>
        )}
      </div>
    </div>
  )
}
