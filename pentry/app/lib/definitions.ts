// This file contains type definitions for your data.ts.
// It describes the shape of the data.ts, and what data.ts type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

declare module "next-auth" {
  interface Session {
    user: User;
    token?: string | null;
    refreshToken?: string;
    provider?: string;
    roles?: string;
  }
}
declare module "next-auth" {
  interface JWT {
    user: User;
  }
}
export type Pantry = {
  id: string;
  userId: string;
  items: Item[];
};
export type PantryDto = {
  id: number;
  userId: number;
  items: Item[];
};

export type Item = {
  id: string;
  name: string;
  quantity: number;
  expirationDate: string;
  gtin?: string;
  brand: string;
  category: string;
  image: string;
  userId: string;
};
export type CustomItem = {
  id: string;
  name: string;
  gtin: string;
  quantity: number;
  expirationDate: string;
  brand: string;
  category: string;
  image: string;
  userId: string;
};
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  password: string;
  accessToken?: string;
  roles: string;
  authProvider: string;
  token?: string;
  isFirstTimeUser: boolean;
};
export type ItemForm = {
  id: string;
  name: string;
  quantity: number;
  expirationDate: string;
  gtin: string;
  brand: string;
  category: string;
  image: string;
  userId: string;
};
export type SearchItem = {
  name: string;
  gtin: string;
  image: string;
  brand: string;
  category: string;
  bruteWeight: string;
  drainedWeight: string;
  ingredients: string;
  productClassifications: string;
  size: string;
};
export type SearchPage = {
  content: SearchItem[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  numberOfElements: number;
  empty: boolean;
};

export class DatabaseError extends Error {
  constructor(
    message: string,
    public code: number,
  ) {
    super(message);
    this.name = "DatabaseError";
  }
}

export type UserField = {
  id: string;
  firstName: string;
  lastName: string;
};

export interface MyKitchenRecipesApiResponse {
  data: {
    recipes: MyKitchenRecipesApiRecipe[];
  };
}

export interface MyKitchenRecipesApiRecipe {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  source: string;
  rank: number;
}

export type Recipe = {
  id: number;
  title: string;
  image: string;
  imageType: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: Ingredient[];
  usedIngredients: Ingredient[];
  unusedIngredients: any[]; // Adjust the type accordingly if there are more details available for unused ingredients
  extendedIngredients: Ingredient[];
  analyzedInstructions: any[]; // Adjust the type accordingly if there are more details available for analyzed instructions
  likes: number;
};

export type Ingredient = {
  id: number;
  amount: number;
  unit: string;
  unitLong: string;
  unitShort: string;
  aisle: string;
  name: string;
  original: string;
  originalName: string;
  meta: string[];
  image: string;
  extendedName?: string; // Optional field for extended names where applicable
};

export type RecipeCollection = Recipe[];

export type Translation = {
  text: string;
  to: string;
};

export type TranslationResponse = {
  translations: Translation[];
}[];

export type ExtendedIngredient = {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
    metric: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
  };
};

export type AnalyzedInstructionStep = {
  number: number;
  step: string;
  ingredients: {
    id: number;
    name: string;
    localizedName: string;
    image: string;
  }[];
  equipment: any[];
  length?: {
    number: number;
    unit: string;
  };
};

export type AnalyzedInstruction = {
  name: string;
  steps: AnalyzedInstructionStep[];
};

export type RecipeInformation = {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number | null;
  cookingMinutes: number | null;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: ExtendedIngredient[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: any[];
  instructions: string;
  analyzedInstructions: AnalyzedInstruction[];
  originalId: number | null;
  spoonacularScore: number;
  spoonacularSourceUrl: string;
};
