import React, {useContext, useState} from 'react';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import {Link, useHistory} from 'react-router-dom'
import {
    Avatar,
    Grid,
    Container,
    CssBaseline,
    Button,
    Typography,
} from '@material-ui/core';
import { useStyles } from './styles';
import { useForm } from 'react-hook-form';
import TextField from "@material-ui/core/TextField";
import * as routes from '../../routing/routes'
import API from '../../services/api'
import Snackbar from "@material-ui/core/Snackbar";
import Slide from '@material-ui/core/Slide';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {UserContext} from "./userProvider";
import Cookies from "js-cookie";

function transition(props) {
    return <Slide {...props} direction="right"
                  style={{
        backgroundColor:'#cc0000'}}
    />;
}
const LoginForm = () => {
    const {login} = useContext(UserContext)
    const classes = useStyles();
    const history = useHistory()
    const { register, handleSubmit, errors, reset} = useForm({
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
        API.post('/login', formBody,  {headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"}
        })
            .then(response => {
                Cookies.set('jwt', response.data.token);
                login(data.username);
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
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={logging? classes.animateAvatar:classes.avatar}>
                    <AccountCircleIcon style={{ fontSize: 45 }}  />
                </Avatar>
                <Typography component='h1' variant='h4'>
                    Sign in
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        name='username'
                        label='Username'
                        variant='outlined'
                        margin='normal'
                        inputRef={register({
                            required: 'You must provide the username!',
                            minLength: {
                                value: 6,
                                message: 'Your username must be greater than 6 characters',
                            },
                        })}
                        autoComplete='username'
                        error={!!errors.username}
                        className={classes.textField}
                        fullWidth
                        autoFocus
                    />
                    {errors.username && (
                        <span className={classes.error}>{errors.username.message}</span>
                    )}
                    <TextField
                        name='password'
                        label='Password'
                        type='password'
                        variant='outlined'
                        margin='normal'
                        inputRef={register({
                            required: 'You must provide a password.',
                            minLength: {
                                value: 6,
                                message: 'Your password must be greater than 6 characters',
                            },
                        })}
                        className={classes.textField}
                        error={!!errors.password}
                        fullWidth
                        autoComplete='current-password'
                    />
                    {errors.password && (
                        <span className={classes.error}>{errors.password.message}</span>
                    )}

                    <Grid container>
                        <Grid item>
                            <Link to={routes.HOME} variant='body2' className={classes.link}>
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        disabled={!!errors.email || !!errors.password || logging}
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to={routes.REGISTER} variant='body2' className={classes.link}>
                                {'New to this platform? Create an Acount.'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Snackbar

                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sev
                open={loginAlertOpen}
                onClose={handleClose}
                onExit={handleClose}
                TransitionComponent={transition}
                message="Wrong username or password"
                key={'Login alert'}
                autoHideDuration={5000}
                action={
                    <React.Fragment>
                        <IconButton
                            aria-label="close"
                            color="inherit"

                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </Container>
    );
};

export {LoginForm};