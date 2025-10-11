import type { Unit } from "./Unit";

export interface ApiFoodIngredientsResponse {
    id: number,
    recipeId: number,
    ingredientId: number,
    name: string,
    quantity: number,
    unitId: number,
    unit: Unit,
    is_optional: boolean
}