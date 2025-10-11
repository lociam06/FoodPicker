import { useEffect, useState } from "react";
import type { Food } from "../../../../models/Food";
import FoodCard from "../FoodCard/FoodCard";
import './FoodsCarrousel.css'
import type { FoodCardViewModel } from "../../viewModels/FoodCardViewModel";

interface FoodsCarrouselProps{
    foodList: Food[];
    eatTime: string
}

function FoodsCarrousel(props: FoodsCarrouselProps){
    const [activeIndex, setActiveIndex] = useState(0); 
    const [foodElementsList, setFoodElementsList] = useState<FoodCardViewModel[]>([]);

    useEffect(() => {
        const newList = props.foodList.map(food => (
                {
                    food: food,
                    isActive: false
                }
            ))
        setFoodElementsList(newList); 
    },[props.foodList]);

    useEffect(() => {
        setActiveIndex(0);
    },[props.eatTime]);

    const prevIndex = () => {
        if(activeIndex > 0){
            setActiveIndex(prev => prev - 1)
        }
    }
    const nextIndex = () => {
        if(activeIndex < props.foodList.length -1){
            setActiveIndex(prev => prev + 1)
        }
    }
    //style={{ transform: `translateX(-${current * 100}%)` }}
    let sliderStyles = {
        transform: `translateX(${activeIndex * -40 + 20}rem)`
    }
    return(
        <div className="foods-carrousel">
            <div className="foods-carrousel-slider" style={sliderStyles}>
                {
                    foodElementsList.map((item, index) => (
                        <FoodCard 
                            key={index} 
                            isActive={index === activeIndex} 
                            food={item.food} />
                    ))
                }
            </div>
            <button onClick={prevIndex} className="prev-index-btn btn"><i className="fa-solid fa-chevron-left"></i></button>
            <button onClick={nextIndex} className="next-index-btn btn"><i className="fa-solid fa-chevron-right"></i></button>
        </div>
    )
}

export default FoodsCarrousel;