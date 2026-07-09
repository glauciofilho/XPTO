# Case Técnico XPTO — Plataforma de Dados & Governança

Esta é uma aplicação interativa (React + Vite + Tailwind CSS) desenvolvida para atuar como suporte visual em uma defesa técnica de 15 minutos para um cargo de Arquitetura de Dados Sênior na **XPTO** (cenário com mais de 50 sistemas de origem e silos).

O projeto apresenta a arquitetura conceitual e detalhada, comparando de forma crítica a recomendação do **Microsoft Fabric** contra a alternativa **Open Source**.

---

## 🚀 Como Executar o Projeto

1. **Instalar Dependências:**
   ```bash
   npm install
   ```

2. **Executar o Servidor de Desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação em: [http://localhost:5173/](http://localhost:5173/)

3. **Gerar Build de Produção:**
   ```bash
   npm run build
   ```

---

## 🎨 Funcionalidades & Requisitos Atendidos (DESIGN.md + CLAUDE.md)

1. **Internacionalização (i18n):**
   - Suporte completo a três idiomas: **Português (PT)**, **Inglês (EN)** e **Espanhol (ES)**.
   - Rotas amigáveis na estrutura: `/:lang/:page` (ex: `/pt`, `/en/fabric`, `/es/opensource`).
   - Redirecionamento automático inteligente para `/pt` caso nenhum idioma seja informado.
   - Dicionários JSON separados localizados em `src/i18n/`.

2. **Diagramas Dinâmicos (Mermaid.js):**
   - Renderização no cliente de diagramas como código (`Diagram-as-Code`).
   - **Tradução em tempo real** de todas as caixas, nós e subgrafos de acordo com o idioma ativo.
   - **Sincronização com o Dark Mode**: O tema do Mermaid se ajusta automaticamente.

3. **Dark Mode:**
   - Suporte a temas claro e escuro integrado através de classes do Tailwind CSS.
   - Chaveador de tema na barra de navegação com salvamento persistente no `localStorage`.

4. **Modelagem de Dados (Star Schema vs. Snowflake):**
   - Nova seção na Home detalhando as 3 razões (Performance, Usabilidade e Mantenibilidade de KPIs) para adotar a modelagem desnormalizada (Star Schema) na camada de consumo (Gold).
   - Diagrama de relacionamento de entidades dinâmico da tabela fato e dimensões.

5. **Simetria de Defesa:**
   - Ambas as páginas de caminhos (Fabric e Open Source) possuem estruturas perfeitamente alinhadas para viabilizar um contraste direto:
     - Diagrama de Fluxo Mermaid
     - Formas de Acesso/Consumo (Direct Lake Power BI vs. Superset/Trino)
     - RLS (Row-Level Security) detalhado com scripts demonstrativos para cada stack
     - Cronograma e Roadmap de Implantação

6. **Responsividade & UX Premium:**
   - No celular ou telas menores, as tabelas complexas se transformam automaticamente em cards verticais de fácil leitura.
   - Os diagramas Mermaid possuem containers com scroll horizontal suave no mobile para não quebrar a largura da tela.
   - Animações refinadas de rolagem e de entrada de tela via `Framer Motion`.

---

## 📂 Estrutura de Diretórios

```
c:\Projetos\XPTO\
├── src/
│   ├── components/
│   │   ├── ArchCard.jsx            # Card para componentes de arquitetura
│   │   ├── Contexto.jsx            # Seção de diagnóstico do caos de fontes
│   │   ├── DecisaoTable.jsx        # Tabela comparativa responsiva (TCO, RLS, etc.)
│   │   ├── Hero.jsx                # Seção inicial animada com dados de impacto
│   │   ├── Mermaid.jsx             # Renderizador dinâmico de Mermaid.js
│   │   ├── Modelagem.jsx           # Seção do pipeline Medalhão com diagrama
│   │   ├── ModelagemDimensional.jsx # Seção explicativa Star Schema com ERD
│   │   └── Navbar.jsx              # Menu fixo com chaveadores de idioma e tema
│   ├── i18n/
│   │   ├── pt.json                 # Dicionário de português
│   │   ├── en.json                 # Dicionário de inglês
│   │   ├── es.json                 # Dicionário de espanhol
│   │   └── useTranslation.js       # Hook customizado de i18n
│   ├── pages/
│   │   ├── Home.jsx                # Página de Storytelling principal
│   │   ├── Fabric.jsx              # Arquitetura recomendada (Microsoft Fabric)
│   │   └── OpenSource.jsx          # Arquitetura alternativa (Open Source)
│   ├── App.jsx                     # Configuração de rotas e do tema escuro
│   ├── index.css                   # Definições base do CSS e tokens do DESIGN.md
│   └── main.jsx                    # Ponto de entrada do React
├── tailwind.config.js              # Configurações de cores e fontes corporativas
├── package.json
└── README.md
```

---

## 🛡️ Segurança & Governança (RLS)

A política de **Row-Level Security (RLS)** apresentada na Gold garante a democratização de dados sem comprometer a confidencialidade das filiais da XPTO:
- **No Fabric:** RLS configurado centralmente via política de segurança SQL no endpoint analítico, propagando de forma nativa para relatórios via Direct Lake.
- **No Open Source:** RLS implementado via políticas PostgreSQL no Serving Database ou logicamente em filtros de grupos do Apache Superset.
