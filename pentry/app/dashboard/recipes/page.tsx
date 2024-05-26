import {fetchPantryItemNames, fetchSpoonacularRecipes} from "@/app/lib/data";
import Recipes from "@/app/ui/recipes/recipes";
import {auth} from "@/auth";

export default async function Page() {
    const session = await auth()
    if (!session?.token) {
        return null
    }
    const id = session?.user?.id;
    let ingredientsArray = await fetchPantryItemNames(id);
    console.log('ingredientsArray', ingredientsArray)
    const ingredientsFiltered = (ingredientsArray).filter((item) => !item.includes(' '))
    console.log('ingredientsFiltered', ingredientsFiltered)
    let randomIngredients: string[] = [];
    const length = ingredientsFiltered?.length;
    if (ingredientsFiltered && ingredientsFiltered?.length > 3) {
        for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random() * length);
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
    const recipes = await fetchSpoonacularRecipes(randomIngredients);

    console.log('recipes', recipes)
    return (
        <Recipes recipes={recipes}/>
    )
}