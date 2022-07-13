

import { Actions } from './ActionEnums';
import { IClub } from './components/clubs';
import { v4 as uuid } from 'uuid';
export type ActionType =
  ClubActions

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

  type ClubPayload = {
    [Actions.AddClub]: {
        name: string ;
        city: string;
        pricePerHour: number;
        numberOfCourts: number;
        surface: string;
        image?: string;
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
        image?: string;
    };
  };
  export type ClubActions = ActionMap<ClubPayload>[keyof ActionMap<ClubPayload>];

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