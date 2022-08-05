import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { BannerContainer, BannerContent, BannerDescription, BannerImage, BannerTitle } from "../../../styles/banner";


export function Banner() {

  const theme = useTheme();

  return (
    <BannerContainer>
            <BannerImage src="/images/banner/tennis-court.jpg">

            </BannerImage>
        <BannerContent>
            <Typography variant="h6">Wellcome to "Play tennis" in</Typography>
            <BannerTitle variant="h2">BULGARIA</BannerTitle>
            <BannerDescription variant="subtitle2">
                PlayTennis is a place for club owners, trainers, or players of the tennis game.
                You can register a club or you can just find a place where you can reserve a court and play any of the registered players.
            </BannerDescription>
        </BannerContent>
    </BannerContainer>
  )
}