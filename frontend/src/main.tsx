import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/700.css'
import './styles/global.css'

import App from './App'
import { store } from './app/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
