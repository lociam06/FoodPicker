import React, { useEffect, useRef, useState } from 'react';
import type { Food } from '../../models/Food';
import type { FoodImage } from '../../models/FoodImage';
import './AddFood.css'
import EatTimeSelect from '../../components/common/Selects/EatTimeSelect';
import HealthySelect from '../../components/common/Selects/HealthySelect';
import RateSelect from '../../components/common/Selects/RateSelect';
import DificultySelect from '../../components/common/Selects/DificultySelect';
import IngredientsSelect from '../../components/common/Selects/IngredientsSelect';
import UnitSelect from '../../components/common/Selects/UnitsSelect';
import type { RecipeIngredient } from '../../models/RecipeIngredient';
import type { Recipe } from '../../models/Recipe';
import FoodService from '../../services/FoodService';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function AddFood(){
    const navigate = useNavigate();

    //States para el form
    const [ foodNameValue, setFoodNameValue ] = useState('');
    const [ foodImages, setFoodImages ] = useState<FoodImage[]>([]);
    const [ descriptionValue, setDecriptionValue ] = useState('');
    const [ eatTimeValue, setEatTimeValue] = useState('Desayuno');
    const [ minPriceValue, setMinPriceValue ] = useState(0);
    const [ maxPriceValue, setMaxPriceValue ] = useState(1);
    const [ rateValue, setRateValue] = useState(0);
    const [ healthyValue, setHealthyValue] = useState(0);
    const [ dificultyValue, setDificultyValue] = useState(0);
    const [ durationValue, setDuractionValue ] = useState(0);
    
    //State para el carrousel
    const [ imageIndex, setImageIndex ] = useState(0);
    
    //Referencia del input de imagen
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    
    //Lista de ingredientes de la comida
    const [ foodIngredientsList, setFoodIngredientsList ] = useState<RecipeIngredient[]>([
        {
            id: 0,
            ingredientId: 0,
            recipeId: 0,
            is_optional: false,
            unitId: 1,
            quantity: 1,
        }
    ]);

    //Procedure lista de procedimientos
    const [ procedureList, setProcedureList ] = useState<Recipe[]>([
        {
            id: 0,
            procedure: "",
            foodId: 0
        }
    ]);

    const nextImgIndex = () => {
        if(imageIndex < foodImages.length - 1) setImageIndex(prev => prev + 1)
    }
    const prevImgIndex = () => {
        if(imageIndex > 0) setImageIndex(prev => prev - 1)
    }
    const deleteImage = () => {
        setFoodImages(prevList => prevList.filter(((_, i) => i !== imageIndex)));
    }
    useEffect(() => {
        if(imageIndex >= foodImages.length && imageIndex > 0) setImageIndex(foodImages.length - 1);
    }, [foodImages.length]);

    //AddImage
    const handleAddImage = () => {
        imageInputRef.current?.click();
    }
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files && files.length > 0){
            const newImages: FoodImage[] = Array.from(files).map(img => ({
                id: Math.random(),
                name: img.name,
                url: URL.createObjectURL(img),
                foodId: 0    
            }));
            setFoodImages(prev => [...prev, ...newImages]);
        }
    }

    //Seleccionar eatTime
    const selectEatTimeValue = (value: string) => {
        setEatTimeValue(value);
    }
    //Seleccionar Healthy
    const selectHealthyValue = (value: number) => {
        setHealthyValue(value);
    }
    //Seleccionar Rate
    const selectRateValue = (value: number) => {
        setRateValue(value);
    }
    //Seleccionar dificulty
    const selectDificultyValue = (value: number) => {
        setDificultyValue(value);
    }

    //---------Receta
    //Anadir ingrediente
    const addIngredient = () => {
        setFoodIngredientsList(prev => [
            ...prev,
            {
                id: 0,
                ingredientId: 0,
                recipeId: 0,
                is_optional: false,
                unitId: 1,
                quantity: 1,
            }
        ])
    }
    const deleteIngredient = (i: number) => {
        setFoodIngredientsList(prev => {
            const update = [...prev];
            update.splice(i, 1);
            return update;
        });
    }

    //Cambiar propiedades ingrediente
    const changeIngredient = (ingredientId: number, i: number) => {
        setFoodIngredientsList(prev => {
            const update = [...prev];
            update[i] = {
                ...update[i],
                ingredientId: ingredientId,
            }
            return update;
        });
    }
    
    const changeUnit = (unitId: number, i: number) => {
        setFoodIngredientsList(prev => {
            const update = [...prev];
            update[i] = {
                ...update[i],
                unitId: unitId,
            }
            return update;
        });
    }

    const changeQuantity = (quantity: number, i: number) => {
        setFoodIngredientsList(prev => {
            const update = [...prev];
            update[i] = {
                ...update[i],
                quantity: quantity
            }
            return update;
        });
    }

    const changeIsOptional = (isOptional: boolean, i: number) => {
        setFoodIngredientsList(prev => {
            const update = [...prev];
            update[i] = {
                ...update[i],
                is_optional: isOptional
            }
            return update;
        });
    }

    //Procedimientos
    const addProcedure = () => {
        setProcedureList(prev => [
            ...prev,
            {
                id: 0,
                procedure: "",
                foodId: 0
            }
        ])
    }
    const deleteProcedure = (i: number) => {
        setProcedureList(prev => {
            const update = [...prev];
            update.splice(i, 1);
            return update;
        });
    }
    const changeProcedure = (procedure: string, i: number) => {
        setProcedureList(prev => {
            const update = [...prev];
            update[i].procedure = procedure;
            return update;
        });
    }
    
    //Add food
    const handleAddFood = async () => {
        if(!(await IsValid())) return;

        let acceptInfo = true;
        await Swal.fire({
            title: "Esta apunto de agregar una comida",
            text: "Desea continuar?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        }).then((restul) => {
            if(restul.isDismissed) acceptInfo = false;
        });
        if(!acceptInfo) return;

        const foodToAdd: Food = {
            id: 0,
            name: foodNameValue,
            eat_time: eatTimeValue,
            rate: rateValue,
            min_price: minPriceValue,
            max_price: maxPriceValue,
            healthy: healthyValue,
            difficulty: dificultyValue,
            approximate_preparation_time: durationValue,
        }

        const recipeToAdd: Recipe = {
            id: 0,
            procedure: procedureList.map(x => x.procedure).join(" -|- "),
            foodId: 0
        }
        const result = await FoodService.CreateFood(foodToAdd, recipeToAdd, foodIngredientsList, foodImages);

        if(result){
            await Swal.fire({
                title: "Se ha agregado la comida correctamente",
                icon: "success",
                confirmButtonText: "Aceptar",
            });
            navigate(`/foods/${result.id}`);
        }else{
            Swal.fire({
                title: "Ha ocurrido un error al agregar la comida",
                icon: "success",
                confirmButtonText: "Ok",
            });
        }
    }

    //Validate
    const IsValid = async () => {
        var invalidInputs : string[] = [];
        if(foodNameValue.trim() == "") invalidInputs.push("Nombre de la comida");
        foodIngredientsList.forEach((ing, i) => {
            if(ing.quantity <= 0) invalidInputs.push(`La cantidad debe ser mayor a cero para el ingrediente ${i + 1}`);
            if(ing.ingredientId <= 0) invalidInputs.push(`Si va a crear un ingrediente debe poner el nombre del ingrediente ${i + 1}`);
        });
        
        let isProcedureEmpty = false;
        procedureList.forEach(pro => {
            if(pro.procedure.trim() == "") isProcedureEmpty = true;
        });
        if(isProcedureEmpty) invalidInputs.push("No pueden haber procedimientos vacios");

        const notDuplicatedList = foodIngredientsList.map(x => x.ingredientId);
        if(new Set(notDuplicatedList).size !== foodIngredientsList.length) invalidInputs.push("No pueden haber ingredientes duplicados");

        if(minPriceValue < 0 || maxPriceValue < 0) invalidInputs.push("Los precios no pueden ser menores a 0");
        if(minPriceValue >= maxPriceValue) invalidInputs.push("El precio minimo no puede ser mayor que el precio mayor");

        if(invalidInputs.length >= 1){
            Swal.fire({
                title: "Hay datos invalidos:",
                text: invalidInputs.join(", "),
                icon: "error",
                confirmButtonText: "Ok"
            });
            return false;
        }
        let aceptWarning = true;
        if(foodImages.length == 0){
            await Swal.fire({
                title: "Esta comida no tiene ninguna imagen",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "Agregar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (!result.isConfirmed) {
                    aceptWarning = false;
                }
            });
        }
        if(!aceptWarning) return false;
        return true;
    }
    return(
        <section id="add-food-page">
            <main>
                <div className='flex gap-1'>
                    <h2>Nombre: </h2>
                    <input 
                        type="text" 
                        className='food-title-input' 
                        placeholder='Nombre de la comida' 
                        value={foodNameValue} 
                        onChange={(e) => setFoodNameValue(e.target.value)}
                        maxLength={255}
                        required/>
                </div>
                <div className="food-content box-shadow-normal">
                    <div className="images">
                        <div className="more-images">
                            {
                                foodImages.map((img, index) => (
                                    <img onClick={() => setImageIndex(index)} key={img.id} src={img.url} alt={img.name}/>
                                ))
                            }
                            <button className='add-image-btn' onClick={handleAddImage}><i className="fa-solid fa-plus"></i></button>
                        </div>
                            <div className={`actual-image`}>
                            {
                                foodImages[imageIndex]
                                ? (
                                    <>
                                        <img src={foodImages[imageIndex].url} alt={foodImages[imageIndex].name} />
                                        <button className='carrousel-btn left-btn btn' onClick={prevImgIndex}><i className="fa-solid fa-chevron-left"></i></button>
                                        <button className='carrousel-btn right-btn btn' onClick={nextImgIndex}><i className="fa-solid fa-chevron-right"></i></button>
                                        <button className='carrousel-btn delete-btn btn' onClick={deleteImage}><i className="fa-solid fa-xmark"></i></button>
                                    </>
                                )
                                : <button className='add-actual-image-btn btn' onClick={handleAddImage}><i className="fa-solid fa-plus"></i></button>
                            }
                            <input 
                                type="file"
                                accept='image/*'
                                ref={imageInputRef}
                                hidden
                                multiple
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                    <div className="info">
                        <p className='font-bold'>Descripción: </p>
                        <textarea name="" id="" placeholder='Descripcion' value={descriptionValue} onChange={(e) => setDecriptionValue(e.target.value)} rows={5}></textarea>
                        <div>
                            <span className="font-bold">Hora: </span>
                            <EatTimeSelect onChange={selectEatTimeValue}/>
                        </div>
                        <div>
                            <span className="font-bold">Precio: </span>
                            <input type="number" max="100000" min="0" value={minPriceValue} onChange={(e) => setMinPriceValue(parseInt(e.target.value))}/>
                            <span>-</span>
                            <input type="number" max="100000" min="0" value={maxPriceValue} onChange={(e) => setMaxPriceValue(parseInt(e.target.value))}/>
                        </div>
                        <div>
                            <span className="font-bold">Clacificación: </span>
                            <RateSelect onChange={selectRateValue}/>
                        </div>
                        <div>
                            <span className="font-bold">Saludable: </span>
                            <HealthySelect onChange={selectHealthyValue}/>
                        </div>
                        <div>
                            <span className="font-bold">Dificultad: </span>
                            <DificultySelect onChange={selectDificultyValue}/>
                        </div>
                        <div>
                            <span className="font-bold">Duración: </span>
                            <input type="number" max="525600" min="0" value={durationValue} onChange={(e) => setDuractionValue(parseInt(e.target.value))}/>
                            <span>minutos</span>
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
                                        <div className='ingredient box-shadow-normal'>
                                            <div>
                                                <span className='font-bold'>Nombre: </span>
                                                <IngredientsSelect onChange={(value) => {
                                                    if(typeof(value) !== "string") changeIngredient(value, i);
                                                }}/>
                                                {
                                                    ing.ingredientId == 0
                                                    && <input type="text" placeholder='Ingrediente'/>
                                                }
                                            </div>
                                            <div>
                                                <span className='font-bold'>Cantidad: </span>
                                                <input value={foodIngredientsList[i].quantity} type="number" className='cuantity-input' min={1} max={99999} onChange={(e) => changeQuantity(parseInt(e.target.value), i)}/>
                                            </div>
                                            <div>
                                                <span className='font-bold'>Medida: </span>
                                                <UnitSelect onChange={(value) => changeUnit(value, i)}/>
                                            </div>
                                            <div>
                                                <span className='font-bold'>Es obligatorio</span>
                                                <input type="checkbox" onChange={(e) => changeIsOptional(e.target.checked, i)}/>
                                            </div>
                                            <button className='delete-btn' onClick={() => deleteIngredient(i)}><i className="fa-solid fa-trash"></i></button>
                                        </div>
                                    </li>
                                ))
                            }
                            <button className='btn btn-secondary' onClick={addIngredient}>Agregar ingrediente</button>
                        </ul>
                    </div>
                    <div className="procedures">
                        <span className="font-bold">Procedimientos:</span>
                        <div className='procedures-list'>
                        {
                            procedureList.map((proc, i) => (
                                <div key={i} className='procedure-line'>
                                    <span>{i+1}.</span>
                                    <textarea onChange={(e) => changeProcedure(e.target.value, i)} value={proc.procedure} name="" id="" maxLength={255} rows={3} placeholder='Procediemiento'></textarea>
                                    <button onClick={() => deleteProcedure(i)} className='delete-btn'><i className="fa-solid fa-trash"></i></button>
                                </div>
                            ))
                        }
                        <button onClick={addProcedure} className='btn btn-secondary'>Agregar procediemiento</button>
                        </div>
                    </div>
                    <hr />
                    <div className='action-btn flex justifie-end gap-1'>
                        <button className='btn btn-primary' onClick={handleAddFood}>Añadir comida</button>
                        <button className='btn btn-acent'>Cancelar</button>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default AddFood;