import { memo } from 'react';

const ListGroup = memo(({ title, titleClass, list, children }) => {
    return (
        <ul className={`list-unstyled   `}>
            <li className={`${titleClass} fs-5 pb-2 `}>{title}</li>
            {list?.map((items) => (
                <li className='footer-text-hover fs-7 pb-2' key={items}>
                    {items}
                </li>
            ))}
            {children}
        </ul>
    );
});
export default ListGroup;
