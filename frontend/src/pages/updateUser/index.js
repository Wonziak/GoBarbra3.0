import React, {useRef, useState} from "react";
import {Container, CssBaseline} from '@material-ui/core';

import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import Cookies from "js-cookie";
import API from "../../services/api";
import {UpdateForm} from "../../components/user/updateForm";


export const UpdateUser = () => {
    const history = useHistory()
    const {register, handleSubmit, errors, watch} = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordRepeat: '',
        },
    });
    const password = useRef({});
    password.current = watch("password", '');

    const [alertOpen, setAlertOpen] = useState(false);
    const [updating, setUpdating] = useState(false);

    const handleClose = () => {
        setAlertOpen(false);
    };

    const onSubmit = (data) => {
        setUpdating(true);
        let jwt = Cookies.get('jwt');
        let body = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ""));
        console.log(body)
        if (Object.keys(body).length > 0) {
            API.put('/user/change', body, {
                headers: {'Authorization': `Bearer ${jwt}`}
            },)
                .then(response => {
                    history.push('/me')
                })
                .catch(errInfo => {
                    console.log(errInfo)
                })
        }


    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline/>
            <UpdateForm onSubmit={onSubmit} errors={errors}
                        register={register} handleSubmit={handleSubmit}
                        handleCloseSnackBar={handleClose} isSnackBarOpen={alertOpen}
                        snackBarKey={"update user error"} snackBarMessage={"Error while updatinguser data"}
                        updating={updating} password={password}/>
        </Container>
    )
}