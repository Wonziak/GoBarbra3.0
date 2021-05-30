import React, {useEffect, useState} from "react";
import {Container, CssBaseline} from '@material-ui/core';
import {SongList} from "../../components/song/songsList";
import Cookies from "js-cookie";
import API from "../../services/api";
import {useHistory} from "react-router-dom";


export const Songs = () => {
    const [songsList, setSongsList] = useState([]);
    const [loading, setLoading] = useState(false);
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
            })
            .catch(errInfo => {
                console.log(errInfo)
            })

    }, [jwt]);

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
        setLoading(true)
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
                setLoading(false)

            })
            .catch(errInfo => {
                console.log(errInfo)
                setLoading(false)
            })
    }
    const handleStop = (id)=>{
        console.log(id)
    }

    const handleSongEdit = (song) => {
        history.push({pathname: `/song/edit/${song.id}`, state:{song}})
    }
    return (
        <Container component='main' maxWidth='md'>
            <CssBaseline/>

            <SongList songs={songsList} handleSongRemove={handleSongRemove}
                      handleSongEdit={handleSongEdit} handlePlay={handlePlay}
                      handleStop={handleStop} playerState={playerState} loading={loading}/>
        </Container>
    )
}