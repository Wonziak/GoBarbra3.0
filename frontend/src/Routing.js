import React from 'react'
import {} from "react-router-dom"

import {Switch, Route} from "react-router-dom";
//import {AuthRoute} from "./AuthRoute";
import {Home} from './pages/Home'
import {View} from './components/View'
import LoginForm from "./components/user/LoginForm";
import RegisterForm from "./components/user/RegisterForm";
export const Routing = () => {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <View childen={<Home/>}/>
                </Route>
                <Route path="/login">
                    <View childen={<LoginForm/>}/>
                </Route>
                <Route path="/register">
                    <View childen={<RegisterForm/>}/>
                </Route>
            </Switch>
        </>
    )
}
