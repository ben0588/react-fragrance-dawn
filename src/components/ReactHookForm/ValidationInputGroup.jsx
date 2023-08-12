import { memo } from 'react';

const ValidationInputGroup = memo(
    ({ id, type, errors, register, labelText, labelClass, inputClass, groupClass, rules, placeholder }) => {
        return (
            <div className={groupClass ? groupClass : ''}>
                <label htmlFor={id} className={labelClass}>
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
    }
);
export default ValidationInputGroup;
