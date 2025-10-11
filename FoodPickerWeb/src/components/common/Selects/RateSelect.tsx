type RateSelectProps = {
    onChange?: (value: number) => void;
    selected?: number;
}

function RateSelect(props: RateSelectProps){
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(props.onChange) props.onChange(parseInt(e.target.value));
    }
    const options = Array.from({ length: 11 }, (_, i) => i);

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

export default RateSelect;