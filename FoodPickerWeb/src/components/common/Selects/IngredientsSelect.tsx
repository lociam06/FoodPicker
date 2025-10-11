import { useEffect, useState } from "react";
import type { Ingredient } from "../../../models/Ingredient";
import IngredientService from "../../../services/IngredientService";

type IngredientsSelectProps = {
    onChange?: (value: number) => void;
    selected?: number;
}

function IngredientsSelect(props: IngredientsSelectProps){
    const [ ingredientsList, setIngredientsList ] = useState<Ingredient[]>([]);

    const handleSelectIngredient = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        props.onChange && props.onChange(parseInt(e.target.value));
    }
    useEffect(() => {
        const fecthIngredients = async () => {
            const data = await IngredientService.GetAllIngredients();
            setIngredientsList(data);
        }
        fecthIngredients();
    }, []);

    return(
        <select name="" id=""
            onChange={handleSelectIngredient}
            value={props.selected}>
            {
                ingredientsList.map((ingredient, i) => (
                    <option key={i} value={ingredient.id}>{ingredient.name}</option>
                ))
            }
            <option value="0">Creat +</option>
        </select>
    )
}

export default IngredientsSelect;