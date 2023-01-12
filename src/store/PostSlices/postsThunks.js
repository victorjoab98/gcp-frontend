import axios from "axios";
import { setUser } from "../AuthSlice/authSlice";
import { setAlbumes, setContentFetched, setPosts, updatePostIsFavorite } from "./contentSlice";

const { api } = require("../../api")

export const getContentThunkByUser = ( userId ) => dispatch => {
    return new Promise((resolve, reject) => { 
        axios.get('https://us-central1-dsu-gcp-373020.cloudfunctions.net/api-get-user/user/'+userId)
        .then( res => {
            dispatch( setUser( res.data.user ) )
            dispatch( setAlbumes(res.data.albums) )
            dispatch( setPosts(res.data.posts) )
            dispatch( setContentFetched(true) )
            resolve(res)
        })
        .catch( err => reject(err))
    })
}

export const uploadPostThunk = ( file, userId, description ) => dispatch => {
    const headers = { headers: { 'Content-Type': 'multipart/form-data' } };
    let fd = new FormData();
    fd.append('file', file.file);
    fd.append('userId', userId);
    fd.append('description', description);

    return new Promise((resolve, reject) => { 
        api.post('/posts/create', fd, {...headers})
        .then( res => {
            dispatch( getPostsByUser(userId) )
            resolve(res)

        })
        .catch( err => reject(err))
    })
}

export const getPostsByUser = ( userId ) => dispatch => {
    return new Promise((resolve, reject) => { 
        api.get('/posts/user/'+userId)
        .then( res => {
            dispatch( setPosts(res.data) )
            resolve(res)
        })
        .catch( err => reject(err))
    })
}

export const getAlbumsThunkByUser = ( userId ) => dispatch => {
    return new Promise((resolve, reject) => { 
        api.get('/albums/user/'+userId)
        .then( res => {
            dispatch( setAlbumes(res.data) )
            resolve(res)
        })
        .catch( err => reject(err))
    })
}


export const creteNewAlbumThunk = ( albumName, userId ) => dispatch => {
    return new Promise((resolve, reject) => { 
        api.post('/albums/create', { name: albumName, userId })
        .then( res => {
            dispatch( getAlbumsThunkByUser(userId) )
            resolve(res)
        })
        .catch( err => reject(err))
    })
}

export const addPostToAlbumThunk = ( postId, albumId, userId ) => dispatch => {
    return new Promise((resolve, reject) => { 
        api.post('/posts/add-to-album', { postId, albumId })
        .then( res => {
            dispatch( getContentThunkByUser(userId) )
            resolve(res)
        })
        .catch( err => reject(err))
    })
}

export const deleteAlbumThunk = ( albumId, userId ) => dispatch => {
    return new Promise((resolve, reject) => { 
        api.delete('/albums/'+albumId)
        .then( () => dispatch( getContentThunkByUser(userId) ) )
        .then( res => resolve(res) )
        .catch( err => reject(err))
    })
}

export const addToFavoritesThunk = ( postId ) => dispatch => {
    return new Promise((resolve, reject) => {
        api.patch('/posts/add-to-favorites/' + postId )
        .then( res => {
            dispatch( updatePostIsFavorite( res.data ) )
            resolve(res)
        } )
        .catch( err => reject(err))
    })
}
