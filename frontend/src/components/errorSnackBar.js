import Slide from "@material-ui/core/Slide";
import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

function transition(props) {
    return <Slide {...props} direction="right"
                  style={{
                      backgroundColor: '#cc0000'
                  }}
    />;
}

export const ErrorSnackBar = ({open, handleClose, snackbarKey, message}) => {
    return (
        <Snackbar

            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            sev
            open={open}
            onClose={handleClose}
            onExit={handleClose}
            TransitionComponent={transition}
            message={message}
            key={snackbarKey}
            autoHideDuration={5000}
            action={
                <React.Fragment>
                    <IconButton
                        aria-label="close"
                        color="inherit"

                        onClick={handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                </React.Fragment>
            }
        />
    )
}