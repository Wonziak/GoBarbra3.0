import React, {useContext, useState} from "react";
import {Container, CssBaseline} from '@material-ui/core';

import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import Cookies from "js-cookie";
import API from "../../services/api";
import {UserContext} from "../../context/user";
import {LoginForm} from "../../components/user/LoginForm";


export const Login = () => {
    const {login} = useContext(UserContext)
    const history = useHistory()
    const {register, handleSubmit, errors, reset} = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            username: '',
            password: '',
        },
    });
    const [loginAlertOpen, setLoginAlertOpen] = useState(false);
    const [logging, setLogging] = useState(false);
    const handleClose = () => {
        setLoginAlertOpen(false);
    };
    const onSubmit = (data) => {
        setLogging(true)

        const details = {
            'username': data.username,
            'password': data.password,
        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        Cookies.set('jwt', '');
        API.post('/login', formBody, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
        })
            .then(response => {
                Cookies.set('jwt', response.data.token);
                login(response.data.token);
                history.push('/');
            })
            .catch(errInfo => {
                reset({});
                setLoginAlertOpen(true);
                setLogging(false);
            })
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline/>
            <LoginForm onSubmit={onSubmit} errors={errors}
                       register={register} handleSubmit={handleSubmit}
                       handleCloseSnackBar={handleClose} isSnackBarOpen={loginAlertOpen}
                       snackBarKey={"login error"} snackBarMessage={"Wrong username or password"}
                       logging={logging}/>
        </Container>
    )
}