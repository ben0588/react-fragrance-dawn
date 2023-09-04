import { memo } from 'react';
import { NavLink } from 'react-router-dom';

const ListGroup = memo(function ListGroup({ title, titleClass, list, children }) {
    return (
        <ul className={`list-unstyled   `}>
            <li className={`${titleClass} fs-5 pb-2 `}>{title}</li>
            {list?.map((items, index) => (
                <li className='' key={index}>
                    <NavLink to={items.path} className={`d-block  text-secondary footer-text-hover fs-7 pb-2`}>
                        {items.title}
                    </NavLink>
                </li>
            ))}
            {children}
        </ul>
    );
});
export default ListGroup;
