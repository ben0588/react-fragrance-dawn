const ValidationTextareaGroup = ({
    id,
    children,
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
}) => {
    return (
        <div className={groupClass ? groupClass : ''}>
            <label htmlFor={id} className={labelClass}>
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
};
export default ValidationTextareaGroup;
