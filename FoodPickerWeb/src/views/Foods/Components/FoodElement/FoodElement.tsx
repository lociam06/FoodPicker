import { useEffect, useState } from "react";
import type { Food } from "../../../../models/Food"
import './FoodElement.css'
import FoodService from "../../../../services/FoodService";
import type { ApiFoodIngredientsResponse } from "../../../../models/ApiFoodIngredientsResponse";
import { useNavigate } from "react-router-dom";

function FoodElement(props: {food: Food}){
    const [ ingredientsList, setIngredientsList ] = useState<ApiFoodIngredientsResponse[]>([]);
    useEffect(() => {
        const fetchIngredients = async () => {
            const ingredientes = await FoodService.GetFoodIngredients(props.food.id);
            setIngredientsList(ingredientes);
        }
        fetchIngredients();
    }, [props.food.id])

    const navigate = useNavigate();

    if(!props.food){
        return(
            <div className="food-element">
                <p>Cargando...</p>
            </div>
        )
    }
    return(
        <div className="food-element" onClick={() => navigate(`/foods/${props.food.id}`)}>
            <h3 className="title">{props.food.name}</h3>
            <div className="content">
                <img 
                    src={props.food.images?.[0]?.url || "/images/pleaceholdeImage.png"} 
                    alt="imagen de la comida" 
                    onError={(e) => {
                        e.currentTarget.src = "/images/pleaceholdeImage.png"
                    }}
                />
                <div className="info">
                    <ul>
                        {
                            ingredientsList.map((ingredient, i) => (
                                <li key={i}><span title={ingredient.name}>{ingredient.name}</span></li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FoodElement;