import React from 'react';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import {
    Avatar,
    Grid,
    Container,
    CssBaseline,
    Button,
    Link,
    Typography,
} from '@material-ui/core';
import { CssTextField, useStyles } from './styles';
import { useForm } from 'react-hook-form';

const RegisterForm = () => {
    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            remember: true,
        },
    });

    const onSubmit = data => alert(JSON.stringify(data));

    return (
        <Container  maxWidth='xs'>

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon style={{ fontSize: 45 }} />
                </Avatar>
                <Typography component='h1' variant='h4'>
                    Sign in
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <CssTextField
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
                        className={classes.margin}
                        fullWidth
                        autoFocus
                    />
                    {errors.email && (
                        <span className={classes.error}>{errors.email.message}</span>
                    )}
                    <CssTextField
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
                        error={!!errors.password}
                        fullWidth
                        autoComplete='current-password'
                    />
                    {errors.password && (
                        <span className={classes.error}>{errors.password.message}</span>
                    )}

                    <Grid container>
                        <Grid item xs>
                            <Link href='#' variant='body2' className={classes.link}>
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        disabled={!!errors.email || !!errors.password}
                        className={classes.submit}
                    >
                        Sign On
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/login" variant='body2' className={classes.link}>
                                {'Have an account? Sign in.'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};


export default RegisterForm;