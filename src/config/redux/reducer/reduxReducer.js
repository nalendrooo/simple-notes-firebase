import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import ActionType from './reduxActionType'
import initialState from '../store/reduxStore'

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionType.CHANGE_POPUP:
			return {
				...state,
				popup: action.value,
			}
		case ActionType.CHANGE_ISLOGIN:
			return {
				...state,
				isLogin: action.value,
			}
		case ActionType.CHANGE_USER:
			return {
				...state,
				user: action.value,
			}
		case ActionType.CHANGE_ISLOADING:
			return {
				...state,
				isLoading: action.value,
			}
		case ActionType.CHANGE_ISLOGIN:
			return {
				...state,
				isLogin: action.value,
			}
		case ActionType.SET_NOTES:
			return {
				...state,
				notes: action.value,
			}
	}
	return state
}

const storeRedux = createStore(rootReducer, applyMiddleware(thunk))

export default storeRedux
