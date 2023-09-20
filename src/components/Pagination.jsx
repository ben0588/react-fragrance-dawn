import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPage } from '../store/slice/pageSlice';
import { memo } from 'react';
import PropTypes from 'prop-types';

const Pagination = memo(function Pagination({ changePage, totalPage, currentPage, isPre, isNext, category }) {
    const dispatch = useDispatch();

    useEffect(() => {
        currentPage !== '' && dispatch(createPage(currentPage));
    }, [currentPage, dispatch]);
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <a
                        className={`page-link ${isPre ? '' : 'disabled'}`}
                        href="/"
                        aria-label="Previous"
                        onClick={(e) => {
                            e.preventDefault();
                            changePage(currentPage - 1, category);
                        }}
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {[...new Array(totalPage)].map((_, i) => (
                    <li className="page-item" key={`${i}_page`}>
                        <a
                            className={`page-link ${i + 1 === currentPage && 'active'}`}
                            href="/"
                            onClick={(e) => {
                                e.preventDefault();
                                changePage(i + 1, category);
                            }}
                        >
                            {i + 1}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a
                        className={`page-link ${isNext ? '' : 'disabled'}`}
                        href="/"
                        aria-label="Next"
                        onClick={(e) => {
                            e.preventDefault();
                            changePage(currentPage + 1, category);
                        }}
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
});

Pagination.propTypes = {
    changePage: PropTypes.func,
    totalPage: PropTypes.number,
    currentPage: PropTypes.number,
    isPre: PropTypes.bool,
    isNext: PropTypes.bool,
    category: PropTypes.string,
};

export default Pagination;
