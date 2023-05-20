import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './container/pages/App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import storeRedux from './config/redux/reducer/reduxReducer'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={storeRedux}>
		<App />
	</Provider>
)
console.clear()

// reportWebVitals()
