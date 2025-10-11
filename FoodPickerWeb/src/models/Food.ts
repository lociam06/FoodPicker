import type { Recipe } from "./Recipe"
import type { FoodImage } from "./FoodImage"

export interface Food{
    id: number;
    name: string;
    decription?: string;
    eat_time: string;
    rate: number;
    min_price: number;
    max_price: number;
    healthy: number;
    difficulty: number;
    approximate_preparation_time: number;
    images?: FoodImage[];
    recipe?: Recipe;
}