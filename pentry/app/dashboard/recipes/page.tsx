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

export default async function Page() {

    let ingredientsArray = await fetchPantryCategories();
    console.log('ingredientsArray', ingredientsArray)
    const ingredientsFiltered = (ingredientsArray).filter((item) => !item.includes(' '))
    console.log('ingredientsFiltered', ingredientsFiltered)
    const ingredientString = ingredientsArray?.map((item) => item).join('');
    console.log('ingredientString', ingredientString)
    const nrOfElements = (ingredientsArray).length + 1;
    const randomIndex = Math.floor(Math.random() * nrOfElements);
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
    if (!recipes) {
        return <Box>No recipes found</Box>
    }
    console.log('recipes', (recipes)?.data?.recipes)
    return (
        <Grid container spacing={2} columns={2} rowSpacing={1}>
            <Grid item xs={12} md={6}>
                <Typography sx={{mt: 0, mb: 2}} variant="h6" component="div">
                    Recipes based on your pantry items
                </Typography>
                <List dense={true}>
                    {recipes?.data?.recipes?.map((item: MyKitchenRecipesApiRecipe) => (
                        item && item?.image ?
                            <Link key={item.id} href={item.url}><Card
                                sx={{marginBottom: '1rem', textDecoration: 'none',}}>
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