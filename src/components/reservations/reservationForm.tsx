import { Dialog, DialogTitle, DialogContent, Button, TextField, Grid} from '@mui/material';
import { useState, useContext } from 'react';
import { IClub } from '../clubs/clubList';
import { Context } from '../../context'
import { Actions } from '../../ActionEnums';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { IReservation } from './reservationList';
import { Colors } from '../../styles/theme';



type IProps = {
    handleClose: () => void;
    clubInput?: IClub | undefined;
    reservationInput?: IReservation;
}



export default function ReservationForm({handleClose, clubInput, reservationInput} : IProps) {
    const [name] = useState(clubInput?.name || reservationInput?.club || '');
    const [city] = useState(clubInput?.city || reservationInput?.city || '');
    const {dispatch} = useContext(Context);
    const [date, setDate] = useState<MaterialUiPickersDate | null>(new Date());

  
    const handleSubmit = (e:React.FormEvent) => {
      const reservation = {
        club: name,
        city: city,
        date: `${date?.toDateString()} ${`${date?.getHours()}:00`}`
      };
      if (!reservationInput){
        dispatch({type: Actions.AddReservation, payload: reservation as IReservation})
        dispatch({
          type: Actions.ShowMessage,
          payload: { text: `Reservation for club ${name} created`, severity: 'success', autoHide: 2000 }
        });
        handleClose();
      }else{
        dispatch({type: Actions.UpdateReservation, payload: {id: reservationInput.id, ...reservation}})
        dispatch({
          type: Actions.ShowMessage,
          payload: { text: `Reservation for club ${name} updated`, severity: 'success', autoHide: 2000 }
        });
        handleClose();
      }
      
    }

    

    return(
    <Dialog 
    id="new-club-dialog" 
    open={true} 
    BackdropProps={{ style: { background: '#1297FCC 0% 0% no-repeat padding-box' } }}
    >
      <DialogTitle
        id="form-dialog-title"
        style={{
          borderBottom: '1px solid ' + Colors.secondary,
          textAlign: 'center',
          paddingTop: '15px',
          paddingBottom: '13px'
        }}
      >
        <span
          style={{
            margin: 'auto',
            color: Colors.secondary,
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
              value={city}
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
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  id="create-new-reservation-button"
                  data-testid="create-new-reservation-button"
                  onClick={(e) => {
                    handleSubmit(e)}}
                >
                  {!reservationInput ? 'Reserve' : 'Update'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
      </DialogContent>
    </Dialog>
    )
}