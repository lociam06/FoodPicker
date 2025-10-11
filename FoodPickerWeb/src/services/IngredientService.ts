import type { Ingredient } from "../models/Ingredient";

class IngredientService{
    public static async GetAllIngredients(): Promise<Ingredient[]>{
        let ingredientsList: Ingredient[] = [];
        await fetch("https://localhost:7204/api/ingredients")
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