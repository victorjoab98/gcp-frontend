import { api } from "../../api"
import { setUser, setUserLogged } from "./authSlice";

export const loginThunk = ({ username, password }) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/auth/login', { username, password })
        .then( res => {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            dispatch(setUser(user));
            dispatch(setUserLogged(true));
            resolve(res);
        }).catch( err => reject(err) )
    })
}

export const registerThunk = ({ name, email, username, password }) => dispatch => {
    return new Promise((resolve, reject) => {
        api.post('/auth/register', { name, email, username, password })
        .then( res => {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            dispatch(setUser(user));
            dispatch(setUserLogged(true));
            resolve(res);
        }).catch( err => reject(err) )
    })
}


export const logoutThunk = () => dispatch => {
    localStorage.removeItem('token');
    dispatch(setUser({}));
    dispatch(setUserLogged(false));
}