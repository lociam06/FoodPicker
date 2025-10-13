import Foods from "../Foods/Foods";
import FoodsCarrousel from "./components/FoodsCarrousel/FoodsCarrousel";
import "./Home.css"
import { useEffect, useState } from "react";
import type { Food } from "../../models/Food";
import FoodService from "../../services/FoodService";

function Home(){
    const [foodTime, setFoodTime] = useState("");
    useEffect(() => {
        const actualMinutes = new Date().getMinutes();
        const actualHour = new Date().getHours() + (actualMinutes / 100);

        if(actualHour <= 1.59) setFoodTime("Cena");
        else if(actualHour >= 2 && actualHour <= 11.59) setFoodTime("Desayuno");
        else if(actualHour >= 12 && actualHour <= 15.59) setFoodTime("Almuerzo");
        else if(actualHour >= 16 && actualHour <= 18.59) setFoodTime("Merienda");
        else if(actualHour >= 19) setFoodTime("Cena");
    }, []);

    const [foodList, setFoodList] = useState<Food[]>([]);
    const [foodListDisplay, setFoodListDisplay] = useState<Food[]>([]);
    useEffect(() => {
        const fetchFoods = async () => {
            const foods = await FoodService.GetAllFoods();
            foods.sort(() => Math.random() - 0.5);
            setFoodList(foods);
        }
        fetchFoods();
    }, []);

    useEffect(() => {
        const filteredFoods = foodList.filter(x => x.eat_time == foodTime);
        setFoodListDisplay(filteredFoods)

    }, [foodTime, foodList]);

    return(
        <section id="home-page">
            <div className="content">
                <h1 className="main-title">Encuentra lo que vas a comer</h1>
                <div className="food-time-container">
                    <div className="food-time">
                        <span>Time:</span>
                        <div>
                            <button onClick={() => setFoodTime("Desayuno")} className={`btn ${foodTime == "Desayuno" ? "active" : ""}`}>Desayuno</button>
                            <button onClick={() => setFoodTime("Comida")} className={`btn ${foodTime == "Comida" ? "active" : ""}`}>Almuerzo</button>
                            <button onClick={() => setFoodTime("Almuerzo")} className={`btn ${foodTime == "Almuerzo" ? "active" : ""}`}>Merienda</button>
                            <button onClick={() => setFoodTime("Cena")} className={`btn ${foodTime == "Cena" ? "active" : ""}`}>Cena</button>
                        </div>
                    </div>
                </div>
                <FoodsCarrousel foodList={foodListDisplay} eatTime={foodTime}/>
                <Foods/>
            </div>
        </section>
    )
}

export default Home;