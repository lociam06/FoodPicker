import type { Unit } from "../models/Unit";

const API_URL = import.meta.env.VITE_API_URL;

class UnitService{
    public static async GetAllUnits(): Promise<Unit[]> {
        let unitsList: Unit[] = [];
        await fetch(`${API_URL}/units`)
        .then(response => {
            if(!response.ok){
                throw new Error("Error al hacer fecth")
            }
            return response.json();
        })
        .then(data => {
            unitsList = data
        })
        return unitsList;
    }
}

export default UnitService;