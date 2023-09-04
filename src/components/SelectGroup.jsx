import { memo } from 'react';

const SelectGroup = memo(function SelectGroup({
    children,
    name,
    id,
    title,
    groupClass,
    labelClass,
    selectClass,
    onChange,
    defaultValue,
    value,
    multiple,
}) {
    return (
        <div className={groupClass}>
            <label htmlFor={id} className={labelClass}>
                {title}
            </label>
            <select
                name={name}
                id={id}
                className={selectClass}
                onChange={onChange}
                defaultValue={defaultValue}
                value={value}
                multiple={multiple}
            >
                {children}
            </select>
        </div>
    );
});
export default SelectGroup;
