import { useContext, useState } from 'react';
import { DataGrid , GridColDef, GridValueGetterParams  } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../context';
import { Colors } from '../styles/theme';
import { Actions } from '../ActionEnums';

export type IReservation = {
    id: string ;
    club: string ;
    city: string;
    date?: string;
};

const useStyles = makeStyles(() => ({
    Button: {
      width: '125px',
      height: '36px',
      border: '1px solid ' + '#2274BC',
      color: '#2274BC',
      fontFamily: 'Overpass',
      textTransform: 'uppercase',
      borderRadius: '10px',
      fontSize: '14px',
      lineHeight: '22px',
      letterSpacing: '0px',
      FontWeights: {
        light: 300,
        regular: 400,
        semiBold: 600,
        bold: 700
      },
      '&:hover':{
      color: 'blue',
      boxShadow: '0px 2px 10px grey',
      cursor: 'pointer',
      }
    }
  }));

  export default function Reservations() {
    const {state, dispatch} = useContext(Context)
    const classes = useStyles();
    const [reservation, setReservation] = useState<IReservation>();

    const renderEdit = (params: GridValueGetterParams) => {
        return <EditIcon 
        className={classes.Button}
        onClick={() => setReservation(params.row)}>
          EDIT</EditIcon>
      }
    
      const renderDelete = (params: GridValueGetterParams) => {
        return <DeleteIcon 
         className={classes.Button} 
         style={{color: '#F44336', border: '1px solid ' + '#F44336'}} 
         onClick={() => remove(params.row.id)}>
           DELETE
           </DeleteIcon >
      }

      const remove = (id:string) =>
      dispatch({
        type: Actions.ShowConfirmation,
        payload: {
          text: `Are you sure you want to delete reservation ${id}?`,
          agreeAction: deleteReservationFunc,
          params: id
        }
      });
      
      
      const deleteReservationFunc = (id: string) => {
        dispatch({ type: Actions.HideConfirmation });
        dispatch({type: Actions.DeleteReservation, payload:{id:id}})
        
      };

    const columns: GridColDef[] = [
        { 
          field: 'id',
          headerName: 'ID', 
          headerClassName: 'super-app-theme--header',
          width: 245,
          valueGetter: (params: GridValueGetterParams) => params.row.id
        },
        {
          field: 'Club',
          headerName: 'Club',
          headerClassName: 'super-app-theme--header',
          width: 255,
          editable: true,
          valueGetter: (params: GridValueGetterParams) => params.row.club
        },
        {
          field: 'City',
          headerName: 'City',
          headerClassName: 'super-app-theme--header',
          width: 250,
          editable: true,
          valueGetter: (params: GridValueGetterParams) => params.row.city
        },
        {
            field: 'Date',
            headerName: 'Date',
            headerClassName: 'super-app-theme--header',
            width: 245,
            editable: true,
            valueGetter: (params: GridValueGetterParams) => params.row.date
          },
        {
          field: 'EDIT',
          headerName: 'EDIT',
          headerClassName: 'super-app-theme--header',
          width: 245,
          renderCell: renderEdit
        }
        ,
        {
          field: 'DELETE',
          headerName: 'DELETE',
          headerClassName: 'super-app-theme--header',
          width: 245,
          renderCell: renderDelete
        }
      ];
        
      return (
        <div style={{ height: 400, width: '100%', paddingTop: '20px'}}>
      <DataGrid
        columns={columns}
        rows={state.reservations}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        sx={{
            boxShadow: 2,
            borderRadius: '10px',
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
            backgroundColor: Colors.light_gray
          }}
      />
    </div>
      );
  }

