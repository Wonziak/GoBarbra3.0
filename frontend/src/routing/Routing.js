import React from 'react'

import {Switch, Route} from 'react-router-dom';

import {Home} from '../pages/Home';
import {About} from '../pages/About';
import {LoginForm} from "../components/user/LoginForm";
import {RegisterForm} from "../components/user/RegisterForm";
import * as routes from "./routes";
import {ErrorPage} from "../pages/ErrorPage";
import {AuthRoute} from "./AuthRoute";
import {Me} from "../pages/Me";
import {Songs} from "../pages/Songs";
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
                <Route >
                    <ErrorPage/>
                </Route>

            </Switch>
        </>
    )
}
