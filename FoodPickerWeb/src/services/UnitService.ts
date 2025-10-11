import type { Unit } from "../models/Unit";

class UnitService{
    public static async GetAllUnits(): Promise<Unit[]> {
        let unitsList: Unit[] = [];
        await fetch("https://localhost:7204/api/units")
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