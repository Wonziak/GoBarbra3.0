import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import * as routes from "../../routing/routes";
import {Button, createMuiTheme} from "@material-ui/core";
import React from "react";
import {useStylesBasic} from "../../pages/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import InputLabel from "@material-ui/core/InputLabel";
import TableBody from "@material-ui/core/TableBody";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {useStyles, audioPlayerStyle} from "./styles";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import AudioPlayer from "material-ui-audio-player";
import TablePagination from "@material-ui/core/TablePagination";
import ThemeProvider from "@material-ui/styles/ThemeProvider";


const ListElement = ({song, id, handleRemove, handleEdit, handlePlay, handleStop, playerState})=>{

    const classes =  useStyles()
    return(
        <TableRow className={classes.tableRow}>
            <TableCell width={"25%"} align="center">
                <InputLabel htmlFor="component"><span>{song.creation_date.replace('T',' ').substring(0, 16)}</span></InputLabel>
            </TableCell>
            <TableCell width={"25%"} align="center" >
                <InputLabel htmlFor="component"><span style={{overflow:"hidden"}}>{song.text}</span></InputLabel>
            </TableCell>
            <TableCell width={"14%"} align="center">
                <InputLabel htmlFor="component"><span>{song.language}</span></InputLabel>
            </TableCell>
            <TableCell width={"12%"} align="center">
              <EditIcon  className={classes.icon} onClick={()=>{handleEdit(song)}}/>
            </TableCell>
            <TableCell width={"12%"} align="center">
                <DeleteIcon className={classes.icon} onClick={()=>{handleRemove(song, id)}} />
            </TableCell>
            <TableCell width={"12%"} align="center">
                <PlayCircleFilledIcon className={classes.icon} onClick={()=>{handlePlay(song.id)}}/>
            </TableCell>
        </TableRow>
    )

}

export const SongList = ({songs, handleSongRemove, handleSongEdit, handlePlay, handleStop, playerState})=>{
    const basicClasses = useStylesBasic();
    const classes =  useStyles()
    const muiTheme = createMuiTheme({});
    const [page, setPage] = React.useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return(
        <>
            <Paper className={basicClasses.paper} >
                <Typography variant="h4" paragraph="true">My songs</Typography>
                {songs?<TableContainer component={Paper}>
                    <Table>
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <TableCell width={"25%"} align="center">DATE</TableCell>
                                <TableCell width={"25%"} align="center">TEXT</TableCell>
                                <TableCell width={"14%"} align="center">LANG</TableCell>
                                <TableCell width={"12%"} align="center">EDIT</TableCell>
                                <TableCell width={"12%"} align="center">DELETE</TableCell>
                                <TableCell width={"12%"} align="center">PLAY</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={"body"}>
                            {songs.slice(page * 5, page * 5 + 5)
                                .map((song, id)=><ListElement song={song} id={id} key={id}
                                                                handleRemove={handleSongRemove}
                                                                handleEdit={handleSongEdit}
                                                                handlePlay={handlePlay}
                                                                handleStop={handleStop}/>)}
                        </TableBody>
                    </Table>
                </TableContainer>:
                    <Typography variant="h5">There is no songs</Typography>
                }
                <TablePagination
                    className={classes.tablePagination}
                    component={Paper}
                    align={"right"}
                    rowsPerPageOptions={[5]}
                    count={songs.length}
                    rowsPerPage={5}
                    page={page}
                    onChangePage={handleChangePage}
                />


                <Link to={routes.NEW_SONG} >
                    <Button
                        variant='contained'
                        className={basicClasses.submit}>
                        Add new song
                    </Button>
                </Link>
            </Paper>
            {playerState.data&&
            <ThemeProvider theme={muiTheme}>
            <AudioPlayer
                width="100%"
                useStyles={audioPlayerStyle}
                src={playerState.data.src}
                download={true}
                preload="auto"
                autoplay={true}
            />
            </ThemeProvider>
            }


        </>
    )
}