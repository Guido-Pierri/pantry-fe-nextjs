import {Card, CardContent, CardMedia, ListItem, ListItemText, Typography} from "@mui/material";
import {auth} from "@/auth";
import {fetchRecipeById} from "@/app/lib/data";

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

                {recipe?.image && <img src={recipe.image} alt={recipe.title}/>}
            </CardMedia>
            <CardContent>
                <Typography variant={'h5'}>{recipe.title}</Typography>
                <Typography variant={'h6'}>Ingredients</Typography>
                {recipe?.extendedIngredients.map((ingredient) => (
                    <ListItem key={ingredient.id}>
                        <ListItemText>{ingredient.amount} {' '}{ingredient.unit}{' '}{ingredient.name}</ListItemText>
                    </ListItem>
                ))}
                <Typography variant={'h5'}>Instructions</Typography>
                {recipe?.analyzedInstructions[0]?.steps.map((step, index) => (
                    <ListItem key={index}>
                        <ListItemText>{step.step}</ListItemText>
                    </ListItem>
                ))}
            </CardContent>

        </Card>
    )
}