import { Box } from '@material-ui/core';
import { useState } from 'react';
import { DataGrid , GridColDef, GridValueGetterParams  } from '@mui/x-data-grid';
import { Button } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { reservationsData } from '../data';

export type IReservation = {
    id: string ;
    club: string ;
    city: string;
    date: string;
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
    const [reservations, setReservations] = useState(reservationsData);
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
         onClick={() => deleteCompanyFunc(params.row.id)}>
           DELETE
           </DeleteIcon >
      }

      const deleteCompanyFunc = (id: string) => {
        console.log(id);
        
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
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        rows={reservations}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
      );
  }
