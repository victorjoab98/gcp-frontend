import { useState } from "react"

const useForm = (initialState = {}) => {
    const [ values, setValues ] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    }

    const handleValidations = () => {
        
    }

    return { values, setValues, handleInputChange, reset };

}