import React from 'react'
import Classes from './Input.module.css'
const Input = (props) => {
    let inputElement = null;
        const inputClasses = [Classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(Classes.Invalid);
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                onChange={props.changed}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
            />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                onChange={props.changed}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
            />;
            break;
        case ( 'select' ):
            inputElement = <select
                onChange={props.changed}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
            >
                {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
            </select>;
            break;
        default:
            inputElement = <input
                onChange={props.changed}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
            />;
    }


    return (
        <div className={Classes.Input }>
            <label className={Classes.Label}></label>
            {inputElement}
        </div>
    )
};

export default Input