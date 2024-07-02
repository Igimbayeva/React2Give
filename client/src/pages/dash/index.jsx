import Header from "../../components/header";
import { useTheme, Box, Container } from "@mui/material";
import { tokens } from "../../theme";
import React from "react";
//HEADING ON THE PAGE
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="center">
        <Header title="Welcome" />
      </Box>
      {/*PREVIEW GRIDS*/}
      <Box
        display="grid"
        gridTemplateColumns="repeat (12, 1fr) "
        gridAutoRows="140px"
        gap="20-px"
      >
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        ></Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        ></Box>
        {/*row 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        ></Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        ></Box>
        {/*row 3 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        ></Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        ></Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
