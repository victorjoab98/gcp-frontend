import { api } from "../../api"
import { setUser, setUserLogged } from "./authSlice";

export const uploadPostThunk = ( file, userId ) => dispatch => {
    const headers = { headers: { 'Content-Type': 'multipart/form-data' } };
    let fd = new FormData();
    fd.append('file', file );
    fd.append('userId', userId);

    return new Promise((resolve, reject) => { 
        api.post('/auth/update-photo', fd, {...headers})
        .then( () => dispatch( getUserThunk(userId) ))
        .then( res => resolve(res))
        .catch( err => reject(err))
    })
}

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

export const getUserThunk = ( userId ) => dispatch => {
    return new Promise((resolve, reject) => {
        api.get('/auth/user/' + userId)
        .then( res => {
            dispatch(setUser(res.data));
            resolve(res);
        }).catch( err => reject(err) )
    })
}