import React, { useRef, useState} from "react";
import { Container, CssBaseline} from '@material-ui/core';

import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";

import API from "../../services/api";

import {RegisterForm} from "../../components/user/RegisterForm";


export const Register = () => {
    const history = useHistory()
    const { register, handleSubmit, errors, watch } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            username:'',
            email: '',
            password: '',
            passwordRepeat: '',
        },
    });
    const password = useRef({});
    password.current = watch("password", '');

    const [registerAlertOpen, setRegisterAlertOpen] = useState(false);
    const [registering, setRegistering] = useState(false);

    const handleClose = () => {
        setRegisterAlertOpen(false);
    };
    const onSubmit = (data) => {
        console.log(data)
        setRegistering(true)
        API.post('/user/create', {
            username: data.username,
            password_hash: data.password,
            email: data.email
        })
            .then(response => {
                history.push('/');
            })
            .catch(errInfo => {
                console.log(errInfo)
                setRegisterAlertOpen(true);
                setRegistering(false)
            })
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline/>
            <RegisterForm onSubmit={onSubmit} errors={errors}
                       register={register} handleSubmit={handleSubmit}
                       handleCloseSnackBar={handleClose} isSnackBarOpen={registerAlertOpen}
                       snackBarKey={"registering error"} snackBarMessage={"Error while registering"}
                       registering={registering} password={password}/>
        </Container>
    )
}