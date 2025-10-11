import { useEffect, useState } from "react";
import type { Unit } from "../../../models/Unit";
import UnitService from "../../../services/UnitService";

type UnitSelecProps = {
    onChange?: (value: number) => void;
    selected?: number;
}

function UnitSelect(props: UnitSelecProps){
    const [ unitList, setUnitList ] = useState<Unit[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        props.onChange && props.onChange(parseInt(e.target.value));
    }

    useEffect(() => {
        const fetchUnits = async () => {
            const data = await UnitService.GetAllUnits();
            setUnitList(data);
        }
        fetchUnits();
    }, [])

    return(
        <select name="" id="" onChange={handleChange} value={props.selected}>
            {
                unitList.map((unit, i) => (
                    <option key={i} value={unit.id}>{unit.unitName}</option>
                ))
            }
        </select>
    )
}

export default UnitSelect;