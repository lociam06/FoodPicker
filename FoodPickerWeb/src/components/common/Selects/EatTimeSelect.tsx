import Const from "../../../consts/consts";

type EatTimeSelectProps = {
    selected?: string,
    onChange?: (value: string) => void
}

function EatTimeSelect(props: EatTimeSelectProps){

    const handleChage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(props.onChange) props.onChange(e.target.value);
    }

    return(
        <select onChange={handleChage} value={props.selected}>
            {
                Const.EatTime.map((eatTime, i) => (
                    <option key={i} value={eatTime}>{eatTime}</option>
                ))
            }
        </select>
    )
}

export default EatTimeSelect;