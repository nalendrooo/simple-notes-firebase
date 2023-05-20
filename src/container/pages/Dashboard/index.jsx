import * as React from 'react'
import './dashboard.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addDataToAPI, getDataFromAPI, updateDataFromAPI, deleteDataFromAPI } from '../../../config/redux/action/reduxAction'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
	const [state, setState] = React.useState({
		uid: '',
		title: '',
		content: '',
		date: '',
	})
	const [button, setButton] = React.useState({
		txtButton: 'Simpan',
	})
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const notes = useSelector((state) => state.notes)
	const userData = JSON.parse(sessionStorage.getItem('userData'))

	let uid
	if (userData !== null) {
		uid = userData.uid
	}

	const handleChangeText = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		})
	}

	const handleSaveNotes = () => {
		const data = {
			...state,
			uid: uid,
			date: new Date().getTime(),
		}
		setState({
			uid: '',
			title: '',
			content: '',
			date: '',
		})

		if(button.txtButton === 'Simpan'){
			dispatch(addDataToAPI(data))
			alert('Notes berhasil ditambahkan!')
		} else {
			dispatch(updateDataFromAPI(data))
			alert('Notes berhasil diupdate!')

			setButton({
				txtButton: 'Simpan',
			})
		}

	}

	const updateNotes = (notes) => {
		// console.log(notes)
		setState({
			...state,
			title: notes.data.title,
			content: notes.data.content,
			noteId: notes.id
		})
		setButton({
			txtButton: 'Update',
		})
	}

	const cancleUpdate = () => {
		setState({
			title: '',
			content: '',
		})
		setButton({
			txtButton: 'Simpan',
		})
	}

	const deleteNotes = (e, note) => {
		e.stopPropagation()
		const data = {
			userId: uid,
			noteId: note
		}
		alert(`Data ${note} berhasil dihapus!`)
		dispatch(deleteDataFromAPI(data))
	}

	React.useEffect(() => {
		if (userData === null) {
			navigate('/login')
		} else {
			dispatch(getDataFromAPI(uid))
		}

	}, [])
	return (
		<div className="container">
			<div className="input-form">
				<input
					name="title"
					type="text"
					placeholder="Title"
					className="input-title"
					value={state.title}
					onChange={handleChangeText}
				/>
				<textarea
					name="content"
					placeholder="Content"
					id=""
					cols="46"
					rows="0"
					value={state.content}
					onChange={handleChangeText}
				/>
				<div className="action-wrapper">
					<button className="save-btn" onClick={handleSaveNotes}>
						{button.txtButton}
					</button>
					{button.txtButton === 'Update' ? (
						<button className="cancle-btn" onClick={cancleUpdate}>
							Cancle
						</button>
					) : null}
				</div>
				{notes.length > 0 ? (
					<React.Fragment>
						{notes.map((item) => {
							return (
								<div key={item.id} className="card-content" onClick={() => updateNotes(item)}>
									<p className="title">{item.data.title}</p>
									<p className="date">{item.data.date}</p>
									<p className="content">{item.data.content}</p>

									<div className="btn-delete" onClick={(e) => deleteNotes(e, item.id)}>×</div>
								</div>
							)
						})}
					</React.Fragment>
				) : null}
			</div>
		</div>
	)
}

export default Dashboard
