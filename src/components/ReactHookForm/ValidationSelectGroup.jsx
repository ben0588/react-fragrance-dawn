import { memo } from 'react';

const ValidationSelectGroup = memo(
    ({
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
    }) => {
        return (
            <div className={groupClass ? groupClass : ''}>
                <label htmlFor={id} className={labelClass}>
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
    }
);
export default ValidationSelectGroup;
