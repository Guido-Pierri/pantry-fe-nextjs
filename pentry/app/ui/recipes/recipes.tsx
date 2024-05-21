import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import {MyKitchenRecipesApiRecipe} from "@/app/lib/definitions";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

export default function Recipes({recipes}: { recipes: MyKitchenRecipesApiRecipe[] }) {
    if (!recipes) {
        return <Box>No recipes found</Box>
    }
    return (
        <Grid container spacing={2} columns={2} rowSpacing={1}>
            <Grid item xs={12} md={6}>
                <Typography sx={{mt: 0, mb: 2}} variant="h6" component="div">
                    Recipes based on your pantry items
                </Typography>
                <List dense={true}>
                    {recipes?.map((item: MyKitchenRecipesApiRecipe) => (
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