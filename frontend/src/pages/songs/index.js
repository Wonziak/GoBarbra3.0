import React, {useEffect, useState} from "react";
import {Container, CssBaseline} from '@material-ui/core';

import {SongList} from "../../components/song/songsList";
import Cookies from "js-cookie";
import API from "../../services/api";
import {useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";


export const Songs = () => {
    const [songsList, setSongsList] = useState([]);
    const history = useHistory()
    const [playerState, setPlayerState] = useState({
        loading: false,
        playing: false,
        data: "",
    })
    const jwt = Cookies.get('jwt');
    useEffect(() => {
        API.get('/songs', {
            headers: {'Authorization': `Bearer ${jwt}`}
        })
            .then(response => {
                setSongsList(response.data);
                console.log(response.data)
            })
            .catch(errInfo => {
                console.log(errInfo)
            })

    }, []);

    const handleSongRemove = (song, id) => {

        API.delete(`/song/${song.id}`,{
            headers:{'Authorization': `Bearer ${jwt}`}
        },)
            .then(response => {
                const newList = songsList.filter((item,index) => index !== id);
                setSongsList(newList);
            })
            .catch(errInfo => {
                console.log(errInfo)
            })
    }
    const handlePlay = (id)=>{
        API.get(`/song/${id}`,{
            responseType:  'blob',
            headers:{'Authorization': `Bearer ${jwt}`}
        },)
            .then(response => {
                console.log(response)
                const mp3 = new Blob([response.data], { type: 'audio/mp3' })
                const url = window.URL.createObjectURL(mp3)
                const audio = new Audio(url)
                setPlayerState({
                    ...playerState,
                    data: audio
                })
            })
            .catch(errInfo => {
                console.log(errInfo)
            })
    }
    const handleStop = (id)=>{
        console.log(id)
    }

    const handleSongEdit = (song) => {
        history.push({pathname: `/song/edit/${song.id}`, state:{song}})
    }
    return (
        <Container component='main' maxWidth='xl'>
            <CssBaseline/>

            <SongList songs={songsList} handleSongRemove={handleSongRemove}
                      handleSongEdit={handleSongEdit} handlePlay={handlePlay}
                      handleStop={handleStop} playerState={playerState}/>
        </Container>
    )
}