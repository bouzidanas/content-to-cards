import React from 'react'
import ReactDOM from 'react-dom/client'
import Cards from './App.tsx'
import './index.css'

const sampleMarkdown = `# **Israel admits "mistake"** of killing civilians on bicycle 
# **March 3, 2024**
---
**CONTEXT**

A times analysis of drone footage published by the Israeli military on March 3 shows that the target of a strike was
---
## Slide 3`

const sampleCardTitles = ["card 1", "card 2", "card 3", "card 4", "card 5"]

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Cards
      markdown={sampleMarkdown}
      cardTitles={sampleCardTitles}
    />
  </React.StrictMode>,
)
