import React, { createContext, useReducer, Dispatch } from 'react';
import {
  clubReducer,
  ActionType,
  messageReducer,
  confirmationReducer,
  reservationReducer
} from './reducers';

import { IClub } from './components/clubs';
import { clubsData, reservationsData } from './data';
import { IReservation } from './components/reservations';

type Props = {
  children: JSX.Element
}

type InitialStateType = {
  clubs: IClub[],
  reservations: IReservation[],
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
   message
  }: InitialStateType,
  action: ActionType
) => ({
  clubs: clubReducer(clubs, action),
  reservations: reservationReducer(reservations, action),
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