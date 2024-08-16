import { auth } from "@/auth";
import { fetchRecipeById } from "@/app/lib/data";
import RenderRecipe from "@/app/ui/recipes/render-recipe";
import { Recipe } from "@/app/lib/definitions";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.token) {
    return null;
  }
  const recipe: Recipe = await fetchRecipeById(params.id);
  if (!recipe) return null;
  console.log("recipe", recipe);
  console.log("analyzedInstructions", recipe.analyzedInstructions);
  return (
    //TODO: break out into components ie RenderRecipe and RecipeCard
    //TODO: add azure translation for ingredients and instructions
    <RenderRecipe recipe={recipe}></RenderRecipe>
  );
}
