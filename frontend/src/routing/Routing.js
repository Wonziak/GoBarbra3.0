import React from 'react'

import {Switch, Route} from 'react-router-dom';

import {Home} from '../pages/home';
import {About} from '../pages/about';
import {NewSong} from '../pages/newSong';
import {LoginForm} from "../components/user/LoginForm";
import {RegisterForm} from "../components/user/RegisterForm";
import * as routes from "./routes";
import {ErrorPage} from "../pages/errorPage";
import {AuthRoute} from "./AuthRoute";
import {Me} from "../pages/me";

export const Routing = () => {
    return (
        <>
            <Switch>
                <Route exact path={routes.HOME}>
                    <Home/>
                </Route>
                <Route path={routes.LOGIN}>
                    <LoginForm/>
                </Route>
                <Route path={routes.REGISTER}>
                    <RegisterForm/>
                </Route>
                <Route path={routes.ABOUT}>
                    <About/>
                </Route>
                <AuthRoute path={routes.ME}>
                    <Me/>
                </AuthRoute>
                <AuthRoute path={routes.NEW_SONG}>
                    <NewSong/>
                </AuthRoute>
                <Route >
                    <ErrorPage/>
                </Route>

            </Switch>
        </>
    )
}
