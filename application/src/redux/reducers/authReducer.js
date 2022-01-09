import { LOGIN, LOGOUT } from '../actions/types'

const INITIAL_STATE = { email: '', token: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, email: action.payload.email, token: action.payload.token } //payload.login -> payload.email

        case LOGOUT:
            return { ...state, ...INITIAL_STATE }
        default:
            return state;
    }
}