"use client";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Recipe, RecipeCollection } from "@/app/lib/definitions";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { Link } from "@mui/material";
import AddButtonRounded from "@/app/ui/pantry/add-button-rounded";
import React from "react";
import recipeImg from "@/app/images/v19-pla6.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Recipes({ recipes }: { recipes: RecipeCollection }) {
  const { t } = useTranslation();
  return recipes && recipes?.length > 0 ? (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          sx={{ mt: 0, mb: 2 }}
          variant="h6"
          component="div"
          color={"primary"}
        >
          {t("text_recipes")}
        </Typography>
      </Grid>
      {recipes?.map((item: Recipe) => (
        <Grid item xs={12} sm={4} md={3} key={item.id}>
          {item && item?.image ? (
            <Card sx={{ marginBottom: "1rem" }}>
              <CardActionArea>
                <Link
                  href={`/dashboard/recipes/${item.id}`}
                  color={"black"}
                  underline={"none"}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="h6" color="text.primary">
                      {t("text_ingredients")}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.usedIngredients
                        .map((ingredient) => ingredient.name)
                        .join(", ")}
                    </Typography>
                  </CardContent>
                </Link>
              </CardActionArea>
            </Card>
          ) : null}
        </Grid>
      ))}
    </Grid>
  ) : (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      <Typography
        variant={"h5"}
        color={"primary"}
        fontWeight={"bolder"}
        sx={{ marginBottom: "1rem" }}
      >
        {t("text_no_recipes")}{" "}
      </Typography>
      <Image src={recipeImg} alt={"recipe image"} priority height={500} />
      <AddButtonRounded position={"absolute"} />{" "}
    </Box>
  );
}
