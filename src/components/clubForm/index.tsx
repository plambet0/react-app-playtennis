import { Dialog, DialogTitle, DialogContent, Button, TextField, Grid, RadioGroup, FormLabel, FormControlLabel, Radio } from '@mui/material';
import { useState } from 'react';
import { IClub } from '../clubs';

type IProps = {
    handleClose: () => void;
    clubInput?: IClub | undefined;
}

export type IErrors = {
    name: string | null;
    city: string | null;
    numberOfScourts: number | null;
    surface: string | null;
    pricePerHour: number | null;
    image: string | null;
  };

const defaultErrorsObj: IErrors = {
  name: null,
  city: null,
  numberOfScourts: null,
  surface: null,
  pricePerHour: null,
  image: null
};

const errorTexts = {
    name: 'Name is required',
    city: 'City is required',
    numberOfScourts: 'Number of courts is required',
    surface: 'Surface is required',
    pricePerHour: 'Price per hour is required',
  };


export default function ClubForm({handleClose, clubInput} : IProps) {
    const [name, setName] = useState(clubInput?.name || null);
    const [city, setCity] = useState(clubInput?.city || null);
    const [pricePerHour, setpricePerHour] = useState(clubInput?.pricePerHour || null);
    const [numberOfCourts, setNumberOfCourts] = useState(clubInput?.numberOfCourts || null);
    const [surface, setSurface] = useState(clubInput?.surface || null);
    const [formErrors, setFormErrors] = useState(defaultErrorsObj);

    

    return(
    <Dialog 
    id="new-company-dialog" 
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
          Create company
        </span>
      </DialogTitle>
      <DialogContent style={{ padding: 0}}>
        <Grid container style={{ marginTop: '38px' }}>
          <Grid item xs={9}>
            <TextField
              fullWidth
              required
              id="name"
              data-testid="name"
              label="Club Name (full)"
              name="name"
            //   error={formErrors.companyName !== null}
            //   helperText={formErrors.companyName ? formErrors.companyName : ''}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              InputLabelProps={{
                style: { color: formErrors.name !== null ? 'red' : '#12497F' }
              }}
              inputProps={{
                style: { color: '#12497F' },
                'data-testid': 'name-input-field'
              }}
            />
            </Grid>
            <Grid item xs={9}>
            <TextField
              fullWidth
              required
              id="city"
              data-testid="city"
              label="City (full)"
              name="city"
            //   error={formErrors.companyName !== null}
            //   helperText={formErrors.companyName ? formErrors.companyName : ''}
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              InputLabelProps={{
                style: { color: formErrors.city !== null ? 'red' : '#12497F' }
              }}
              inputProps={{
                style: { color: '#12497F' },
                'data-testid': 'city-input-field'
              }}
            />
            </Grid>
            <Grid container style={{ marginTop: '115px', marginBottom: '40px' }}>
              <Grid item xs={12} style={{ textAlign: 'center'}}>
                <Button
                  id="cancel-new-company-button"
                  data-testid="cancel-new-company-button"
                //   className={classes.cancelButton}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  id="create-new-company-button"
                  data-testid="create-new-company-button"
                //   className={classes.createButton}
                //   onClick={handleSumbit}
                >
                  {!clubInput ? 'CREATE' : 'UPDATE'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
      </DialogContent>
    </Dialog>
    )
}