import * as React from 'react'
import './register.css'
import Button from '../../../component/atoms/Button'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserAPI } from '../../../config/redux/action/reduxAction'
import { useNavigate } from 'react-router-dom'

const Register = () => {
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

	const handleRegisterSubmit = async () => {
		const res = await dispatch(registerUserAPI(state)).catch((err) => err)
		if (res) {
			setState({
				email: '',
				password: '',
			})
			navigate('/login')
			console.log('success:', res.dataUser)
		} else {
			console.log('Register failed')
			console.log(res.errorMessage)
		}
	}

	React.useEffect(() => {
		if (userData !== null) {
			navigate('/')
		}
		document.title = 'Register'
	}, [])

	return (
		<div className="auth-container">
			<div className="auth-card">
				<p className="auth-title">Register Page</p>
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
				<Button title="Register" onClick={handleRegisterSubmit} loading={isLoading} />
			</div>
		</div>
	)
}

export default Register
