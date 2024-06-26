"use client";
import { Box, Menu, Tooltip } from "@mui/material";
import Fab from "@mui/material/Fab";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export default function AddButtonRounded() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElAddButton, setanchorElAddButton] =
    React.useState<null | HTMLElement>(null);
  const [rotation, setRotation] = React.useState(0);

  const handleOpenAddMenu = (event: React.MouseEvent<HTMLElement>) => {
    setanchorElAddButton(event.currentTarget);
    setRotation(45);
  };
  const handleCloseUserMenu = () => {
    setanchorElAddButton(null);
    setRotation(0);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Tooltip title={"Add items to your pantry"}>
        <Fab
          variant={"circular"}
          color={"primary"}
          size={"large"}
          sx={{ position: "absolute", right: "1rem", bottom: "1rem" }}
          onClick={handleOpenAddMenu}
        >
          <AddIcon
            sx={{
              transform: `rotate(${rotation}deg)`,
              transition: "transform 0.2s ease-in-out", // Smooth transition
            }}
          />
        </Fab>
      </Tooltip>
      <Menu
        slotProps={{
          paper: {
            sx: { backgroundColor: "#00000000", boxShadow: "none" },
          },
        }}
        id="menu-fab"
        anchorEl={anchorElAddButton}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={Boolean(anchorElAddButton)}
        onClose={handleCloseUserMenu}
      >
        <Link href={"/dashboard/pantry/add-item"}>
          <MenuItem onClick={handleClose} sx={{ justifyContent: "flex-end" }}>
            <Fab
              size={"small"}
              color="primary"
              aria-label="add"
              variant={"extended"}
            >
              <AddIcon />
              Create item
            </Fab>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleClose} sx={{ justifyContent: "flex-end" }}>
          <Link href={"/dashboard/search"}>
            <Fab
              size={"small"}
              color={"primary"}
              variant="extended"
              aria-label={"search"}
            >
              <SearchIcon />
              Search for an item
            </Fab>
          </Link>
        </MenuItem>
      </Menu>
    </Box>
  );
}
