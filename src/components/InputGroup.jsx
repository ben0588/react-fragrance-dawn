import { memo } from 'react';
import PropTypes from 'prop-types';

const InputGroup = memo(function InputGroup({
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
}) {
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
});

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    groupClass: PropTypes.string,
    labelClass: PropTypes.string,
    inputClass: PropTypes.string,
    children: PropTypes.any,
    onChange: PropTypes.func,
    value: PropTypes.any,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    inputStyle: PropTypes.object,
};

export default InputGroup;
