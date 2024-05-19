import Recipes from "@/app/ui/recipes/recipes";
import Box from "@mui/material/Box";
import {Card, CardContent, ImageList, ImageListItem, List, ListItem, Typography} from "@mui/material";
import {fetchRecipes} from "@/app/lib/data";
import {Key} from "react";
import {Recipe, RecipeCollection} from "@/app/lib/definitions";
import {RecipeCard} from "@/app/ui/dashboard/cards";
import openaiTest from "@/app/openai-test";
import OpenAiTest from "@/app/openai-test";

export default async function Page() {
    /* const recipes = [
         {
             "id": 632583,
             "title": "Apple Pie with PB&J Streusel",
             "image": "https://img.spoonacular.com/recipes/632583-312x231.jpg",
             "imageType": "jpg",
             "usedIngredientCount": 2,
             "missedIngredientCount": 4,
             "missedIngredients": [
                 {
                     "id": 2010,
                     "amount": 0.75,
                     "unit": "teaspoon",
                     "unitLong": "teaspoons",
                     "unitShort": "tsp",
                     "aisle": "Spices and Seasonings",
                     "name": "cinnamon",
                     "original": "3/4 teaspoon cinnamon",
                     "originalName": "cinnamon",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg"
                 },
                 {
                     "id": 9152,
                     "amount": 1.0,
                     "unit": "tablespoon",
                     "unitLong": "tablespoon",
                     "unitShort": "Tbsp",
                     "aisle": "Produce",
                     "name": "lemon juice",
                     "original": "1 tablespoon lemon juice",
                     "originalName": "lemon juice",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/lemon-juice.jpg"
                 },
                 {
                     "id": 2025,
                     "amount": 4.0,
                     "unit": "g",
                     "unitLong": "grams",
                     "unitShort": "g",
                     "aisle": "Spices and Seasonings",
                     "name": "nutmeg",
                     "original": "1/2 teaspoon nutmeg (4 g)",
                     "originalName": "1/2 teaspoon nutmeg",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/ground-nutmeg.jpg"
                 },
                 {
                     "id": 1145,
                     "amount": 6.0,
                     "unit": "tablespoons",
                     "unitLong": "tablespoons",
                     "unitShort": "Tbsp",
                     "aisle": "Milk, Eggs, Other Dairy",
                     "name": "butter",
                     "original": "3/4 stick (6 tablespoons) unsalted butter, melted",
                     "originalName": "3/4 stick unsalted butter, melted",
                     "meta": [
                         "unsalted",
                         "melted"
                     ],
                     "extendedName": "unsalted butter",
                     "image": "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg"
                 }
             ],
             "usedIngredients": [
                 {
                     "id": 1109003,
                     "amount": 1.0,
                     "unit": "",
                     "unitLong": "",
                     "unitShort": "",
                     "aisle": "Produce",
                     "name": "gala apple",
                     "original": "1 gala apple",
                     "originalName": "gala apple",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/apple.jpg"
                 },
                 {
                     "id": 1089003,
                     "amount": 1.0,
                     "unit": "",
                     "unitLong": "",
                     "unitShort": "",
                     "aisle": "Produce",
                     "name": "granny smith apple",
                     "original": "1 granny smith apple",
                     "originalName": "granny smith apple",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/grannysmith-apple.png"
                 }
             ],
             "unusedIngredients": [],
             "likes": 1
         },
         {
             "id": 640352,
             "title": "Cranberry Apple Crisp",
             "image": "https://img.spoonacular.com/recipes/640352-312x231.jpg",
             "imageType": "jpg",
             "usedIngredientCount": 1,
             "missedIngredientCount": 3,
             "missedIngredients": [
                 {
                     "id": 9078,
                     "amount": 2.0,
                     "unit": "cups",
                     "unitLong": "cups",
                     "unitShort": "cup",
                     "aisle": "Produce",
                     "name": "cranberries",
                     "original": "2 cups fresh cranberries",
                     "originalName": "fresh cranberries",
                     "meta": [
                         "fresh"
                     ],
                     "extendedName": "fresh cranberries",
                     "image": "https://img.spoonacular.com/ingredients_100x100/cranberries.jpg"
                 },
                 {
                     "id": 1145,
                     "amount": 4.0,
                     "unit": "Tbs",
                     "unitLong": "Tbs",
                     "unitShort": "Tbs",
                     "aisle": "Milk, Eggs, Other Dairy",
                     "name": "butter",
                     "original": "1/2 stick (4 Tbs) unsalted butter, cut into cubes",
                     "originalName": "1/2 stick unsalted butter, cut into cubes",
                     "meta": [
                         "unsalted",
                         "cut into cubes"
                     ],
                     "extendedName": "unsalted butter",
                     "image": "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg"
                 },
                 {
                     "id": 8120,
                     "amount": 1.5,
                     "unit": "cups",
                     "unitLong": "cups",
                     "unitShort": "cup",
                     "aisle": "Cereal",
                     "name": "regular oats",
                     "original": "1 1/2 cups regular oats (not quick-cooking)",
                     "originalName": "regular oats (not quick-cooking)",
                     "meta": [
                         "(not quick-cooking)"
                     ],
                     "image": "https://img.spoonacular.com/ingredients_100x100/rolled-oats.jpg"
                 }
             ],
             "usedIngredients": [
                 {
                     "id": 1089003,
                     "amount": 4.0,
                     "unit": "cups",
                     "unitLong": "cups",
                     "unitShort": "cup",
                     "aisle": "Produce",
                     "name": "granny smith apples",
                     "original": "4 cups Granny Smith apples, chopped into ½ inch chunks",
                     "originalName": "Granny Smith apples, chopped into ½ inch chunks",
                     "meta": [
                         "chopped"
                     ],
                     "image": "https://img.spoonacular.com/ingredients_100x100/grannysmith-apple.png"
                 }
             ],
             "unusedIngredients": [],
             "likes": 11
         },
         {
             "id": 632660,
             "title": "Apricot Glazed Apple Tart",
             "image": "https://img.spoonacular.com/recipes/632660-312x231.jpg",
             "imageType": "jpg",
             "usedIngredientCount": 1,
             "missedIngredientCount": 3,
             "missedIngredients": [
                 {
                     "id": 1145,
                     "amount": 1.5,
                     "unit": "sticks",
                     "unitLong": "sticks",
                     "unitShort": "sticks",
                     "aisle": "Milk, Eggs, Other Dairy",
                     "name": "butter butter",
                     "original": "1 1/2 sticks cold unsalted butter cold unsalted butter<",
                     "originalName": "cold unsalted butter cold unsalted butter",
                     "meta": [
                         "unsalted",
                         "cold"
                     ],
                     "extendedName": "unsalted butter butter",
                     "image": "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg"
                 },
                 {
                     "id": 2010,
                     "amount": 2.0,
                     "unit": "teaspoons",
                     "unitLong": "teaspoons",
                     "unitShort": "tsp",
                     "aisle": "Spices and Seasonings",
                     "name": "cinnamon",
                     "original": "2 teaspoons cinnamon",
                     "originalName": "cinnamon",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg"
                 },
                 {
                     "id": 19719,
                     "amount": 2.0,
                     "unit": "tablespoons",
                     "unitLong": "tablespoons",
                     "unitShort": "Tbsp",
                     "aisle": "Nut butters, Jams, and Honey",
                     "name": "apricot preserves",
                     "original": "2 tablespoons apricot preserves, melted and strained",
                     "originalName": "apricot preserves, melted and strained",
                     "meta": [
                         "melted"
                     ],
                     "image": "https://img.spoonacular.com/ingredients_100x100/apricot-jam.jpg"
                 }
             ],
             "usedIngredients": [
                 {
                     "id": 1079003,
                     "amount": 4.0,
                     "unit": "large",
                     "unitLong": "larges",
                     "unitShort": "large",
                     "aisle": "Produce",
                     "name": "apples",
                     "original": "4 larges red apples, such as Golden Delicious, peeled, cored and cut into 1/4-inch-thick slices",
                     "originalName": "s red apples, such as Golden Delicious, peeled, cored and cut into 1/4-inch-thick slices",
                     "meta": [
                         "red",
                         " such as golden delicious, peeled, cored and cut into 1/4-inch-thick slices"
                     ],
                     "extendedName": "red apples",
                     "image": "https://img.spoonacular.com/ingredients_100x100/red-delicious-apples.png"
                 }
             ],
             "unusedIngredients": [],
             "likes": 3
         },
         {
             "id": 641803,
             "title": "Easy & Delish! ~ Apple Crumble",
             "image": "https://img.spoonacular.com/recipes/641803-312x231.jpg",
             "imageType": "jpg",
             "usedIngredientCount": 1,
             "missedIngredientCount": 3,
             "missedIngredients": [
                 {
                     "id": 1001,
                     "amount": 0.75,
                     "unit": "stick",
                     "unitLong": "sticks",
                     "unitShort": "stick",
                     "aisle": "Milk, Eggs, Other Dairy",
                     "name": "butter",
                     "original": "3/4 stick of butter",
                     "originalName": "butter",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg"
                 },
                 {
                     "id": 2011,
                     "amount": 1.0,
                     "unit": "Dash",
                     "unitLong": "Dash",
                     "unitShort": "Dash",
                     "aisle": "Spices and Seasonings",
                     "name": "ground cloves",
                     "original": "Dash of ground cloves",
                     "originalName": "ground cloves",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/cloves.jpg"
                 },
                 {
                     "id": 9156,
                     "amount": 1.0,
                     "unit": "",
                     "unitLong": "",
                     "unitShort": "",
                     "aisle": "Produce",
                     "name": "lemon zest",
                     "original": "1 Zest of lemon",
                     "originalName": "Zest of lemon",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/zest-lemon.jpg"
                 }
             ],
             "usedIngredients": [
                 {
                     "id": 9003,
                     "amount": 3.0,
                     "unit": "",
                     "unitLong": "",
                     "unitShort": "",
                     "aisle": "Produce",
                     "name": "apples",
                     "original": "3 apples – sliced",
                     "originalName": "apples – sliced",
                     "meta": [
                         "sliced"
                     ],
                     "image": "https://img.spoonacular.com/ingredients_100x100/apple.jpg"
                 }
             ],
             "unusedIngredients": [],
             "likes": 1
         },
         {
             "id": 73420,
             "title": "Apple Or Peach Strudel",
             "image": "https://img.spoonacular.com/recipes/73420-312x231.jpg",
             "imageType": "jpg",
             "usedIngredientCount": 1,
             "missedIngredientCount": 3,
             "missedIngredients": [
                 {
                     "id": 18369,
                     "amount": 1.0,
                     "unit": "tsp",
                     "unitLong": "teaspoon",
                     "unitShort": "tsp",
                     "aisle": "Baking",
                     "name": "baking powder",
                     "original": "1 tsp baking powder",
                     "originalName": "baking powder",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/white-powder.jpg"
                 },
                 {
                     "id": 2010,
                     "amount": 1.0,
                     "unit": "tsp",
                     "unitLong": "teaspoon",
                     "unitShort": "tsp",
                     "aisle": "Spices and Seasonings",
                     "name": "cinnamon",
                     "original": "1 tsp cinnamon",
                     "originalName": "cinnamon",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg"
                 },
                 {
                     "id": 1123,
                     "amount": 1.0,
                     "unit": "",
                     "unitLong": "",
                     "unitShort": "",
                     "aisle": "Milk, Eggs, Other Dairy",
                     "name": "egg",
                     "original": "1 egg",
                     "originalName": "egg",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/egg.png"
                 }
             ],
             "usedIngredients": [
                 {
                     "id": 9003,
                     "amount": 6.0,
                     "unit": "large",
                     "unitLong": "larges",
                     "unitShort": "large",
                     "aisle": "Produce",
                     "name": "baking apples",
                     "original": "6 large baking apples",
                     "originalName": "baking apples",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/apple.jpg"
                 }
             ],
             "unusedIngredients": [],
             "likes": 0
         },
         {
             "id": 775666,
             "title": "Easy Homemade Apple Fritters",
             "image": "https://img.spoonacular.com/recipes/775666-312x231.jpg",
             "imageType": "jpg",
             "usedIngredientCount": 1,
             "missedIngredientCount": 4,
             "missedIngredients": [
                 {
                     "id": 18369,
                     "amount": 1.5,
                     "unit": "teaspoons",
                     "unitLong": "teaspoons",
                     "unitShort": "tsp",
                     "aisle": "Baking",
                     "name": "baking powder",
                     "original": "1 1/2 teaspoons baking powder",
                     "originalName": "baking powder",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/white-powder.jpg"
                 },
                 {
                     "id": 2010,
                     "amount": 1.0,
                     "unit": "teaspoon",
                     "unitLong": "teaspoon",
                     "unitShort": "tsp",
                     "aisle": "Spices and Seasonings",
                     "name": "cinnamon",
                     "original": "1 teaspoon cinnamon",
                     "originalName": "cinnamon",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg"
                 },
                 {
                     "id": 1123,
                     "amount": 1.0,
                     "unit": "",
                     "unitLong": "",
                     "unitShort": "",
                     "aisle": "Milk, Eggs, Other Dairy",
                     "name": "egg",
                     "original": "1 egg",
                     "originalName": "egg",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/egg.png"
                 },
                 {
                     "id": 1077,
                     "amount": 0.33333334,
                     "unit": "cup",
                     "unitLong": "cups",
                     "unitShort": "cup",
                     "aisle": "Milk, Eggs, Other Dairy",
                     "name": "milk",
                     "original": "1/3 cup milk",
                     "originalName": "milk",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/milk.png"
                 }
             ],
             "usedIngredients": [
                 {
                     "id": 9003,
                     "amount": 1.0,
                     "unit": "cup",
                     "unitLong": "cup",
                     "unitShort": "cup",
                     "aisle": "Produce",
                     "name": "apple",
                     "original": "1 cup chopped apple",
                     "originalName": "chopped apple",
                     "meta": [
                         "chopped"
                     ],
                     "image": "https://img.spoonacular.com/ingredients_100x100/apple.jpg"
                 }
             ],
             "unusedIngredients": [],
             "likes": 1334
         },
         {
             "id": 157103,
             "title": "Apple Cinnamon Blondies",
             "image": "https://img.spoonacular.com/recipes/157103-312x231.jpg",
             "imageType": "jpg",
             "usedIngredientCount": 1,
             "missedIngredientCount": 4,
             "missedIngredients": [
                 {
                     "id": 1001,
                     "amount": 0.5,
                     "unit": "cup",
                     "unitLong": "cups",
                     "unitShort": "cup",
                     "aisle": "Milk, Eggs, Other Dairy",
                     "name": "butter",
                     "original": "1/2 cup butter, melted",
                     "originalName": "butter, melted",
                     "meta": [
                         "melted"
                     ],
                     "image": "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg"
                 },
                 {
                     "id": 2010,
                     "amount": 1.0,
                     "unit": "tsp",
                     "unitLong": "teaspoon",
                     "unitShort": "tsp",
                     "aisle": "Spices and Seasonings",
                     "name": "cinnamon",
                     "original": "1 tsp. cinnamon",
                     "originalName": "cinnamon",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg"
                 },
                 {
                     "id": 1123,
                     "amount": 1.0,
                     "unit": "",
                     "unitLong": "",
                     "unitShort": "",
                     "aisle": "Milk, Eggs, Other Dairy",
                     "name": "egg",
                     "original": "1 egg",
                     "originalName": "egg",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/egg.png"
                 },
                 {
                     "id": 1052050,
                     "amount": 1.0,
                     "unit": "tsp",
                     "unitLong": "teaspoon",
                     "unitShort": "tsp",
                     "aisle": "Baking",
                     "name": "vanilla",
                     "original": "1 tsp. vanilla (paste or extract)",
                     "originalName": "vanilla (paste or extract)",
                     "meta": [
                         "(paste or extract)"
                     ],
                     "image": "https://img.spoonacular.com/ingredients_100x100/vanilla.jpg"
                 }
             ],
             "usedIngredients": [
                 {
                     "id": 9003,
                     "amount": 0.5,
                     "unit": "cup",
                     "unitLong": "cups",
                     "unitShort": "cup",
                     "aisle": "Produce",
                     "name": "apple",
                     "original": "1/2 cup apple, finely diced",
                     "originalName": "apple, finely diced",
                     "meta": [
                         "diced",
                         "finely"
                     ],
                     "extendedName": "diced apple",
                     "image": "https://img.spoonacular.com/ingredients_100x100/apple.jpg"
                 }
             ],
             "unusedIngredients": [],
             "likes": 0
         },
         {
             "id": 157111,
             "title": "Vegan Baked Apples with Oat Crumble",
             "image": "https://img.spoonacular.com/recipes/157111-312x231.jpg",
             "imageType": "jpg",
             "usedIngredientCount": 1,
             "missedIngredientCount": 4,
             "missedIngredients": [
                 {
                     "id": 2010,
                     "amount": 0.5,
                     "unit": "tsp",
                     "unitLong": "teaspoons",
                     "unitShort": "tsp",
                     "aisle": "Spices and Seasonings",
                     "name": "cinnamon",
                     "original": "½ tsp. cinnamon",
                     "originalName": "cinnamon",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg"
                 },
                 {
                     "id": 10414037,
                     "amount": 3.0,
                     "unit": "tbsp",
                     "unitLong": "tablespoons",
                     "unitShort": "Tbsp",
                     "aisle": "Alcoholic Beverages",
                     "name": "cognac",
                     "original": "3 tbsp. cognac",
                     "originalName": "cognac",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/cognac.jpg"
                 },
                 {
                     "id": 2025,
                     "amount": 0.25,
                     "unit": "tsp",
                     "unitLong": "teaspoons",
                     "unitShort": "tsp",
                     "aisle": "Spices and Seasonings",
                     "name": "nutmeg",
                     "original": "¼ tsp. nutmeg",
                     "originalName": "nutmeg",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/ground-nutmeg.jpg"
                 },
                 {
                     "id": 8120,
                     "amount": 1.0,
                     "unit": "cup",
                     "unitLong": "cup",
                     "unitShort": "cup",
                     "aisle": "Cereal",
                     "name": "oats",
                     "original": "1 cup whole oats",
                     "originalName": "whole oats",
                     "meta": [
                         "whole"
                     ],
                     "extendedName": "whole oats",
                     "image": "https://img.spoonacular.com/ingredients_100x100/rolled-oats.jpg"
                 }
             ],
             "usedIngredients": [
                 {
                     "id": 9003,
                     "amount": 3.0,
                     "unit": "",
                     "unitLong": "",
                     "unitShort": "",
                     "aisle": "Produce",
                     "name": "apples",
                     "original": "3 apples, cored and halved horizontally",
                     "originalName": "apples, cored and halved horizontally",
                     "meta": [
                         "cored",
                         "halved"
                     ],
                     "image": "https://img.spoonacular.com/ingredients_100x100/apple.jpg"
                 }
             ],
             "unusedIngredients": [],
             "likes": 0
         },
         {
             "id": 674272,
             "title": "Grand Apple and Cinnamon Biscuits",
             "image": "https://img.spoonacular.com/recipes/674272-312x231.jpg",
             "imageType": "jpg",
             "usedIngredientCount": 1,
             "missedIngredientCount": 4,
             "missedIngredients": [
                 {
                     "id": 18369,
                     "amount": 1.0,
                     "unit": "Tbsp",
                     "unitLong": "Tbsp",
                     "unitShort": "Tbsp",
                     "aisle": "Baking",
                     "name": "baking powder",
                     "original": "1 Tbsp baking powder",
                     "originalName": "baking powder",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/white-powder.jpg"
                 },
                 {
                     "id": 1001,
                     "amount": 0.33333334,
                     "unit": "cup",
                     "unitLong": "cups",
                     "unitShort": "cup",
                     "aisle": "Milk, Eggs, Other Dairy",
                     "name": "butter",
                     "original": "1/3 cup softened butter",
                     "originalName": "softened butter",
                     "meta": [
                         "softened"
                     ],
                     "image": "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg"
                 },
                 {
                     "id": 1077,
                     "amount": 1.0,
                     "unit": "cup",
                     "unitLong": "cup",
                     "unitShort": "cup",
                     "aisle": "Milk, Eggs, Other Dairy",
                     "name": "milk",
                     "original": "1 cup milk",
                     "originalName": "milk",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/milk.png"
                 },
                 {
                     "id": 93784,
                     "amount": 4.0,
                     "unit": "servings",
                     "unitLong": "servings",
                     "unitShort": "servings",
                     "aisle": "Health Foods",
                     "name": "syrup",
                     "original": "Syrup",
                     "originalName": "Syrup",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/corn-syrup.png"
                 }
             ],
             "usedIngredients": [
                 {
                     "id": 1089003,
                     "amount": 2.0,
                     "unit": "",
                     "unitLong": "",
                     "unitShort": "",
                     "aisle": "Produce",
                     "name": "granny smith apples",
                     "original": "2 Granny Smith Apples (or your favorite type of apple)",
                     "originalName": "Granny Smith Apples (or your favorite type of apple)",
                     "meta": [
                         "your favorite",
                         "(or type of apple)"
                     ],
                     "image": "https://img.spoonacular.com/ingredients_100x100/grannysmith-apple.png"
                 }
             ],
             "unusedIngredients": [],
             "likes": 0
         },
         {
             "id": 632572,
             "title": "Apple Pie",
             "image": "https://img.spoonacular.com/recipes/632572-312x231.jpg",
             "imageType": "jpg",
             "usedIngredientCount": 1,
             "missedIngredientCount": 5,
             "missedIngredients": [
                 {
                     "id": 1001,
                     "amount": 1.0,
                     "unit": "teaspoon",
                     "unitLong": "teaspoon",
                     "unitShort": "tsp",
                     "aisle": "Milk, Eggs, Other Dairy",
                     "name": "butter",
                     "original": "1 teaspoon butter, slightly softened",
                     "originalName": "butter, slightly softened",
                     "meta": [
                         "softened"
                     ],
                     "image": "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg"
                 },
                 {
                     "id": 2010,
                     "amount": 0.5,
                     "unit": "teaspoon",
                     "unitLong": "teaspoons",
                     "unitShort": "tsp",
                     "aisle": "Spices and Seasonings",
                     "name": "cinnamon",
                     "original": "1/2 teaspoon cinnamon",
                     "originalName": "cinnamon",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/cinnamon.jpg"
                 },
                 {
                     "id": 9152,
                     "amount": 8.0,
                     "unit": "servings",
                     "unitLong": "servings",
                     "unitShort": "servings",
                     "aisle": "Produce",
                     "name": "lemon juice",
                     "original": "lemon juice",
                     "originalName": "lemon juice",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/lemon-juice.jpg"
                 },
                 {
                     "id": 2025,
                     "amount": 0.5,
                     "unit": "teaspoon",
                     "unitLong": "teaspoons",
                     "unitShort": "tsp",
                     "aisle": "Spices and Seasonings",
                     "name": "nutmeg",
                     "original": "1/2 teaspoon nutmeg",
                     "originalName": "nutmeg",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/ground-nutmeg.jpg"
                 },
                 {
                     "id": 18334,
                     "amount": 2.0,
                     "unit": "",
                     "unitLong": "",
                     "unitShort": "",
                     "aisle": "Refrigerated",
                     "name": "pie crusts",
                     "original": "2 Pie Crusts",
                     "originalName": "Pie Crusts",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/pie-crust.jpg"
                 }
             ],
             "usedIngredients": [
                 {
                     "id": 1089003,
                     "amount": 13.0,
                     "unit": "large",
                     "unitLong": "larges",
                     "unitShort": "large",
                     "aisle": "Produce",
                     "name": "granny smith apples",
                     "original": "13 large granny smith apples",
                     "originalName": "granny smith apples",
                     "meta": [],
                     "image": "https://img.spoonacular.com/ingredients_100x100/grannysmith-apple.png"
                 }
             ],
             "unusedIngredients": [],
             "likes": 23
         }
     ]*/
    const recipes: RecipeCollection = await fetchRecipes("apple");
    if (!recipes) {
        return <Box>No recipes found</Box>
    }
    console.log('recipes', recipes)
    return (
        <>
            {/*<Typography>
            <OpenAiTest/>
        </Typography>*/}
            <ImageList sx={{width: '100%'}} cols={2}>
                {recipes.map((item: Recipe) => (
                    item && item?.image ?
                        <RecipeCard key={item.image} recipe={item}/> : null

                ))}
            </ImageList></>
    )
}