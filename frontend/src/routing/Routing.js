import React from 'react'

import {Switch, Route} from 'react-router-dom';

import {Home} from '../pages/Home'
import {View} from '../view/View'
import {LoginForm} from "../components/user/LoginForm";
import {RegisterForm} from "../components/user/RegisterForm";
import * as routes from "./routes"
import {ErrorPage} from "../pages/ErrorPage";
export const Routing = () => {
    return (
        <>
            <Switch>
                <Route exact path={routes.HOME}>
                    <View children={<Home/>}/>
                </Route>
                <Route path={routes.LOGIN}>
                    <View children={<LoginForm/>}/>
                </Route>
                <Route path={routes.REGISTER}>
                    <View children={<RegisterForm/>}/>
                </Route>
                <Route >
                    <View children={<ErrorPage/>}/>
                </Route>

            </Switch>
        </>
    )
}
