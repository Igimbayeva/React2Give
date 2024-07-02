import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeIcon from "@mui/icons-material/Home";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PersonIcon from "@mui/icons-material/Person";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.indigo[900],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dash");
  return (
    <Sidebar collapsed={isCollapsed}>
      <Menu iconShape="square">
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <PersonIcon /> : undefined}
          style={{
            margin: "10px 0 20px 0",
            color: colors.Neutral[100],
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="15px"
            >
              <Typography variant="h3" color={colors.Neutral[100]}>
                Personal
              </Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <PersonIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {!isCollapsed && (
          <Box mb="25px">
            <Box textAlign="center">
              <Typography
                variant="h2"
                color={colors.Neutral[100]}
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                React2Give
              </Typography>
              <Typography variant="h5" color={colors.Secondary[200]}>
                MakeAllThingsPosibble
              </Typography>
            </Box>
          </Box>
        )}

        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
          <Item
            title="Home"
            to="/"
            icon={<HomeIcon />}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography
            variant="h6"
            color={colors.Neutral[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Pages
          </Typography>
          <Item
            title="Set Donations"
            to="/SetDonations"
            icon={<VolunteerActivismIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Custom donations"
            to="/CustomDonations"
            icon={<VolunteerActivismIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Custom donations"
            to="/CustomDonations"
            icon={<VolunteerActivismIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Custom donations"
            to="/CustomDonations"
            icon={<VolunteerActivismIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Typography
            variant="h6"
            color={colors.Neutral[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Account
          </Typography>
          <Item
            title="Sign up"
            to="/signup"
            icon={<VolunteerActivismIcon />}
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
      </Menu>
    </Sidebar>
  );
};

export default Sbar;
