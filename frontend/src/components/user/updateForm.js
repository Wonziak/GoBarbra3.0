import React from 'react';
import {AccountCircle as AccountCircleIcon} from '@material-ui/icons';
import {
    Avatar,
    Button,
    Typography,
} from '@material-ui/core';
import {useStyles} from './styles';
import TextField from "@material-ui/core/TextField";
import {useStylesBasic} from "../../pages/styles";
import {ErrorSnackBar} from "../errorSnackBar";


const UpdateForm = ({
                        onSubmit, register, handleSubmit, errors, handleCloseSnackBar,
                        isSnackBarOpen, snackBarKey, snackBarMessage, registering, password, edit
                    }) => {

    const classes = useStyles();
    const basicClasses = useStylesBasic();
    return (
        <>
            <div className={basicClasses.paper}>
                <Avatar className={registering ? classes.animateAvatar : classes.avatar}>
                    <AccountCircleIcon style={{fontSize: 45}}/>
                </Avatar>

                <Typography component='h1' variant='h4'>
                    Update data
                </Typography>
                <form
                    className={basicClasses.form}
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        name='username'
                        label='Username'
                        variant='outlined'
                        margin='normal'
                        inputRef={register({
                            minLength: {
                                value: 6,
                                message: 'Your username must be greater than 6 characters',
                            },
                        })}
                        autoComplete='username'
                        error={!!errors.username}
                        className={basicClasses.textField}
                        fullWidth
                        autoFocus
                    />
                    {errors.username && (
                        <span className={basicClasses.error}>{errors.username.message}</span>
                    )}
                    <TextField

                        name='email'
                        label='Email Address'
                        variant='outlined'
                        margin='normal'
                        inputRef={register({
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'You must provide a valid email address!',
                            },
                        })}
                        autoComplete='email'
                        error={!!errors.email}
                        className={basicClasses.textField}
                        fullWidth
                        autoFocus
                    />
                    {errors.email && (
                        <span className={basicClasses.error}>{errors.email.message}</span>
                    )}
                    <TextField
                        name='password'
                        label='Password'
                        type='password'
                        variant='outlined'
                        margin='normal'
                        inputRef={register({
                            minLength: {
                                value: 6,
                                message: 'Your password must be greater than 6 characters',
                            },
                        })}
                        className={basicClasses.textField}
                        error={!!errors.password}
                        fullWidth
                        autoComplete='current-password'
                    />
                    {errors.password && (
                        <span className={basicClasses.error}>{errors.password.message}</span>
                    )}
                    <TextField
                        name='passwordRepeat'
                        label='Password Repeat'
                        type='password'
                        variant='outlined'
                        margin='normal'
                        inputRef={register({
                            validate: value =>
                                value === password.current || "The passwords do not match"
                        })}
                        className={basicClasses.textField}
                        error={!!errors.password2}
                        fullWidth
                        autoComplete='current-password'
                    />
                    {errors.passwordRepeat && (
                        <span className={basicClasses.error}>{errors.passwordRepeat.message}</span>
                    )}
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        disabled={!!errors.username || !!errors.email || !!errors.password || !!errors.passwordRepeat || registering}
                        className={basicClasses.submit}
                    >
                       Update
                    </Button>
                </form>
            </div>
            <ErrorSnackBar handleClose={handleCloseSnackBar} open={isSnackBarOpen}
                           snackbarKey={snackBarKey} message={snackBarMessage}/>
        </>
    );
};


export {UpdateForm};