import { Divider, ListItemButton, ListItemIcon } from "@mui/material";
import { MyList, ActionIconsContainerDesktop, ActionIconsContainerMobile } from "../../styles/appbar";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Colors } from "../../styles/theme";

type IProps = {
    matches: boolean;
  };

export default function Actions({ matches} : IProps) {
    const Component = matches
    ? ActionIconsContainerMobile
    : ActionIconsContainerDesktop
    
    
    return(
        <Component>
        <MyList type={"row"}>
            <Divider orientation="vertical" flexItem />
            <ListItemButton
                sx={{
                    justifyContent: 'center'
                }}
            >
                <ListItemIcon
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        color: Colors.secondary
                    }}
                >
                    <FavoriteIcon/>
                </ListItemIcon>
            </ListItemButton>
        </MyList>
        </Component>
    )
}