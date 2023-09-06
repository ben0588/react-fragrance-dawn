import { memo } from 'react';
import PropTypes from 'prop-types';

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

TextareaGroup.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    groupClass: PropTypes.string,
    labelClass: PropTypes.string,
    textareaClass: PropTypes.string,
    cols: PropTypes.number,
    rows: PropTypes.number,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
};
export default TextareaGroup;
