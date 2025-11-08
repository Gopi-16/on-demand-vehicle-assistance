import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <AppBar position="sticky" sx={{ background: "#1976d2" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          OnRoadAssist
        </Typography>
        <Box>
          { [
            ["Home", ""],
            ["Services", "services"],
            ["Register", "register"],
            ["About", "about"],
            ["Login", "login"],
            ["Profile", "profile"]
          ].map(([label, route]) => (
            <Button key={route} color="inherit" ><Link to={`${route}`} style={{color:"white"}}>
              {label}
            </Link>
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
