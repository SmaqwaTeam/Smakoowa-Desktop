import React from 'react'
import RecipeDataProvider from './context/contextData'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecipeDataProvider>
      <App />
    </RecipeDataProvider>
  </React.StrictMode>
)
