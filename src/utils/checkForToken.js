import jwtDecode from "jwt-decode";
import { logoutThunk, setUser, setUserLogged } from "../store/AuthSlice";
import { store } from "../store/store";

export const checkForToken = () => {
    
    const token = localStorage.getItem('token');
    if ( token ){
        const token_decode =  jwtDecode(token);
        const { id, name, email, username } = token_decode;

        store.dispatch( setUser( { id, name, email, username } ) );
        store.dispatch( setUserLogged( true ) );

        const currenTime = Math.floor(Date.now() / 1000);
        if(token_decode.exp < currenTime){
            store.dispatch( logoutThunk() );
            window.location.href = "/login"
        }   
    }
}