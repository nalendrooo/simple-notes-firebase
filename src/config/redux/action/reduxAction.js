import configFirebase from '../../firebase'
import ActionType from '../reducer/reduxActionType'
import { getDatabase, ref, remove, set, push, onValue } from 'firebase/database'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export const registerUserAPI = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch({ type: ActionType.CHANGE_ISLOADING, value: true })
		const auth = getAuth()
		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				const dataUser = { email: userCredential.user.email }
				const status = true
				dispatch({ type: ActionType.CHANGE_ISLOADING, value: false })
				resolve({ status, dataUser })
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				const status = false
				dispatch({ type: ActionType.CHANGE_ISLOADING, value: false })
				reject({ status, errorMessage })
			})
	})
}

export const loginUserAPI = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch({ type: ActionType.CHANGE_ISLOADING, value: true })
		const auth = getAuth()

		signInWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				const dataUser = {
					email: userCredential.user.email,
					uid: userCredential.user.uid,
					emailVerified: userCredential.user.emailVerified,
					refreshToken: userCredential.user.refreshToken,
				}
				const status = true
				dispatch({ type: ActionType.CHANGE_ISLOADING, value: false })
				dispatch({ type: ActionType.CHANGE_ISLOGIN, value: true })
				dispatch({ type: ActionType.CHANGE_USER, value: dataUser })
				resolve({ status, dataUser })
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				const status = false

				dispatch({ type: ActionType.CHANGE_ISLOADING, value: false })
				dispatch({ type: ActionType.CHANGE_ISLOGIN, value: true })
				reject({ status, errorMessage })
			})
	})
}

export const addDataToAPI = (data) => (dispatch) => {
	const db = getDatabase()
	push(ref(db, 'notes/' + data.uid), {
		title: data.title,
		content: data.content,
		date: data.date,
	})
}

export const getDataFromAPI = (uid) => (dispatch) => {
	const db = getDatabase()
	const starCountRef = ref(db, 'notes/' + uid)
	return new Promise((resolve, reject) => {
		onValue(starCountRef, (snapshot) => {
			const data = []
			if (snapshot.val()) {
				Object.keys(snapshot.val()).map((key) => {
					data.push({
						id: key,
						data: snapshot.val()[key],
					})
				})
			}
			// console.log(snapshot.val())
			dispatch({ type: ActionType.SET_NOTES, value: data })
			resolve(snapshot.val())
		})
	})
}

export const updateDataFromAPI = (data) => (dispatch) => {
	const db = getDatabase()
	return new Promise((resolve, reject) => {
		set(ref(db, `notes/${data.uid}/${data.noteId}`), {
			title: data.title,
			content: data.content,
			date: data.date,
		})
		dispatch({ type: ActionType.SET_NOTES, value: data })
		resolve(true)
	})
}

export const deleteDataFromAPI = (data) => (dispatch) => {
	const db = getDatabase()
	return new Promise((resolve, reject) => {
		remove(ref(db, `notes/${data.userId}/${data.noteId}`))
		resolve(true)
	})
}
