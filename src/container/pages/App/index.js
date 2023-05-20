import logo from '../../../assets/img/logo/logo.svg'
import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Dashboard from '../Dashboard'
import Login from '../Login'
import Register from '../Register'

function App() {
	return (
		<BrowserRouter>
			{/* <nav>
				<ul>
					<li>
						<Link to={'/'}>Dashboard</Link>
					</li>
					<li>
						<Link to={'/login'}>Login</Link>
					</li>
					<li>
						<Link to={'/register'}>Register</Link>
					</li>
				</ul>
			</nav> */}
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
