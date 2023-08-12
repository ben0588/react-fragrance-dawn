import { memo } from 'react';

const InputGroup = memo(
    ({
        name,
        id,
        type,
        title,
        groupClass,
        labelClass,
        inputClass,
        children,
        onChange,
        value,
        checked,
        disabled,
        placeholder,
        inputStyle = null,
    }) => {
        return (
            <div className={groupClass}>
                <label htmlFor={id} className={labelClass}>
                    {title}
                </label>
                <input
                    onChange={onChange}
                    value={value}
                    name={name}
                    type={type}
                    id={id}
                    className={inputClass}
                    disabled={disabled}
                    checked={checked}
                    placeholder={placeholder ? placeholder : ''}
                    style={inputStyle ? inputStyle : null}
                />
                {children}
            </div>
        );
    }
);

export default InputGroup;
