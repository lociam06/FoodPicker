import './FoodCard.css'
import type { FoodCardViewModel } from "../../viewModels/FoodCardViewModel";
import { useNavigate } from 'react-router-dom';

function FoodCard(props: FoodCardViewModel){
    const navigate = useNavigate();

    const goToFoodIfIsSelected = () => {
        if(props.isActive) navigate(`foods/${props.food.id}`)
    }

    if(!props.food){
        return(
            <div className="food-card">
                <p>Cargando...</p>
            </div>
        )
    }

    return(
        <div className={`food-card ${(!props.isActive && props.isActive !== undefined) && "no-active"}`}
            onClick={() => goToFoodIfIsSelected()}>
            <h2 className="card-title">{props.food.name}</h2>
            <img src={props.food.images?.[0]?.url || "/images/pleaceholdeImage.png"} 
                alt="Imagen de la comida" 
                onError={(e) => {
                    e.currentTarget.src = "/images/pleaceholdeImage.png"
                }}
            />
            <div className="flex justifie-beetween">
                <div>
                    <span className="font-bold">Hora: </span>
                    <span>{props.food.eat_time}</span>
                </div>
                <div>
                    <span className="font-bold">Calificación: </span>
                    <span>{props.food.rate}</span>
                </div>
            </div>
        </div>
    )
}
export default FoodCard;