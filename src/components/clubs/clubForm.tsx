import { Dialog, DialogTitle, DialogContent, Button, TextField, Grid} from '@mui/material';
import { useState, useContext } from 'react';
import { IClub } from './clubList';
import { Context } from '../../context';
import { Actions } from '../../ActionEnums';

type IProps = {
    handleClose: () => void;
    clubInput?: IClub | undefined;
}

export type IErrors = {
    name: string | null;
    city: string | null;
    numberOfScourts: string | null;
    surface: string | null;
    pricePerHour: string | null;
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

export default function ClubForm({handleClose, clubInput} : IProps) {
    const [name, setName] = useState(clubInput?.name || '');
    const [city, setCity] = useState(clubInput?.city || '');
    const [pricePerHour, setpricePerHour] = useState(clubInput?.pricePerHour || 0);
    const [numberOfCourts, setNumberOfCourts] = useState(clubInput?.numberOfCourts || 0);
    const [surface, setSurface] = useState(clubInput?.surface || '');
    const [image, setImage] = useState(clubInput?.image || '');
    const [formErrors, setFormErrors] = useState(defaultErrorsObj);
    const {dispatch} = useContext(Context);

    const errorTexts = {
      name: 'Name is required',
      city: 'City is required',
      numberOfScourts: 'Number of courts is required',
      surface: 'Surface is required',
      pricePerHour: 'Price per hour is required',
      image: 'Image is required'
    };
    
    const handleSubmit = (e:React.FormEvent) => {
      const errors = {
        name: null,
        city: null,
        numberOfScourts: null,
        surface: null,
        pricePerHour: null,
        image: null
      } as IErrors;

      let hasErrors = false;
      if (!name || name.length === 0) {
        hasErrors = true;
        errors.name = errorTexts.name;
      }
      if (!city || city.length ===0) {
        hasErrors = true;
        errors.city = errorTexts.city;
      }
      if (pricePerHour <= 0) {
        hasErrors = true;
        errors.pricePerHour = errorTexts.pricePerHour;
      }
      if (numberOfCourts <= 0) {
        hasErrors = true;
        errors.numberOfScourts = errorTexts.numberOfScourts;
      }
      if (!image || image.length === 0) {
        hasErrors = true;
        errors.image = errorTexts.image;
      }
      if (!surface || surface.length === 0) {
        hasErrors = true;
        errors.surface = errorTexts.surface;
      }
      const club = {
        name: name,
        city: city,
        pricePerHour: pricePerHour,
        numberOfCourts: numberOfCourts,
        surface: surface,
        image: image
      };
      if (hasErrors) {
        setFormErrors(errors);
      }else {
        if (!clubInput) {
          dispatch({type: Actions.AddClub, payload: club})
          dispatch({
            type: Actions.ShowMessage,
            payload: { text: `Club ${name} created`, severity: 'success', autoHide: 2000 }
          });
          handleClose();
        }else{
          dispatch({type: Actions.UpdateClub, payload: {id: clubInput.id, ...club}})
          dispatch({
            type: Actions.ShowMessage,
            payload: { text: `Club ${name} updated`, severity: 'success', autoHide: 2000 }
          });
          handleClose();
        }
      }
      
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
        <Grid container style={{ marginTop: '38px' }} spacing={2} padding={'15px'}>
          <Grid item xs={8} >
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
          <Grid item xs={4}>
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
            </Grid>
            <Grid item xs={6} >
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
            <Grid item xs={6}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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