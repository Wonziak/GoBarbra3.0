import React, {useState} from "react";
import {Container, CssBaseline} from '@material-ui/core';

import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";

import {SongForm} from "../../components/song/songForm";
import Cookies from "js-cookie";
import API from "../../services/api";


export const NewSong = () => {
    const history = useHistory()
    const [alertOpen, setAlertOpen] = useState(false);
    const [adding,setAdding] = useState(false);
    const handleClose = () => {
        setAlertOpen(false);
    };
    const {register, handleSubmit, errors} = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            text: '',
            language: '',
        },
    });

    const onSubmit = (data) => {
        console.log(data)
        setAdding(true);
        let jwt = Cookies.get('jwt');
        API.post('/song', {
            text: data.text,
            language: data.language
        },{
            headers:{'Authorization': `Bearer ${jwt}`}
        },)
            .then(response => {
                history.push('/songs')
            })
            .catch(errInfo => {
                console.log(errInfo)
                setAdding(false);
            })
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline/>
            <SongForm onSubmit={onSubmit} errors={errors}
                      register={register} handleSubmit={handleSubmit}
                      handleCloseSnackBar={handleClose} isSnackBarOpen={alertOpen}
                      snackBarKey={"add song error"} snackBarMessage={"Error while adding new song"} adding={adding}/>
        </Container>
    )
}