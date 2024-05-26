import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {auth} from "@/auth";
import {fetchRecipeById} from "@/app/lib/data";

export default async function Page({params}: { params: { id: string } }) {
    const session = await auth()
    if (!session?.token) {
        return null
    }
    const recipe = await fetchRecipeById(params.id);
    if (!recipe) return null
    return (
        <Box>
            <Typography variant={'h1'}>{recipe.title}</Typography>
            {/*<Typography variant={'h2'}>{recipe?.analyzedInstructions.map((instruction) => <List><ListItem
                key={instruction.name}><ListItemText>{instruction.name}</ListItemText></ListItem></List>)}</Typography>
*/}
        </Box>
    )
}