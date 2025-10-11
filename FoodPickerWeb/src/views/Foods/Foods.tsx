import type { Food } from "../../models/Food";
import { useState, useEffect } from "react";
import './Foods.css'
import FoodElement from "./Components/FoodElement/FoodElement";
import FoodService from "../../services/FoodService";

function Foods(){
    const [foodList, setFoodList] = useState<Food[]>([]);
        useEffect(() => {
            const fetchFoods = async () => {
                const foods = await FoodService.GetAllFoods();
                setFoodList(foods);
            }
    
            fetchFoods();
        }, []);

    return(
        <section id="foods-page">
            <h2>Ve todo el catalogo</h2>
            <div className="container">
                <aside className="box-shadow-normal">
                    <div className="header">
                        <h3>Filtrar</h3>
                        <i className="fa-solid fa-gear"></i>
                    </div>
                    <div className="content">
                        <div>
                            <label htmlFor="time-select">Hora:</label>
                            <select name="time-select" id="time-select">
                                <option value="">Cualquiera</option>
                                <option value="">Desayuno</option>
                                <option value="">Almuerzo</option>
                                <option value="">Comida</option>
                                <option value="">Cena</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="time-select">Calificacion:</label>
                            <select name="time-select" id="time-select">
                                <option value="">10</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="time-select">Dificultad:</label>
                            <select name="time-select" id="time-select">
                                <option value="">10</option>

                            </select>
                        </div>
                        <div className="apoximated-cost">
                            <label htmlFor="time-select">Costo aproximado:</label>
                            <div>
                                <input type="number" />
                                <span> - </span>
                                <input type="number" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="time-select">Sadulabilidad:</label>
                            <select name="time-select" id="time-select">
                                <option value="">10</option>
                            </select>
                        </div>
                    </div>
                </aside>
                <main className="box-shadow-normal">
                    <div className="foods-container">
                        {foodList.map((food, index) => (
                            <FoodElement key={index} food={food}/> 
                        ))}
                    </div>
                    <div className="footer">
                        <button className="btn"><i className="fa-solid fa-angles-left"></i></button>
                        <button className="btn"><i className="fa-solid fa-angle-left"></i></button>
                        <span>Pagina: 1</span>
                        <button className="btn"><i className="fa-solid fa-angles-right"></i></button>
                        <button className="btn"><i className="fa-solid fa-angle-right"></i></button>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default Foods;