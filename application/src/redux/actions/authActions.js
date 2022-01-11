import { LOGIN, LOGOUT } from './types';
import { SERVER_IP } from '../../private'
import { fakeAuth } from '../../router/appRouter';

const finishLogin = (email, token) => {
    if(token==='12345luggage') // fake  
    {
        fakeAuth.signedIn = true;       
    }
    return {
        type: LOGIN,
        payload: {
            email,
            token,
        }
    }
}

export const loginUser = (email, password) => {
    return (dispatch) => {
        fetch(`${SERVER_IP}/api/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json())
        .then(response => {
            if (response.success) {
                dispatch(finishLogin(response.email, response.token));
            }
        })
    };
}

export const logoutUser = () => {
    fakeAuth.signedIn = false;
    return {
        type: LOGOUT,
        payload: null,
    }
}