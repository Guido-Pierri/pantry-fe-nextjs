import Box from "@mui/material/Box";
import {Avatar, Grid, ImageList, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {fetchMyKitchenRecipes, fetchPantryCategories, fetchRecipes, translateText} from "@/app/lib/data";
import {MyKitchenRecipesApiRecipe} from "@/app/lib/definitions";
import {RecipeCard} from "@/app/ui/dashboard/cards";
import FolderIcon from '@mui/icons-material/Folder';
import Image from "next/image";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import {router} from "next/client";
import Link from "next/link";

export default async function Page() {

    let ingredientsArray = await fetchPantryCategories();
    console.log('ingredientsArray', ingredientsArray)
    const ingredientsFiltered = (ingredientsArray).filter((item) => !item.includes(' '))
    console.log('ingredientsFiltered', ingredientsFiltered)
    const ingredientString = ingredientsArray?.map((item) => item).join('');
    console.log('ingredientString', ingredientString)
    const nrOfElements = (ingredientsArray).length + 1;
    const randomIndex = Math.floor(Math.random() * nrOfElements);
    const selectedIngredient = ingredientsArray[randomIndex]?.toLowerCase().replace(/\s+/g, '');
    console.log('selectedIngredients', selectedIngredient)
    const recipes = await fetchMyKitchenRecipes(ingredientsFiltered);
    if (!recipes) {
        return <Box>No recipes found</Box>
    }
    console.log('recipes', recipes)
    return (
        <Grid container spacing={2} columns={2} rowSpacing={1}>
            <Grid item xs={12} md={6}>
                <Typography sx={{mt: 0, mb: 2}} variant="h6" component="div">
                    Recipes based on your pantry items
                </Typography>
                <List dense={true}>
                    {recipes?.data?.recipes?.map((item: MyKitchenRecipesApiRecipe) => (
                        item && item?.image ?
                            <Link key={item.id} href={item.url}><Card>
                                <CardActionArea>

                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.image}
                                        alt={item.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card></Link>
                            : null

                    ))}
                </List>
            </Grid>
        </Grid>
    )
}