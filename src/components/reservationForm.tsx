import { Dialog, DialogTitle, DialogContent, Button, TextField, Grid} from '@mui/material';
import { useState, useContext } from 'react';
import { IClub } from './clubs';
import { Context } from '../context'
import { Actions } from '../ActionEnums';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';



type IProps = {
    handleClose: () => void;
    clubInput?: IClub | undefined;
}



export default function ReservationForm({handleClose, clubInput} : IProps) {
    const [name, setName] = useState(clubInput?.name || '');
    const [city, setCity] = useState(clubInput?.city || '');
    const {state, dispatch} = useContext(Context);
    const [date, setDate] = useState<MaterialUiPickersDate | null>(new Date());

    const errorTexts = {
      name: 'Name is required',
      city: 'City is required',
      numberOfScourts: 'Number of courts is required',
      surface: 'Surface is required',
      pricePerHour: 'Price per hour is required',
      image: 'Image is required'
    };
    
    const handleSubmit = (e:React.FormEvent) => {
      const reservation = {
        club: name,
        city: city,
        date: `${date?.toDateString()} ${`${date?.getHours()}:00`}`
      };
      dispatch({type: Actions.AddReservation, payload: reservation})
      dispatch({
        type: Actions.ShowMessage,
        payload: { text: `Reservation for club ${name} created`, severity: 'success', autoHide: 2000 }
      });
      handleClose();
    }

    

    return(
    <Dialog 
    id="new-club-dialog" 
    open={true} 
    // classes={{ paper: classes.paperNew }}
    BackdropProps={{ style: { background: '#1297FCC 0% 0% no-repeat padding-box' } }}
    >
      <DialogTitle
        id="form-dialog-title"
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
          Make Reservation
        </span>
      </DialogTitle>
      <DialogContent style={{ padding: 0}}>
        <Grid container style={{ marginTop: '38px' }} spacing={2} padding={'15px'}>
          <Grid item xs={8} >
            <TextField
              fullWidth
              disabled
              required
              id="name"
              label="Club Name (full)"
              name="name"
              value={name}
              inputProps={{
                style: { color: '#12497F' }
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              disabled
              required
              id="city"
              label="City (full)"
              name="city"
              inputProps={{
                style: { color: '#12497F' }
              }}
            />
            </Grid>
            <Grid container style={{ marginTop: '38px' }} spacing={2} padding={'15px'}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={12} style={{ textAlign: 'center'}}>
                  <DateTimePicker
                    disablePast
                    value={date}
                    onChange={newDate => setDate(newDate)}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid container style={{ marginTop: '115px', marginBottom: '40px' }}>
              <Grid item xs={12} style={{ textAlign: 'center'}}>
                <Button
                  id="close-reservation-button"
                  data-testid="cancel-new-company-button"
                //   className={classes.cancelButton}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  id="create-new-reservation-button"
                  data-testid="create-new-reservation-button"
                //   className={classes.createButton}
                  onClick={(e) => {
                    handleSubmit(e)}}
                >
                  Reserve
                </Button>
              </Grid>
            </Grid>
          </Grid>
      </DialogContent>
    </Dialog>
    )
}