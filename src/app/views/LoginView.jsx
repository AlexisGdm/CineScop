import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { URL_LOGIN } from '../constants/urls/urlFrontEnd';
import Login from '../components/account/Login';
import Footer from '../components/layouts/Footer';

import { selectIsLogged } from './../redux-store/authenticationSlice';
import BackgroundImage from "/src/app/components/layouts/BackgroundImage.jsx";


/**
 * View/Page Login
 *
 * @author Peter Mollet
 */
const LoginView = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsLogged);

    useEffect(() => {
        if (isAuthenticated) navigate(URL_LOGIN);
    }, []);

    return (
        <BackgroundImage>
        <div className="flex items-center justify-center">
           
            <Login />
            
        </div>
        
        </BackgroundImage>
        
        
    );
};

export default LoginView;
