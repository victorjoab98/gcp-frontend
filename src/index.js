import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import { PrivateRoute } from './components/PrivateRoute';
import './index.scss';
import AuthLayout from './layout/AuthLayout';
import { UserLayout } from './layout/UserLayout';
import { Login, Register } from './pages/Auth';
import PostsWithoutAlbum from './pages/Posts/PostsWithoutAlbum/PostsWithoutAlbum';
import UserProfile from './pages/User/UserProfile';
import AlbumView from './pages/Album/AlbumView';
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';
import { checkForToken } from './utils/checkForToken';

const root = ReactDOM.createRoot(document.getElementById('root'));

checkForToken();

root.render(
  <Provider store={ store }>
    <BrowserRouter>
        <Routes>
            <Route path="/auth" element={<AuthLayout />} >
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
            <Route path="/mypicz" element={ 
              <PrivateRoute>
                <UserLayout />
              </PrivateRoute>
            } >
              <Route path="profile" element={<UserProfile/>}/>
              <Route path="album/:albumId" element={<AlbumView/>}/>
              <Route path="posts-withoutalbum" element={<PostsWithoutAlbum/>}/>
            </Route>
            <Route
                path="*"
                element={<Navigate to="/mypicz/profile" replace />}/>
        </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
