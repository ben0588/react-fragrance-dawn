import { memo } from 'react';
import PropTypes from 'prop-types';

const ValidationInputGroup = memo(function ValidationInputGroup({
    id,
    type,
    errors,
    register,
    labelText,
    labelClass,
    inputClass,
    groupClass,
    rules,
    placeholder,
    required,
}) {
    return (
        <div className={groupClass ? groupClass : ''}>
            <label htmlFor={id} className={labelClass}>
                {required && <span className='text-danger fs-5'>*</span>}
                {labelText}
            </label>
            <input
                id={id}
                type={type}
                className={` ${errors[id] && 'is-invalid'} ${inputClass ? inputClass : ''}`}
                {...register(id, rules)}
                placeholder={placeholder ? placeholder : null}
            />
            {errors?.[id] && <div className='invalid-feedback'>{errors?.[id]?.message}</div>}
        </div>
    );
});

ValidationInputGroup.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    labelText: PropTypes.string,
    labelClass: PropTypes.string,
    inputClass: PropTypes.string,
    groupClass: PropTypes.string,
    rules: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
};
export default ValidationInputGroup;
