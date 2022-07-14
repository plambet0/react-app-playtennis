import React, { useContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Context } from '../context';
import { Actions } from '../ActionEnums'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Message: React.FunctionComponent = () => {
  const { state, dispatch } = useContext(Context);

  const handleClose = (_: unknown, reason: string) => {
    if (reason !== 'clickaway') {
      dispatch({ type: Actions.HideMessage });
    }
  };
  return (
    <Snackbar
      open={state.message.open}
      autoHideDuration={state.message.autoHide}
      onClose={handleClose}
    >
      <Alert
        onClose={() => dispatch({ type: Actions.HideMessage })}
        severity={state.message.severity ?? 'success'}
      >
        {state.message.text}
      </Alert>
    </Snackbar>
  );
};
export default Message;