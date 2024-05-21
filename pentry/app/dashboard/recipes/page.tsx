import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import {fetchMyKitchenRecipes, fetchPantryCategories} from "@/app/lib/data";
import {MyKitchenRecipesApiRecipe} from "@/app/lib/definitions";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "@mui/material/Link";
import Recipes from "@/app/ui/recipes/recipes";

export default async function Page() {

    let ingredientsArray = await fetchPantryCategories();
    console.log('ingredientsArray', ingredientsArray)
    const ingredientsFiltered = (ingredientsArray).filter((item) => !item.includes(' '))
    console.log('ingredientsFiltered', ingredientsFiltered)
    let randomIngredients: string[] = [];

    if (ingredientsFiltered && ingredientsFiltered?.length > 3) {
        for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random() * ingredientsFiltered.length);
            if (!randomIngredients.includes(ingredientsFiltered[randomIndex])) {
                randomIngredients.push(ingredientsFiltered[randomIndex]);
            } else {
                i--; // decrement the counter to ensure we get 3 unique elements
            }
        }
    } else {
        randomIngredients = ingredientsFiltered;
    }
    console.log('randomIngredients', randomIngredients)
    const recipes = await fetchMyKitchenRecipes(randomIngredients);

    console.log('recipes', recipes?.data?.recipes)
    return (
        <Recipes recipes={recipes?.data?.recipes}/>
    )
}