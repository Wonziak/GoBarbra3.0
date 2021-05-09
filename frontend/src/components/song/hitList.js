import {useStylesBasic} from "../../pages/styles";
import {audioPlayerStyle, useStyles} from "./styles";
import React, {useState} from "react";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import AudioPlayer from "material-ui-audio-player";
import InputLabel from "@material-ui/core/InputLabel";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import GetAppIcon from '@material-ui/icons/GetApp';
import abrakadabra from "../../hits/1.mp3"
import barbara from "../../hits/2.mp3"
import go from "../../hits/3.mp3"
const songs = [
    {
        text: "Abrakadabra",
        language: "en",
        file: abrakadabra
    },
    {
        text: "Barbara to barbra",
        language: "pl",
        file: barbara
    },
    {
        text: "go barbra",
        language: "en",
        file: go
    }
]


const ListElement = ({song, id, setData}) => {


    const classes = useStyles()
    return (
        <TableRow className={classes.tableRow}>
            <TableCell width={"35%"} align="center">
                <InputLabel htmlFor="component"><span>{song.text}</span></InputLabel>
            </TableCell>
            <TableCell width={"35%"} align="center">
                <InputLabel htmlFor="component"><span>{song.language}</span></InputLabel>
            </TableCell>
            <TableCell width={"15%"} align="center">
                <PlayCircleFilledIcon className={classes.icon} onClick={() => {setData(song.file)}}/>
            </TableCell>
            <TableCell width={"15%"} align="center">
                <a href={song.file} download="song.pdf">
                    <GetAppIcon className={classes.icon} />
                </a>

            </TableCell>
        </TableRow>
    )

}


export const HitList = () => {
    const basicClasses = useStylesBasic();
    const classes = useStyles()

    const [page, setPage] = React.useState(0);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const [data, setData] = useState("");
    return (
        <>
                <TableContainer component={Paper}>
                    <Table >
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <TableCell width={"35%"} align="center">TEXT</TableCell>
                                <TableCell width={"35%"} align="center">LANG</TableCell>
                                <TableCell width={"15%"} align="center">PLAY</TableCell>
                                <TableCell width={"15%"} align="center">DOWNLOAD</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={"body"}>
                            {songs.slice(page * 5, page * 5 + 5)
                                .map((song, id) => <ListElement song={song} id={id} key={id} setData={setData}/>)}
                        </TableBody>
                    </Table>
                </TableContainer>

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

            <AudioPlayer
                width="100%"
                useStyles={audioPlayerStyle}
                src={data}
                preload="auto"
                autoplay={true}
            />

        </>
    )
}