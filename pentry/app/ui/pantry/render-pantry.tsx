"use client";
import { Box, Grid, Typography } from "@mui/material";
import { Item, PantryDto, User } from "@/app/lib/definitions";
import Image from "next/image";
import pantryPic from "@/app/images/shelving.png";
import React from "react";
import { PantryListItemCard } from "@/app/ui/dashboard/cards";
import AddButtonRounded from "@/app/ui/pantry/add-button-rounded";

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
          <AddButtonRounded
            handleOpenAddMenu={handleOpenAddMenu}
            anchorElUser={anchorElUser}
            handleCloseUserMenu={handleCloseUserMenu}
            handleClose={handleClose}
          />
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
        </Box>
      )}
      <AddButtonRounded
        handleOpenAddMenu={handleOpenAddMenu}
        anchorElUser={anchorElUser}
        handleCloseUserMenu={handleCloseUserMenu}
        handleClose={handleClose}
      />
    </Box>
  );
}
