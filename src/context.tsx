import React, { createContext, useReducer, Dispatch } from 'react';
import {
  clubReducer,
  ActionType,
  messageReducer,
  confirmationReducer,
  reservationReducer,
  playerReducer
} from './reducers';

import { IClub } from './components/clubs/clubList';
import { clubsData, reservationsData, playersData } from './data';
import { IReservation } from './components/reservations/reservationList';
import { IPlayer } from './components/players/playerForm';

type Props = {
  children: JSX.Element
}

type InitialStateType = {
  clubs: IClub[];
  reservations: IReservation[];
  players: IPlayer[];
  message: MessageType;
  confirmation: ConfirmationType;
  
};

type MessageType = {
  open: boolean;
  text: string | null;
  autoHide: number;
  severity: 'success' | 'error' | 'warning' | 'info' | null;
};

type ConfirmationType = {
  open: boolean;
  title?: string | null;
  text?: string | null;
  agreeAction?: (params?: string) => void;
  params?: string;
};

export const InitialState = {
  clubs: clubsData,
  reservations: reservationsData,
  players: playersData,
  message: { open: false, text: null, severity: null, autoHide: 3000 },
  confirmation: { open: false },
  
};

const Context = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ActionType>;
}>({
  state: InitialState,
  dispatch: () => null
});

const mainReducer = (
  {
   clubs,
   reservations,
   confirmation,
   message,
   players,
  }: InitialStateType,
  action: ActionType
) => ({
  clubs: clubReducer(clubs, action),
  reservations: reservationReducer(reservations, action),
  players: playerReducer(players, action),
  message: messageReducer(message, action),
  confirmation: confirmationReducer(confirmation, action),

});


const AppProvider: React.FC<Props> = ({ children } : Props) => {
  const [state, dispatch] = useReducer(mainReducer, InitialState);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export {
  Context,
  AppProvider,
  
};
export type {
  MessageType,
  ConfirmationType
}
