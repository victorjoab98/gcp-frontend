import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import './index.scss';
import AuthLayout from './layout/AuthLayout';
import { UserLayout } from './layout/UserLayout';
import { Login, Register } from './pages/Auth';
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
            <Route path="/" element={ <UserLayout/>} />
        </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
