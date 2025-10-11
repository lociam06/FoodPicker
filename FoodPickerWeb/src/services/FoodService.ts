import type { ApiFoodIngredientsResponse } from "../models/ApiFoodIngredientsResponse";
import type { Food } from "../models/Food";
import type { FoodImage } from "../models/FoodImage";
import type { Recipe } from "../models/Recipe";
import type { RecipeIngredient } from "../models/RecipeIngredient";

class FoodService{
    public static async GetAllFoods(): Promise<Food[]>{
        let foodList: Food[] = [];
        await fetch("https://localhost:7204/api/foods")
        .then((response) => {
            if(!response.ok){
                throw new Error("Error al obtener foods");
            }
            return response.json();
        })
        .then((data) => {
            foodList = data;
        });
        return foodList;
    }

    public static async GetFoodById(id: number): Promise<Food> {
        try {
            const response = await fetch(`https://localhost:7204/api/foods/${id}`);
            if (!response.ok) {
                throw new Error("Error al obtener el alimento");
            }
            const data: Food = await response.json();
            return data;
        } 
        catch (error) {
            console.error(error);
            throw error; 
        }
    }

    public static async GetFoodIngredients(id: number): Promise<ApiFoodIngredientsResponse[]> {
        let IngredientsList: ApiFoodIngredientsResponse[] = [];
        await fetch(`https://localhost:7204/api/foods/${id}/ingredients`)
        .then((response) => {
            if(!response.ok){
                throw new Error("Error al obtener los ingredientes");
            }
            return response.json();
        })
        .then((data) => {
            IngredientsList = data;
        });
        return IngredientsList;
    }

    public static async CreateFood(food: Food, recipe: Recipe, ingredients: RecipeIngredient[], images: FoodImage[]) : Promise<Food | null>{
        //Añadir comida
        const foodResponse = await fetch(("https://localhost:7204/api/foods"),{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(food),
        });
        let newFood: Food | null = null;
        if(foodResponse.ok){
            newFood = await foodResponse.json();
            if(!newFood) {
                console.log("Ha ocurrido un error");
                return null;
            }
        }else{
            console.log("Ha ocurrido un error al crear la comida");
            return null;
        }
        
        //Añadir reseta
        recipe.foodId = newFood?.id || 0;
        const recipeResponse = await fetch(("https://localhost:7204/api/recipes"),{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe),
        });
        let newRecipe: Recipe | null = null;
        if(foodResponse.ok){
            newRecipe = await recipeResponse.json();
        }else{
            console.log("Ha ocurrido un error al crear la receta");
            return null;
        }
        
       let ingredientsList = ingredients.map((ing) => (
           {
               ...ing,
               recipeId: newRecipe?.id
            }
        ));
        console.log(ingredientsList)
        
        for(const ing of ingredientsList){
            console.log(ing); 
            let ingResponse = await fetch(("https://localhost:7204/api/RecipeIngredients"),{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ing),
            });

            if(!ingResponse.ok) {
                console.log(`Ha ocurrido un error al agregar el ingrediente: ${ing}`);
                return null;
            }
        };

        //Añadir imagenes
        const imageFormData = new FormData();
        
        if(images.length > 0){
            for(const image of images) {
                console.log(image);
                let res = await fetch(image.url);
                let blod = await res.blob();
                imageFormData.append('images', blod, image.url);
            };
            
            const imgaesResponse = await fetch((`https://localhost:7204/api/foods/${newRecipe?.id}/image`),{
                method: 'POST',
                body: imageFormData, 
            });
            if(!imgaesResponse.ok){
                console.log("Ha ocurrido un error al agregar las imagenes");
                return null;
            }
        }
        
        return await this.GetFoodById(newFood.id);
    }

    public static async UpdateFood(food: Food, recipe: Recipe, ingredients: RecipeIngredient[], images: FoodImage[]) : Promise<Food | null>{
        //Actualizar comida
        const foodResponse = await fetch((`https://localhost:7204/api/foods/${food.id}`),{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(food),
        });
        let updatedFood: Food | null = null;
        if(foodResponse.ok){
            console.log(foodResponse);
            updatedFood = await foodResponse.json();
            if(!updatedFood) {
                console.log("Ha ocurrido un error");
                return null;
            }
        }else{
            console.log("Ha ocurrido un error al crear la comida");
            return null;
        }
        
        //Actualizar reseta
        await fetch((`https://localhost:7204/api/recipes/${recipe.id}`),{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipe),
        });

        if(!foodResponse.ok){
            console.log("Ha ocurrido un error al crear la receta");
            return null;
        }
        
        //Actualizar ingredientes
        let ingResponse = await fetch((`https://localhost:7204/api/foods/${food.id}/ingredients`),{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ingredients),
        });

        if(!ingResponse.ok) {
            console.log(`Ha ocurrido un error al agregar los ingredientes`);
            return null;
        }

        if(images.length > 0){
            //Actualizar imagenes
            const imageFormData = new FormData();
            
            for(const image of images) {
                console.log(image);
                let res = await fetch(image.url);
                let blod = await res.blob();
                imageFormData.append('images', blod, image.url);
            };
            
            const imgaesResponse = await fetch((`https://localhost:7204/api/foods/${food.id}/image`),{
                method: 'PUT',
                body: imageFormData, 
            });
            if(!imgaesResponse.ok){
                console.log("Ha ocurrido un error al agregar las imagenes");
                return null;
            }
        }

        return await this.GetFoodById(updatedFood.id);
    }

    public static async DeleteFood(id: number) : Promise<boolean>{
        try {
            const response = await fetch(`https://localhost:7204/api/foods/${id}`, 
                {
                    method: "DELETE"
                }
            );
            if (!response.ok) {
                console.log("Error al eliminar el alimento");
                return false;
            }
            return true;
        } 
        catch (error) {
            console.log("Error al eliminar el alimento");
            return false;
        }
    }
}

export default FoodService;