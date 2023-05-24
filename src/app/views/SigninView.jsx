import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { URL_LOGIN } from '../constants/urls/urlFrontEnd';
import Signin from '../components/account/Signin';
import Footer from '../components/layouts/Footer';

import { selectIsLogged } from './../redux-store/authenticationSlice';
import BackgroundImage from "/src/app/components/layouts/BackgroundImage.jsx";
import SignIn from '../components/account/Signin';


/**
 * View/Page Login
 *
 * @author Peter Mollet
 */
const SigninView = () => {

    return (
        <BackgroundImage>

        <div className="flex items-center justify-center">
            <Signin />
        </div>

        </BackgroundImage>
        
    );
};

export default SigninView;
