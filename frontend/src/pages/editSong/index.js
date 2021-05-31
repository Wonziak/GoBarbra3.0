import React, {useState} from "react";
import {Container, CssBaseline} from '@material-ui/core';

import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";

import {SongForm} from "../../components/song/songForm";
import Cookies from "js-cookie";
import API from "../../services/api";
import {useLocation} from "react-router-dom";


export const EditSong = () => {
    const history = useHistory()
    const [alertOpen, setAlertOpen] = useState(false);
    const {state} = useLocation();
    const [adding,setAdding] = useState(false);
    const handleClose = () => {
        setAlertOpen(false);
    };
    const {register, handleSubmit, errors} = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            text: state.song.text||'',
            language: state.song.language||'',
        },
    });

    const onSubmit = (data) => {
        console.log(data)
        setAdding(true);
        let jwt = Cookies.get('jwt');
        API.put(`/song/${state.song.id}`, {
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
            })
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline/>
            <SongForm onSubmit={onSubmit} errors={errors}
                      register={register} handleSubmit={handleSubmit}
                      handleCloseSnackBar={handleClose} isSnackBarOpen={alertOpen}
                      snackBarKey={"edit song error"} snackBarMessage={"Error while editing song"}
                      edit={true} adding={adding}/>
        </Container>
    )
}