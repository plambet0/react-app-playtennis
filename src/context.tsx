import { clubsData } from './data'
import { IClub } from './components/clubs';
import React, {useState} from 'react';

type Props = {
    children: JSX.Element
};

type ClubsType = {
    clubs: IClub[]
    setClubs: React.Dispatch<React.SetStateAction<IClub[]>>
}

const Context = React.createContext<ClubsType>({} as ClubsType);

const ClubsProvider = ( {children } : Props ) => {
    const [clubs, setClubs] = useState<IClub[]>(clubsData);

    return (
        <Context.Provider value={{clubs, setClubs}}>
            {children}
        </Context.Provider>
    );
};

export default ClubsProvider;

export const useClubs = () => React.useContext(Context);