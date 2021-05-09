import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {Button} from "@material-ui/core";
import React from "react";
import {useStylesBasic} from "../../pages/styles";

import {ErrorSnackBar} from "../errorSnackBar";

const languagesList = [
    "en", "fr", "pt", "es", "pl"
]



export const SongForm = ({onSubmit,register, handleSubmit,
                             errors,handleCloseSnackBar, isSnackBarOpen, snackBarKey,
                             snackBarMessage, edit, adding})=>{
    const basicClasses = useStylesBasic();

    return(
        <div className={basicClasses.paper}>
            <Typography component='h1' variant='h4'>
                {edit?"Edit Song":"New Song"}
            </Typography>
            <form
                className={basicClasses.form}
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
                    className={basicClasses.textField}
                    fullWidth
                    autoFocus
                />
                {errors.text && (
                    <span className={basicClasses.error}>{errors.text.message}</span>
                )}
                <Autocomplete
                    options={languagesList}
                    defaultValue={languagesList[0]}
                    disableClearable
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
                            className={basicClasses.textField}
                            error={!!errors.language}
                            fullWidth
                        />
                    )}
                />

                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    disabled={!!errors.text|| adding}
                    className={basicClasses.submit}
                >
                    {edit?"Edit":"Add"}
                </Button>
            </form>
            <ErrorSnackBar handleClose={handleCloseSnackBar} open={isSnackBarOpen}
                           snackbarKey={snackBarKey} message={snackBarMessage}/>
        </div>
    )
}