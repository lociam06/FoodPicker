type HealthySelectProps = {
    onChange?: (value: number) => void;
    selected?: number;
}

function HealthySelect(props: HealthySelectProps){
    const options = Array.from({ length: 11 }, (_, i) => i);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(props.onChange) props.onChange(parseInt(e.target.value));
    }
    return(
        <select onChange={handleChange} value={props.selected}>
            {
                options.map(val => (
                    <option key={val} value={val}>{val}</option>
                ))
            }
        </select>
    )
}

export default HealthySelect;