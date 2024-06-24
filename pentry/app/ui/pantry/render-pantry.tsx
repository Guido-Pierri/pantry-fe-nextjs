"use client";
import { Box, Grid, Menu, Tooltip, Typography } from "@mui/material";
import { Item, PantryDto, User } from "@/app/lib/definitions";
import Link from "@mui/material/Link";
import Image from "next/image";
import pantryPic from "@/app/images/shelving.png";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { PantryListItemCard } from "@/app/ui/dashboard/cards";
import MenuItem from "@mui/material/MenuItem";

export default function RenderPantry({
  pantry,
  user,
}: {
  pantry: PantryDto;
  user: User;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenAddMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      {pantry && pantry.items.length > 0 ? (
        <Grid
          container
          spacing={2}
          alignItems="stretch"
          justifyContent={"flex-start"}
        >
          <Grid item xs={12}>
            <Typography variant={"h6"} sx={{ mt: 0, mb: 2 }}>
              Your pantry
            </Typography>
          </Grid>
          {pantry.items.map((item: Item) => (
            <Grid item xs={6} sm={4} md={3} key={item.id}>
              <PantryListItemCard item={item} user={user}></PantryListItemCard>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            Your pantry is empty
          </Typography>
          <Image src={pantryPic} alt="Empty pantry" priority />
          <Tooltip title={"Add items to your pantry"}>
            <Fab
              variant={"circular"}
              color={"primary"}
              size={"large"}
              sx={{ position: "absolute", right: "5rem", bottom: "1rem" }}
              onClick={handleOpenAddMenu}
            >
              +
            </Fab>
          </Tooltip>
          <Menu
            slotProps={{
              paper: {
                sx: { backgroundColor: "#00000000", boxShadow: "none" },
              },
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            keepMounted
            transformOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <Link href={"/dashboard/pantry/add-item"}>
              <MenuItem onClick={handleClose}>
                <Fab
                  size={"small"}
                  color="primary"
                  aria-label="add"
                  variant={"extended"}
                >
                  <AddIcon />
                  Add items
                </Fab>
              </MenuItem>
            </Link>
            <MenuItem onClick={handleClose}>
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
      )}
    </Box>
  );
}
