import React, { createContext, useReducer, Dispatch } from 'react';
import {
  clubReducer,
  ActionType
} from './reducers';

import { IClub } from './components/clubs';
import { clubsData } from './data';

type Props = {
  children: JSX.Element
}

type InitialStateType = {
  clubs: IClub[]
};

export const InitialState = {
  clubs: clubsData
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
   clubs
  }: InitialStateType,
  action: ActionType
) => ({
  clubs: clubReducer(clubs, action),
});


const AppProvider: React.FC<Props> = ({ children } : Props) => {
  const [state, dispatch] = useReducer(mainReducer, InitialState);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export {
  Context,
  AppProvider
};