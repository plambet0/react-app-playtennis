

import { Actions } from './ActionEnums';
import { IClub } from './components/clubs/clubList';
import { v4 as uuid } from 'uuid';
import { MessageType, ConfirmationType } from './context';
import { IReservation } from './components/reservations/reservationList';
import { IPlayer } from './components/players/playerForm';
export type ActionType =
  ClubActions | MessageActions | ConfirmationActions | ReservationActions | PlayerActions

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
      ? {
          type: Key;
        }
      : {
          type: Key;
          payload: M[Key];
        };
  };

  type PlayerPayload = {
    [Actions.AddPlayer]: {
      name: string;
      city: string;
      hand: string;
      sex: string;
      image: string;
    };
    [Actions.DeletePlayer]: {
      id: string;
    }
    [Actions.UpdatePlayer] : {
        id: string ;
        name: string;
        city: string;
        hand: string;
        sex: string;
        image: string;
    };
  }

  type ClubPayload = {
    [Actions.AddClub]: {
        name: string ;
        city: string;
        pricePerHour: number;
        numberOfCourts: number;
        surface: string;
        image: string;
    };
    [Actions.DeleteClub]: {
      id: string;
    }
    [Actions.UpdateClub] : {
        id: string ;
        name: string ;
        city: string;
        pricePerHour: number;
        numberOfCourts: number;
        surface: string;
        image: string;
    };
  };
  type MessagePayload = {
    [Actions.ShowMessage]: {
      text: string;
      autoHide?: number;
      severity: 'success' | 'error' | 'warning' | 'info' | null;
    };
    [Actions.HideMessage]: undefined;
  };

  type ConfirmationPayload = {
    [Actions.ShowConfirmation]: {
      title?: string;
      text: string;
      agreeAction: (params?: any) => void;
      params?: any;
    };
    [Actions.HideConfirmation]: undefined;
  };

  type ReservationPayload = {
    [Actions.AddReservation]: {
      club: string ;
      city: string;
      date?: string;
  };
  [Actions.DeleteReservation]: {
    id: string;
  }
  [Actions.UpdateReservation] : {
      id: string ;
      club: string ;
      city: string;
      date: string;
  };
  };

  export type ClubActions = ActionMap<ClubPayload>[keyof ActionMap<ClubPayload>];
  export type MessageActions = ActionMap<MessagePayload>[keyof ActionMap<MessagePayload>];
  export type ConfirmationActions = ActionMap<ConfirmationPayload>[keyof ActionMap<ConfirmationPayload>];
  export type ReservationActions = ActionMap<ReservationPayload>[keyof ActionMap<ReservationPayload>];
  export type PlayerActions = ActionMap<PlayerPayload>[keyof ActionMap<PlayerPayload>];

  export const clubReducer = (state: IClub[], action: ActionType): IClub[] => {
    switch (action.type) {
      case Actions.AddClub:
        return [{id: uuid(), ...action.payload}, ...state]
      case Actions.DeleteClub:
        return state.filter((c) => c.id !== action.payload.id)
      case Actions.UpdateClub:
      return state.map((c) => c.id === action.payload.id ? action.payload : c)
      default:
        return state;
    }
  };

  export const reservationReducer = (state: IReservation[], action: ActionType): IReservation[] => {
    switch (action.type) {
      case Actions.AddReservation:
        return [{id: uuid(), ...action.payload}, ...state]
      case Actions.DeleteReservation:
        return state.filter((c) => c.id !== action.payload.id)
      case Actions.UpdateReservation:
      return state.map((c) => c.id === action.payload.id ? action.payload : c)
      default:
        return state;
    }
  };

  export const playerReducer = (state: IPlayer[], action: ActionType): IPlayer[] => {
    switch (action.type) {
      case Actions.AddPlayer:
        return [{id: uuid(), ...action.payload}, ...state]
      case Actions.DeletePlayer:
        return state.filter((c) => c.id !== action.payload.id)
      case Actions.UpdatePlayer:
      return state.map((c) => c.id === action.payload.id ? action.payload : c)
      default:
        return state;
    }
  };

  export const messageReducer = (state: MessageType, action: ActionType): MessageType => {
    switch (action.type) {
      case Actions.ShowMessage:
        return {
          open: true,
          text: action.payload.text,
          severity: action.payload.severity,
          autoHide: action.payload.autoHide ?? 3000
        };
      case Actions.HideMessage:
        return { ...state, open: false };
      default:
        return state;
    }
  };

  export const confirmationReducer = (
    state: ConfirmationType,
    action: ActionType
  ): ConfirmationType => {
    switch (action.type) {
      case Actions.ShowConfirmation:
        return {
          open: true,
          title: action.payload.title,
          text: action.payload.text,
          agreeAction: action.payload.agreeAction,
          params: action.payload.params
        };
      case Actions.HideConfirmation:
        return { open: false, title: null, text: null };
      default:
        return state;
    }
  };