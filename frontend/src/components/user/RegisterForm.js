import React, { useRef, useState} from 'react';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import {Link, useHistory} from 'react-router-dom'
import {
    Avatar,
    Grid,
    Container,
    Button,
    Typography,
} from '@material-ui/core';
import { useStyles } from './styles';
import { useForm } from 'react-hook-form';
import TextField from "@material-ui/core/TextField";
import * as routes from '../../routing/routes'
import API from "../../services/api";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

function transition(props) {
    return <Slide {...props} direction="right"
                  style={{
                      backgroundColor:'#cc0000'}}
    />;
}

const RegisterForm = () => {
    const classes = useStyles();
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
        <Container  maxWidth='xs'>

            <div className={classes.paper}>
                <Avatar className={registering? classes.animateAvatar:classes.avatar}>
                    <AccountCircleIcon style={{ fontSize: 45 }} />
                </Avatar>
                <Typography component='h1' variant='h4'>
                    Sign on
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

                        name='email'
                        label='Email Address'
                        variant='outlined'
                        margin='normal'
                        inputRef={register({
                            required: 'You must provide the email address!',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'You must provide a valid email address!',
                            },
                        })}
                        autoComplete='email'
                        error={!!errors.email}
                        className={classes.textField}
                        fullWidth
                        autoFocus
                    />
                    {errors.email && (
                        <span className={classes.error}>{errors.email.message}</span>
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
                    <TextField
                        name='passwordRepeat'
                        label='Password Repeat'
                        type='password'
                        variant='outlined'
                        margin='normal'
                        inputRef={register({
                            required: 'You must repeat a password.',
                            validate: value =>
                                value === password.current || "The passwords do not match"
                        })}
                        className={classes.textField}
                        error={!!errors.password2}
                        fullWidth
                        autoComplete='current-password'
                    />
                    {errors.passwordRepeat && (
                        <span className={classes.error}>{errors.passwordRepeat.message}</span>
                    )}
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        disabled={!!errors.username || !!errors.email || !!errors.password || !!errors.passwordRepeat}
                        className={classes.submit}
                    >
                        Sign On
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to={routes.LOGIN} variant='body2' className={classes.link}>
                                {'Have an account? Sign in.'}
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
                open={registerAlertOpen}
                onClose={handleClose}
                onExit={handleClose}
                TransitionComponent={transition}
                message="Unknown problem with register"
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


export {RegisterForm};