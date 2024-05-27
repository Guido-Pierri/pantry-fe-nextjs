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
    Typography
} from "@mui/material";
import {auth} from "@/auth";
import {fetchRecipeById} from "@/app/lib/data";
import Image from "next/image";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";

export default async function Page({params}: { params: { id: string } }) {
    const session = await auth()
    if (!session?.token) {
        return null
    }
    const recipe = await fetchRecipeById(params.id);
    if (!recipe) return null
    console.log('recipe', recipe)
    console.log('analyzedInstructions', recipe.analyzedInstructions)
    return (
        <Card>
            <CardMedia>

                {recipe?.image ? <Image src={recipe.image} width={600} height={500} alt={recipe.title}/> :
                    <BrokenImageIcon/>}
            </CardMedia>
            <CardContent>
                <Typography variant={'h5'}>{recipe.title}</Typography>
                <Typography variant={'h6'} mt={'1rem'}>Ingredients</Typography>
                <List>
                    {recipe?.extendedIngredients.map((ingredient) => (

                        <ListItem key={ingredient.id}>
                            <ListItemAvatar>
                                {ingredient?.image ? <Avatar variant={'square'}
                                                             src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                                                             alt={ingredient.name}/> : <BrokenImageIcon/>}

                            </ListItemAvatar>
                            <ListItemText>{ingredient.amount} {' '}{ingredient.unit}{' '}{ingredient.name}</ListItemText>
                        </ListItem>
                    ))}
                </List>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography variant={'h5'}>Instructions</Typography>
                    </Grid>
                    {recipe?.analyzedInstructions[0]?.steps.map((step, index) => (
                        <ListItem key={index}>
                            <ListItemText>{step.step}</ListItemText>
                        </ListItem>
                    ))}
                </Grid>
            </CardContent>

        </Card>
    )
}