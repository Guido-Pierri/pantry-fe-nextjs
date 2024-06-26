import { Box, Grid, Typography } from "@mui/material";
import { Item, PantryDto, User } from "@/app/lib/definitions";
import Image from "next/image";
import pantryPic from "@/app/images/3047332_32705.svg";
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
            <Typography
              variant="h5"
              component="div"
              color={"primary"}
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
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
          <Typography
            variant="h5"
            component="div"
            color={"primary"}
            sx={{ fontWeight: "bold" }}
          >
            Your pantry is empty
          </Typography>
          <Image src={pantryPic} alt="Empty pantry" priority />
        </Box>
      )}
      <AddButtonRounded />
    </Box>
  );
}
