import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";

import { ROLE_ADMIN } from "../constants/rolesConstant";
import { PrivateRoute } from "./PrivateRoute";
import * as URL from "../constants/urls/urlFrontEnd";
import AdminHomeView from "../views/AdminHomeView";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import SigninView from "../views/SigninView";
import AccountView from "../views/AccountView";
import FilmsView from "../views/FilmsView";
import TermsOfService from "../views/TermsOfService";
import ContactView from "../views/ContactView";
import SeriesView from "../views/SeriesView";
import DetailsMovieView from "../views/DetailsMovieView";
import DetailsPersonView from "../views/DetailsPersonView";
import UserProfile from "./../views/UserProfile";
import MyProfile from "./../views/MyProfile";

/**
 * Routes of the application
 * with public and private route
 *
 * @author Peter Mollet
 */
const Routes = () => {
  return (
    <RoutesContainer>
      <Route path={URL.URL_HOME} element={<HomeView />} />
      <Route path={URL.URL_HOME} element={<HomeView />} />
      <Route path={URL.URL_LOGIN} element={<LoginView />} />
      <Route path={URL.URL_SIGNIN} element={<SigninView />} />
      <Route path={URL.URL_ACCOUNT} element={<AccountView />} />
      <Route path={URL.URL_MOVIES} element={<FilmsView />} />
      <Route path={URL.URL_SERIES} element={<SeriesView />} />
      <Route
        path={`${URL.URL_DETAILSMOVIE}/:id`}
        element={<DetailsMovieView />}
      />
      <Route
        path={`${URL.URL_DETAILSPERSON}/:id`}
        element={<DetailsPersonView />}
      />
      <Route path={URL.URL_TERMS_OF_SERVICE} element={<TermsOfService />} />
      <Route path={URL.URL_CONTACT} element={<ContactView />} />
      <Route path={URL.URL_PROFILE} element={<UserProfile />} />
      <Route path={URL.URL_MYPROFILE} element={<MyProfile />} />
      <Route
        path={URL.URL_ADMIN_HOME}
        element={
          <PrivateRoute roles={[ROLE_ADMIN]}>
            <AdminHomeView />
          </PrivateRoute>
        }
      />
    </RoutesContainer>
  );
};

export default Routes;
