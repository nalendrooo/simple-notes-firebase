import { initializeApp } from 'firebase/app'

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
	apiKey: 'AIzaSyA6uzv36nR08_nuY8Bmr7muwWkIbn7ocY4',
	authDomain: 'simple-notes-229dc.firebaseapp.com',
	projectId: 'simple-notes-229dc',
	storageBucket: 'simple-notes-229dc.appspot.com',
	messagingSenderId: '1049827029663',
	appId: '1:1049827029663:web:9c712a31c0881d2c9d68aa',
	databaseURL: 'https://simple-notes-229dc-default-rtdb.asia-southeast1.firebasedatabase.app/',
}

const firebase = initializeApp(firebaseConfig)
const configFirebase = {
	firebase,
}

export default { configFirebase }
