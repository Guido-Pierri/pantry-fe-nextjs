"use client";

import { Box, Grid, Typography } from "@mui/material";
import { Item, PantryDto, User } from "@/app/lib/definitions";
import Image from "next/image";
import pantryPic from "@/app/images/3047332_32705.svg";
import React from "react";
import { PantryListItemCard } from "@/app/ui/dashboard/cards";
import AddButtonRounded from "@/app/ui/pantry/add-button-rounded";
import { useTranslation } from "react-i18next";

export default function RenderPantry({
  pantry,
  user,
}: {
  pantry: PantryDto;
  user: User;
}) {
  const { t } = useTranslation();
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
              {t("text_your_pantry")}
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
          <Image src={pantryPic} alt="Empty pantry" priority height={500} />
          <Typography
            variant="h5"
            component="div"
            color={"primary"}
            sx={{ fontWeight: "bold" }}
          >
            {t("text_your_pantry_empty")}
          </Typography>
          <Typography variant={"caption"} component={"div"} color={"primary"}>
            {t("text_click")}
          </Typography>
        </Box>
      )}
      <AddButtonRounded position={"absolute"} />
    </Box>
  );
}
