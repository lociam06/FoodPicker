type DificultySelectProps = {
    selecte?: number,
    onChange?: (value: number) => void;
}

function DificultySelect(props: DificultySelectProps){
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(props.onChange) props.onChange(parseInt(e.target.value));
    }
    const options = Array.from({ length: 11 }, (_, i) => i);

    return(
        <select onChange={handleChange} value={props.selecte}>
            {
                options.map(val => (
                    <option key={val} value={val}>{val}</option>
                ))
            }
        </select>
    )
}

export default DificultySelect;