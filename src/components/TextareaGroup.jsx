import { memo } from 'react';

const TextareaGroup = memo(function TextareaGroup({
    name,
    id,
    title,
    groupClass,
    labelClass,
    textareaClass,
    cols = 30,
    rows = 10,
    placeholder,
    onChange,
    value,
}) {
    return (
        <div className={groupClass}>
            <label htmlFor={id} className={labelClass}>
                {title}
            </label>
            <textarea
                name={name}
                id={id}
                className={textareaClass}
                cols={cols}
                rows={rows}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
            ></textarea>
        </div>
    );
});
export default TextareaGroup;
