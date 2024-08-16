"use client";
import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import { Ingredient, Recipe } from "@/app/lib/definitions";
import { useTranslation } from "react-i18next";

export default function RenderRecipe({ recipe }: { recipe: Recipe }) {
  const { t } = useTranslation();
  if (!recipe) return null;
  return (
    <Card>
      <CardMedia>
        {recipe?.image ? (
          <Image
            src={recipe.image}
            width={600}
            height={500}
            alt={recipe.title}
          />
        ) : (
          <BrokenImageIcon />
        )}
      </CardMedia>
      <CardContent>
        <Typography variant={"h5"}>{recipe.title}</Typography>
        <Typography variant={"h6"} mt={"1rem"}></Typography>
        <List dense={true}>
          {recipe?.extendedIngredients.map((ingredient: Ingredient) => (
            <ListItem key={ingredient.id}>
              <ListItemAvatar>
                {ingredient?.image ? (
                  <Avatar
                    variant={"square"}
                    src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                    alt={ingredient.name}
                  />
                ) : (
                  <BrokenImageIcon />
                )}
              </ListItemAvatar>
              <ListItemText>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant={"h6"}>{t("text_instructions")}</Typography>
          </Grid>
          {recipe?.analyzedInstructions[0]?.steps.map(
            (
              step: {
                step: string;
              },
              index: number,
            ) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>{index + 1}</Avatar>
                </ListItemAvatar>
                <ListItemText>{step.step}</ListItemText>
              </ListItem>
            ),
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
