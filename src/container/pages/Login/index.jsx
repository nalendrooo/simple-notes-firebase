import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../component/atoms/Button'
import { loginUserAPI } from '../../../config/redux/action/reduxAction'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const [state, setState] = React.useState({
		email: '',
		password: '',
	})
	const dispatch = useDispatch()
	const isLoading = useSelector((state) => state.isLoading)
	const navigate = useNavigate()
	const userData = JSON.parse(sessionStorage.getItem('userData'))

	const handleChangeText = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		})
	}

	const handleLoginSubmit = async () => {
		const res = await dispatch(loginUserAPI(state)).catch((err) => err)
		if (res.status) {
			setState({
				email: '',
				password: '',
			})
			navigate('/')
			sessionStorage.setItem('userData', JSON.stringify(res.dataUser))
		} else {
			console.log(res.errorMessage)
		}
	}

	React.useEffect(() => {
		if (userData !== null) {
			navigate('/')
		}
		document.title = 'Login'
	}, [])

	return (
		<div className="auth-container">
			<div className="auth-card">
				<p className="auth-title">Login Page</p>
				<input
					name="email"
					className="input"
					placeholder="Masukkan Email"
					type="text"
					value={state.email}
					onChange={handleChangeText}
				/>
				<input
					name="password"
					className="input"
					placeholder="Masukkan Password"
					type="password"
					value={state.password}
					onChange={handleChangeText}
				/>
				<Button title="Login" onClick={handleLoginSubmit} loading={isLoading} />
			</div>
		</div>
	)
}

export default Login
