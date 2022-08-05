import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import AppbarDesktop from "./appbarDesktop";

export default function Appbar() {
  const theme = useTheme();
  return (
    <>
      <AppbarDesktop/>
    </>
  );
}