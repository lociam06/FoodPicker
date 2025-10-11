import type { Recipe } from "./Recipe";
import type { Ingredient } from "./Ingredient";
import type { Unit } from "./Unit";

export interface RecipeIngredient{
    id: number;
    quantity: number;
    unitId: number;
    unit?: Unit;
    is_optional: boolean;
    recipeId: number;
    recipe?: Recipe;
    ingredientId: number;
    ingredient?: Ingredient;
}