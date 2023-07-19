import React from 'react'
import ReactDOM from 'react-dom/client'
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components'
import TopLevelErrorBoundary from './components/TopLevelErrorBoundary.tsx'
import App from './App.tsx'

ReactDOM.createRoot(document.querySelector('main')!).render(
  <React.StrictMode>
    <TopLevelErrorBoundary>
      <FluentProvider theme={teamsLightTheme}>
        <App />
      </FluentProvider>
    </TopLevelErrorBoundary>
  </React.StrictMode>
)
