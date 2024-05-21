import {fetchMyKitchenRecipes, fetchPantryCategories} from "@/app/lib/data";
import Recipes from "@/app/ui/recipes/recipes";

export default async function Page() {

    let ingredientsArray = await fetchPantryCategories();
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
    const recipes = await fetchMyKitchenRecipes(randomIngredients);

    console.log('recipes', recipes?.data?.recipes)
    return (
        <Recipes recipes={recipes?.data?.recipes}/>
    )
}