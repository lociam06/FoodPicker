import { useEffect, useState } from 'react';
import type { Food } from '../../models/Food';
import './FoodIndex.css'
import FoodService from '../../services/FoodService';
import { useNavigate, useParams } from 'react-router-dom';
import type { ApiFoodIngredientsResponse } from '../../models/ApiFoodIngredientsResponse';
import Swal from 'sweetalert2';

function FoodIndex(){
    const { foodId } = useParams();
    const [food, setFood] = useState<Food>({
        id: 0,
        name: "",
        eat_time: "",
        rate: 0,
        min_price: 0,
        max_price: 0,
        healthy: 0,
        difficulty: 0,
        approximate_preparation_time: 0,
        images: []
    });
     //Lista de ingredientes de la comida
    const [ foodIngredientsList, setFoodIngredientsList ] = useState<ApiFoodIngredientsResponse[]>([]);

    useEffect(() => {
        if(!foodId) return;

        const fetchFood = async () => {
            try {
                const result = await FoodService.GetFoodById(parseInt(foodId));
                setFood(result);
                console.log(result);
            } catch (err) {
                console.log('No se pudo cargar el alimento');
                return(<h1>Ha ocurrido un error al cargar la comida</h1>)
            }
        };

        const fetchIngredients = async () => {
            try {
                const result = await FoodService.GetFoodIngredients(parseInt(foodId));
                setFoodIngredientsList(result);
                console.log(result);
            } catch (err) {
                console.log('No se pudo cargar el alimento');
                return(<h1>Ha ocurrido un error al cargar la comida</h1>)
            }
        };

        fetchFood();
        fetchIngredients();
    }, [foodId]);
    
    //State para el carrousel
    const [ imageIndex, setImageIndex ] = useState(0);

    const nextImgIndex = () => {
        if(!food.images) return;
        if(imageIndex < food.images.length - 1) setImageIndex(prev => prev + 1)
    }
    const prevImgIndex = () => {
        if(imageIndex > 0) setImageIndex(prev => prev - 1)
    }

    const navigate = useNavigate();

    const handleDeleteFood = async () => {
        let aceptWarning;
        await Swal.fire({
            title: `Esta apunto de eliminar "${food.name}"`,
            text: "¿Desea continuar?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                aceptWarning = true;
            }
        });
        if(!aceptWarning) return;

        const result = await FoodService.DeleteFood(food.id);

        if(result){
            await Swal.fire({
                title: `Se ha eliminado "${food.name}" correctamente`,
                icon: "success",
                confirmButtonText: "Aceptar",
            });
            navigate("/foods");
        }
        else{
            await Swal.fire({
                title: `Ha ocurrido un error al eliminar el alimento`,
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    }

    return(
        <section id="food-index-page">
            <main>
                <div className="flex justifie-center">
                    <h2>{food.name}</h2>
                </div>
                <div className="food-content box-shadow-normal">
                    <div className="action-buttons">
                        <button className='delete-btn btn'
                            onClick={() => handleDeleteFood()}><i className="fa-solid fa-trash"></i> Eliminar
                        </button>
                        <button className='edit-btn btn'
                            onClick={() => navigate(`/foods/${food.id}/edit`)}><i className="fa-solid fa-pen-to-square"></i> Editar
                        
                        </button>
                    </div>
                    <div className="images">
                        <div className="more-images">
                            {
                                food.images &&
                                food.images.map((img, index) => (
                                    <img onClick={() => setImageIndex(index)} 
                                        key={img.id} 
                                        src={img.url} 
                                        alt={img.name}
                                        onError={(e) => {
                                            e.currentTarget.src = "/images/pleaceholdeImage.png"
                                        }}
                                    />
                                ))
                            }
                        </div>
                            <div className={`actual-image`}>
                            {
                                food.images &&
                                food.images[imageIndex]
                                ? (
                                    <>
                                        <img src={food.images[imageIndex].url} 
                                            alt={food.images[imageIndex].name} 
                                            onError={(e) => {
                                                e.currentTarget.src = "/images/pleaceholdeImage.png"
                                            }}    
                                        />
                                        <button className='carrousel-btn left-btn btn' onClick={prevImgIndex}><i className="fa-solid fa-chevron-left"></i></button>
                                        <button className='carrousel-btn right-btn btn' onClick={nextImgIndex}><i className="fa-solid fa-chevron-right"></i></button>
                                    </>
                                )
                                : <span>Esta comida no tiene imagenes</span>
                            }
                        </div>
                    </div>
                    <div className="info">
                        <p className='font-bold'>Descripción: </p>
                        <p>{food.name} Esta no es la descripcion real</p>
                        <div>
                            <span className="font-bold">Hora: </span>
                            <span>{food.eat_time}</span>
                        </div>
                        <div>
                            <span className="font-bold">Precio: </span>
                            <span>RD${food.min_price}</span>
                            <span>-</span>
                            <span>RD${food.max_price}</span>
                        </div>
                        <div>
                            <span className="font-bold">Clacificación: </span>
                            <span>{food.rate}</span>
                        </div>
                        <div>
                            <span className="font-bold">Saludable: </span>
                            <span>{food.healthy}</span>
                        </div>
                        <div>
                            <span className="font-bold">Dificultad: </span>
                            <span>{food.difficulty}</span>
                        </div>
                        <div>
                            <span className="font-bold">Duración: </span>
                            <span>{food.approximate_preparation_time} minutos</span>
                        </div>
                    </div>
                </div>
                <div className="recipe-container">
                    <h2>Receta</h2>
                    <div className="ingredients-container">
                        <span className="font-bold">Ingredientes:</span>
                        <ul className='ingredients'>
                            {
                                foodIngredientsList.map((ing, i) => (
                                    <li key={i}>
                                    <span>
                                        {ing.quantity} {ing.unit.unitName} de {ing.name}{" "}
                                        {!ing.is_optional && "(obligatorio)"}
                                    </span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="procedures">
                        <span className="font-bold">Procedimientos:</span>
                        <div className='procedures-list'>
                        {
                            food.recipe &&
                            food.recipe.procedure.split(" -|- ").map((proc, i) => (
                                <div key={i} className='procedure-line'>
                                    <span>{i+1}.</span>
                                    <p>{proc}</p>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default FoodIndex;