//importing a bunch of features coming from theme.js and material
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorContext, tokens } from "../../theme";
import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorContext);

  return (
    //First box is the whole topbar
    <Box display="flex" justifyContent="space-between" p={3}>
      {/*second box is the seacrh bar*/}
      <Box display="flex" backgroundColor={colors.black}></Box>

      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <ModeNightIcon />
          ) : (
            <LightModeIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
