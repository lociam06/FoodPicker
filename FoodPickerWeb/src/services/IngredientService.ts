import type { Ingredient } from "../models/Ingredient";

const API_URL = import.meta.env.VITE_API_URL;

class IngredientService{
    public static async GetAllIngredients(): Promise<Ingredient[]>{
        let ingredientsList: Ingredient[] = [];
        await fetch(`${API_URL}/ingredients`)
        .then((response) => {
            if(!response.ok){
                throw new Error("Error al obtener foods");
            }
            return response.json();
        })
        .then((data) => {
            ingredientsList = data;
        });
        return ingredientsList;
    }
}

export default IngredientService;