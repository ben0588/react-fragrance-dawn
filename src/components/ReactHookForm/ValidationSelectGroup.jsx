import { memo } from 'react';
import PropTypes from 'prop-types';

const ValidationSelectGroup = memo(function ValidationSelectGroup({
    id,
    children,
    register,
    rules,
    errors,
    defaultValue,
    labelText,
    labelClass,
    selectClass,
    groupClass,
    disabled,
    required,
}) {
    return (
        <div className={groupClass ? groupClass : ''}>
            <label htmlFor={id} className={labelClass}>
                {required && <span className='text-danger fs-5'>*</span>}
                {labelText}
            </label>
            <select
                id={id}
                className={`${errors[id] && 'is-invalid'} ${selectClass ? selectClass : ''}`}
                {...register(id, rules)}
                // 傳入 '' 字串，與初始請選擇城市 value 相同，才會有 disabled 效果。
                defaultValue={defaultValue}
                disabled={disabled}
            >
                {children}
            </select>
            {errors?.[id] && <div className='invalid-feedback'>{errors?.[id]?.message}</div>}
        </div>
    );
});

ValidationSelectGroup.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.any,
    errors: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    labelText: PropTypes.string,
    labelClass: PropTypes.string,
    selectClass: PropTypes.string,
    groupClass: PropTypes.string,
    rules: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.string,
};

export default ValidationSelectGroup;
