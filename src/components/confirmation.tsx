import React, { useContext } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid
} from '@material-ui/core';
import { Context } from '../context';
import { Actions } from '../ActionEnums';

// const useStyles = makeStyles(() => {
//   return {
//     paper: { borderRadius: '10px' },
//     button: {
//       ...Theme.Buttons.save
//     },
//     button_secondary: {
//       ...Theme.Buttons.cancel
//     }
//   };
// });

const Confirmation: React.FunctionComponent = () => {
    //const classes = useStyles();
    const { state, dispatch } = useContext(Context);
  
    const handleAgree = () => {
      if (state.confirmation.agreeAction) {
        state.confirmation.agreeAction(state.confirmation.params);
      }
    };
    return (
      <Dialog
        id="alert-dialog"
        open={state.confirmation.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{  }}
        BackdropProps={{ style: { background: '#12497FCC 0% 0% no-repeat padding-box' } }}
      >
        {state.confirmation.title && (
          <DialogTitle
            id="alert-dialog-title"
            style={{
              borderBottom: '1px solid ' + '#0EAEFF',
              textAlign: 'center',
              paddingTop: '15px',
              paddingBottom: '13px'
            }}
          >
            <span
              style={{
                margin: 'auto',
                color: '#0EAEFF',
                letterSpacing: '-0.01px',
                fontSize: '22px',
                lineHeight: '33px',
                opacity: '1px',
                fontWeight: 'bold',
                width: '100%'
              }}
            >
              {state.confirmation.title}
            </span>
          </DialogTitle>
        )}
        <DialogContent style={{ marginTop: 44, marginLeft: 61, marginRight: 60 }}>
          <DialogContentText id="alert-dialog-description" style={{ color: '#12497F' }}>
            {state.confirmation.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container style={{ marginTop: '32px', marginBottom: '44px' }}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button
                id="no-dialog-button"
                onClick={() => dispatch({ type: Actions.HideConfirmation })}
                className={''}
              >
                No
              </Button>
              <Button
                id="yes-dialog-button"
                onClick={handleAgree}
                className={''}
                autoFocus
              >
                Yes
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default Confirmation;