import { clubsData } from './data'
import { IClub } from './components/clubs';
import React, {useState} from 'react';

type Props = {
    children: JSX.Element
};

type ClubsType = {
    clubs: IClub[]
    setClubs: React.Dispatch<React.SetStateAction<IClub[]>>
    removeClub: (club:IClub) => void;
    addClub: (club:IClub) => void;
}

const Context = React.createContext<ClubsType>({} as ClubsType);

const ClubsProvider = ( {children } : Props ) => {
    const [clubs, setClubs] = useState<IClub[]>(clubsData);

    const removeClub = (club: IClub) => {
        const updatedClubs = clubs.filter(
          (c) => c.id !== club.id
        );
        setClubs(updatedClubs);
        alert(`Club ${club.name} deleted successfully!`)
      };

      const addClub = (club: IClub) => {
        clubs.push(club);
        setClubs(clubs);
        alert(`Club ${club.name} added successfully!`)
      };

    return (
        <Context.Provider value={{clubs, setClubs, removeClub, addClub}}>
            {children}
        </Context.Provider>
    );
};

export default ClubsProvider;

export const useClubs = () => React.useContext(Context);