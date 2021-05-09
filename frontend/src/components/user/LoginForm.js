import React from 'react';
import {AccountCircle as AccountCircleIcon} from '@material-ui/icons';
import {Link} from 'react-router-dom'
import {
    Avatar,
    Grid,
    Button,
    Typography,
} from '@material-ui/core';
import {useStyles} from './styles';
import TextField from "@material-ui/core/TextField";
import * as routes from '../../routing/routes'
import {useStylesBasic} from "../../pages/styles";
import {ErrorSnackBar} from "../errorSnackBar";


const LoginForm = ({onSubmit,register, handleSubmit, errors,handleCloseSnackBar,
                       isSnackBarOpen, snackBarKey, snackBarMessage, logging}) => {

    const classes = useStyles();
    const basicClasses = useStylesBasic();

    return (
        <>
            <div className={basicClasses.paper}>
                <Avatar className={logging ? classes.animateAvatar : classes.avatar}>
                    <AccountCircleIcon style={{fontSize: 45}}/>
                </Avatar>
                <Typography component='h1' variant='h4'>
                    Sign in
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
                            required: 'You must provide the username!',
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
                        className={basicClasses.textField}
                        error={!!errors.password}
                        fullWidth
                        autoComplete='current-password'
                    />
                    {errors.password && (
                        <span className={basicClasses.error}>{errors.password.message}</span>
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
                        disabled={!!errors.username || !!errors.password || logging}
                        className={basicClasses.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to={routes.REGISTER} variant='body2' className={classes.link}>
                                {'New to this platform? Create an Account.'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>

            </div>
            <ErrorSnackBar handleClose={handleCloseSnackBar} open={isSnackBarOpen}
                           snackbarKey={snackBarKey} message={snackBarMessage}/>
        </>
    );
};

export {LoginForm};