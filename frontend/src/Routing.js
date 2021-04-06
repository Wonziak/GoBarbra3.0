import React from 'react'

import {Switch, Route} from 'react-router-dom';

import {Home} from './pages/Home'
import {View} from './components/View'
import {LoginForm} from "./components/user/LoginForm";
import {RegisterForm} from "./components/user/RegisterForm";

export const Routing = () => {
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <View children={<Home/>}/>
                </Route>
                <Route path="/login">
                    <View children={<LoginForm/>}/>
                </Route>
                <Route path="/register">
                    <View children={<RegisterForm/>}/>
                </Route>
            </Switch>
        </>
    )
}
