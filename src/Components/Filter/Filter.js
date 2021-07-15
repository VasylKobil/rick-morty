import './Filter.scss';
import useAutocomplete from '@material-ui/lab/useAutocomplete';

export function Filter(props){
    const {buttons, name} = props
    const {onFilterChange} = props;

    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions
    } = useAutocomplete({
        options: buttons,
        getOptionLabel: (option) => option,
        onInputChange: (event, value) => onFilterChange && onFilterChange(value),
        freeSolo: true,
        clearOrBlur: false,
        clearOnEscape: true,
    });

    return(
        <>
            <div className='box' {...getRootProps()}>
                <input placeholder={name} {...getInputProps()} />
            </div>
            <div className='box-input'>
                {groupedOptions.length > 0 ? (
                    <ul{...getListboxProps()}>
                        {groupedOptions.map((option, index) => (
                            <li {...getOptionProps({ option, index })}>{option}</li>
                        ))}
                    </ul>
                ) : null}
            </div>
        </>
    )
}