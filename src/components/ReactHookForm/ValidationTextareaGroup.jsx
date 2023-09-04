import { memo } from 'react';
import PropTypes from 'prop-types';

const ValidationTextareaGroup = memo(function ValidationTextareaGroup({
    id,
    register,
    rules,
    errors,
    defaultValue,
    value,
    labelText,
    labelClass,
    textareaClass,
    groupClass,
    disabled,
    cols = 30,
    rows = 10,
    placeholder,
    required,
}) {
    return (
        <div className={groupClass ? groupClass : ''}>
            <label htmlFor={id} className={labelClass}>
                {required && <span className='text-danger fs-5'>*</span>}
                {labelText}
            </label>
            <textarea
                id={id}
                cols={cols}
                rows={rows}
                className={`${errors[id] && 'is-invalid'} ${textareaClass ? textareaClass : ''}`}
                {...register(id, rules)}
                // 傳入 '' 字串，與初始請選擇城市 value 相同，才會有 disabled 效果。
                defaultValue={defaultValue}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
            ></textarea>
            {errors?.[id] && <div className='invalid-feedback'>{errors?.[id]?.message}</div>}
        </div>
    );
});

ValidationTextareaGroup.propTypes = {
    id: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    labelText: PropTypes.string,
    labelClass: PropTypes.string,
    textareaClass: PropTypes.string,
    groupClass: PropTypes.string,
    rules: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    cols: PropTypes.number,
    rows: PropTypes.number,
};

export default ValidationTextareaGroup;
