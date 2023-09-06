import { memo } from 'react';
import PropTypes from 'prop-types';

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

SelectGroup.propTypes = {
    children: PropTypes.any,
    name: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    groupClass: PropTypes.string,
    labelClass: PropTypes.string,
    selectClass: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    multiple: PropTypes.bool,
};
export default SelectGroup;
