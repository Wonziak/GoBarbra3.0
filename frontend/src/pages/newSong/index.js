import React, {useState} from "react";
import {Button, Container, CssBaseline} from '@material-ui/core';
import {useStyles} from "../../components/user/styles";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import * as locales from '@material-ui/core/locale';
import Autocomplete from "@material-ui/lab/Autocomplete";

const languagesList = [
    "POL", "ENG", "DEU", "FRA", "ITA"
]

export const NewSong = () => {
    const classes = useStyles();
    const history = useHistory()
    const {register, handleSubmit, errors} = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            text: '',
            language: '',
        },
    });
    console.log(locales)
    const [loginAlertOpen, setLoginAlertOpen] = useState(false);
    const [logging, setLogging] = useState(false);
    const handleClose = () => {
        setLoginAlertOpen(false);
    };
    const onSubmit = (data) => {
        /*
        API.post('/login', formBody,  {headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}
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
            })*/
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component='h1' variant='h4'>
                    New Song
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        name='text'
                        label="Text"
                        multiline
                        rows={4}
                        variant='outlined'
                        margin='normal'
                        inputRef={register({
                            required: 'You must provide the text!',
                            minLength: {
                                value: 6,
                                message: 'Your text must be greater than 6 characters',
                            },
                            maxLength: {
                                value: 100,
                                message: 'Your text must be less than 100 characters',
                            }
                        })}
                        autoComplete='text'
                        error={!!errors.text}
                        className={classes.textField}
                        fullWidth
                        autoFocus
                    />
                    {errors.text && (
                        <span className={classes.error}>{errors.text.message}</span>
                    )}
                    <Autocomplete
                        options={languagesList}
                        value={"POL"}
                        disableClearable
                        onChange={(event, newValue) => {
                            //setLocale(newValue);
                        }}
                        renderInput={(params) => (

                            <TextField
                                {...params}
                                name='language'
                                label='Language'
                                type='text'
                                variant='outlined'
                                margin='normal'
                                inputRef={register({
                                    required: 'You must provide a language.',
                                })}
                                className={classes.textField}
                                error={!!errors.language}
                                fullWidth
                            />
                        )}
                    />

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        disabled={!!errors.text}
                        className={classes.submit}
                    >
                        Add
                    </Button>
                </form>
            </div>
        </Container>
    )
}