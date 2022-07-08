import { Dialog, DialogTitle, DialogContent, Button, TextField, Grid, RadioGroup, FormLabel, FormControlLabel, Radio } from '@mui/material';
import { useState, useEffect } from 'react';
import { IClub } from '../clubs';
import { clubsData } from '../../data';
import { v4 as uuid } from 'uuid';

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
    const [name, setName] = useState(clubInput?.name || '');
    const [city, setCity] = useState(clubInput?.city || '');
    const [pricePerHour, setpricePerHour] = useState(clubInput?.pricePerHour || 0);
    const [numberOfCourts, setNumberOfCourts] = useState(clubInput?.numberOfCourts || 0);
    const [surface, setSurface] = useState(clubInput?.surface || '');
    const [image, setImage] = useState(clubInput?.image || '');
    const [formErrors, setFormErrors] = useState(defaultErrorsObj);
    const [clubs, setClubs] = useState<IClub[]>(clubsData);

   
    
    const handleSubmit = (e:React.FormEvent) => {
      e.preventDefault();
      if (!clubInput) {
        const club = {
          id: uuid(),
          name: name,
          city: city,
          pricePerHour: pricePerHour,
          numberOfCourts: numberOfCourts,
          surface: surface,
          image: image
        };
        clubs.push(club);
        setClubs(clubs);
      }else{
        const editedClub = clubs.map(club => {
          if (club.id === clubInput.id) {
            return {...club, 
            id: clubInput.id,
            name: name,
            city: city,
            pricePerHour: pricePerHour,
            numberOfCourts: numberOfCourts,
            surface: surface,
            image: image
            };
          }
          return club;
        });
    
        setClubs(editedClub);
      }
      
     
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
          {!clubInput ? 'Add Club' : 'Edit Club'}
        </span>
      </DialogTitle>
      <DialogContent style={{ padding: 0}}>
        <Grid container style={{ marginTop: '38px' }}>
          <Grid item xs={9}>
            <TextField
              fullWidth
              required
              id="name"
              label="Club Name (full)"
              name="name"
              error={formErrors.name !== null}
              helperText={formErrors.name ? formErrors.name : ''}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              InputLabelProps={{
                style: { color: formErrors.name !== null ? 'red' : '#12497F' }
              }}
              inputProps={{
                style: { color: '#12497F' }
              }}
            />
            </Grid>
            <Grid item xs={9}>
            <TextField
              fullWidth
              required
              id="city"
              label="City (full)"
              name="city"
              error={formErrors.city !== null}
              helperText={formErrors.city ? formErrors.city : ''}
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              InputLabelProps={{
                style: { color: formErrors.city !== null ? 'red' : '#12497F' }
              }}
              inputProps={{
                style: { color: '#12497F' }
              }}
            />
            <Grid item xs={9}>
            <TextField
              fullWidth
              required
              id="price"
              label="Price per hour"
              name="name"
              error={formErrors.pricePerHour !== null}
              helperText={formErrors.pricePerHour ? formErrors.pricePerHour : ''}
              value={pricePerHour}
              onChange={(e) => {
                setpricePerHour(+e.target.value);
              }}
              InputLabelProps={{
                style: { color: formErrors.pricePerHour !== null ? 'red' : '#12497F' }
              }}
              inputProps={{
                style: { color: '#12497F' }
              }}
            />
            </Grid>
            <Grid item xs={9}>
            <TextField
              fullWidth
              required
              id="number-of-courts"
              label="Number of courts"
              name="numberOfCourts"
              error={formErrors.numberOfScourts !== null}
              helperText={formErrors.numberOfScourts ? formErrors.numberOfScourts : ''}
              value={numberOfCourts}
              onChange={(e) => {
                setNumberOfCourts(+e.target.value);
              }}
              InputLabelProps={{
                style: { color: formErrors.numberOfScourts !== null ? 'red' : '#12497F' }
              }}
              inputProps={{
                style: { color: '#12497F' }
              }}
            />
            </Grid>
            <Grid item xs={9}>
            <TextField
              fullWidth
              required
              id="surface"
              label="Surface"
              name="surface"
              error={formErrors.surface !== null}
              helperText={formErrors.surface ? formErrors.surface : ''}
              value={surface}
              onChange={(e) => {
                setSurface(e.target.value);
              }}
              InputLabelProps={{
                style: { color: formErrors.surface !== null ? 'red' : '#12497F' }
              }}
              inputProps={{
                style: { color: '#12497F' }
              }}
            />
            </Grid>
            <Grid item xs={9}>
            <TextField
              fullWidth
              required
              id="image"
              label="Image"
              name="image"
              error={formErrors.image !== null}
              helperText={formErrors.image ? formErrors.image : ''}
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
              InputLabelProps={{
                style: { color: formErrors.image !== null ? 'red' : '#12497F' }
              }}
              inputProps={{
                style: { color: '#12497F' }
              }}
            />
            </Grid>
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
                  onClick={(e) => {
                    handleSubmit(e)}}
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