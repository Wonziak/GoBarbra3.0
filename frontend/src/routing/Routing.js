import React from 'react'

import {Switch, Route} from 'react-router-dom';

import {Home} from '../pages/home';
import {About} from '../pages/about';
import {NewSong} from '../pages/newSong';

import * as routes from "./routes";
import {ErrorPage} from "../pages/errorPage";
import {AuthRoute} from "./AuthRoute";
import {Me} from "../pages/me";
import {Login} from "../pages/login";
import {Register} from "../pages/register";
import {Songs} from "../pages/songs";
import {EditSong} from "../pages/editSong";
import {UpdateUser} from "../pages/updateUser";
export const Routing = () => {
    return (
        <>
            <Switch>
                <Route exact path={routes.HOME}>
                    <Home/>
                </Route>
                <Route path={routes.LOGIN}>
                    <Login/>
                </Route>
                <Route path={routes.REGISTER}>
                    <Register/>
                </Route>
                <Route path={routes.ABOUT}>
                    <About/>
                </Route>
                <AuthRoute exact path={routes.ME} >
                    <Me/>
                </AuthRoute>
                <AuthRoute path={routes.NEW_SONG}>
                    <NewSong/>
                </AuthRoute>
                <AuthRoute path={routes.SONGS}>
                    <Songs/>
                </AuthRoute>
                <AuthRoute path={routes.EDIT_SONG}>
                    <EditSong/>
                </AuthRoute>
                <AuthRoute path={routes.UPDATE_USER}>
                    <UpdateUser/>
                </AuthRoute>
                <Route >
                    <ErrorPage/>
                </Route>
            </Switch>
        </>
    )
}
