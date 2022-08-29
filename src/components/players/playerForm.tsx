import { Dialog, DialogTitle, DialogContent, Button, TextField, Grid} from '@mui/material';
import { useState, useContext } from 'react';
import { Context } from '../../context';
import { Actions } from '../../ActionEnums';

export type IPlayer = {
  id: string ;
  name: string ;
  city: string;
  hand: string;
  sex: string;
  image: string;
};


type IProps = {
    handleClose: () => void;
    playerInput?: IPlayer | undefined;
}

export type IErrors = {
    name: string | null;
    city: string | null;
    hand: string | null;
    sex: string | null;
    image: string | null;
  };

const defaultErrorsObj: IErrors = {
  name: null,
  city: null,
  hand: null,
  sex: null,
  image: null,
};

export default function PlayerForm({handleClose, playerInput} : IProps) {
    const [name, setName] = useState(playerInput?.name || '');
    const [city, setCity] = useState(playerInput?.city || '');
    const [hand, setHand] = useState(playerInput?.hand || '');
    const [sex, setSex] = useState(playerInput?.sex || '');
    const [image, setImage] = useState(playerInput?.image || '');
    const [formErrors, setFormErrors] = useState(defaultErrorsObj);
    const {dispatch} = useContext(Context);

    const errorTexts = {
      name: 'Name is required',
      city: 'City is required',
      hand: 'Hand is required',
      sex: 'Sex is required',
      image: 'Image is required'
    };
    
    const handleSubmit = (e:React.FormEvent) => {
      const errors = {
        name: null,
        city: null,
        hand: null,
        sex: null,
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
      if (!hand || city.length ===0) {
        hasErrors = true;
        errors.hand = errorTexts.hand;
      }
      if (!sex || sex.length ===0) {
        hasErrors = true;
        errors.sex = errorTexts.sex;
      }
      if (!image || image.length === 0) {
        hasErrors = true;
        errors.image = errorTexts.image;
      }
      const player = {
        name: name,
        city: city,
        hand: hand,
        sex: sex,
        image: image
      };
      if (hasErrors) {
        setFormErrors(errors);
      }else {
        if (!playerInput) {
          dispatch({type: Actions.AddPlayer, payload: player})
          dispatch({
            type: Actions.ShowMessage,
            payload: { text: `Player ${name} created`, severity: 'success', autoHide: 2000 }
          });
          handleClose();
        }else{
          dispatch({type: Actions.UpdatePlayer, payload: {id: playerInput.id, ...player}})
          dispatch({
            type: Actions.ShowMessage,
            payload: { text: `Player ${name} updated`, severity: 'success', autoHide: 2000 }
          });
          handleClose();
        }
      }
      
    }

    

    return(
    <Dialog 
    id="new-player-dialog" 
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
          {!playerInput ? 'Add Player' : 'Edit Player'}
        </span>
      </DialogTitle>
      <DialogContent style={{ padding: 0}}>
        <Grid container style={{ marginTop: '38px' }} spacing={2} padding={'15px'}>
          <Grid item xs={8} >
            <TextField
              fullWidth
              required
              id="name"
              label="Player Name"
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
              id="hand"
              label="Hand"
              name="hand"
              error={formErrors.hand !== null}
              helperText={formErrors.hand ? formErrors.hand : ''}
              value={hand}
              onChange={(e) => {
                setHand(e.target.value);
              }}
              InputLabelProps={{
                style: { color: formErrors.hand !== null ? 'red' : '#12497F' }
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
              id="sex"
              label="Sex"
              name="sex"
              error={formErrors.sex !== null}
              helperText={formErrors.sex ? formErrors.sex : ''}
              value={sex}
              onChange={(e) => {
                setSex(e.target.value);
              }}
              InputLabelProps={{
                style: { color: formErrors.sex !== null ? 'red' : '#12497F' }
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
                  id="cancel-new-player-button"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  id="create-new-player-button"
                  onClick={(e) => {
                    handleSubmit(e)}}
                >
                  {!playerInput ? 'CREATE' : 'UPDATE'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
      </DialogContent>
    </Dialog>
    )
}