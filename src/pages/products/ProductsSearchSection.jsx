import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState, useCallback } from 'react';
import { clientFetchAllProducts } from '../../api/clientApis';
import { changeCategory, removeCategory } from '../../store/slice/categorySlice';
import { changeSearch, removeSearch } from '../../store/slice/searchSlice';
import useMessage from '../../hooks/useMessage';
import { updateSorting } from '../../store/slice/sortingSlice';
import { BsXSquare } from 'react-icons/bs';
import { BsXLg } from 'react-icons/bs';
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from 'react-icons/tb';
import { IoMdFunnel } from 'react-icons/io';

const ProductsSearchSection = () => {
    const navbar = useSelector((state) => state.navbar);
    const dispatch = useDispatch();
    const { inputToastMessage } = useMessage();
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [sortingValue, setSortingValue] = useState('建議');
    const categoryRedux = useSelector((state) => state.category);
    const searchRedux = useSelector((state) => state.search);
    const [toggleIcon, setToggleIcon] = useState(false);
    const menuRef = useRef(null);
    const menuBgRef = useRef(null);
    const [searchContainer, setSearchContainer] = useState(false);
    const searchContainerRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const sortingList = [
        '建議',
        '商品名稱',
        '價格：由高到低',
        '價格：由低到高',
        '上架時間：由新到舊',
        '上架時間：由舊到新',
    ];

    const navbarToggle = () => {
        setToggleIcon(!toggleIcon);
        menuRef.current.classList.toggle('menu-show');
        menuBgRef.current.classList.toggle('menu-show');
    };

    const handleChangeSorting = (e) => {
        setSortingValue(e.target.value);
        dispatch(updateSorting(e.target.value));
    };

    const handleKeyDownSearch = (e) => {
        if (e.key === 'Enter') {
            let searchData = {
                isSearch: true,
                searchText: searchValue,
            };
            dispatch(changeSearch(searchData)); // 按下確認直接觸發搜尋
        }
    };

    useEffect(() => {
        setSearchValue(searchRedux.searchText);
    }, [searchRedux.searchText]);

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
        dispatch(changeCategory(e.target.value));
    };

    useEffect(() => {
        setCategory(categoryRedux.category);
    }, [categoryRedux.category]);

    const handleFetchAllProducts = useCallback(async () => {
        try {
            const result = await clientFetchAllProducts();
            const filterCategory = result?.data?.products?.map((product) => product.category);
            const removeDuplicates = [...new Set(filterCategory)].sort((x, y) => y.localeCompare(x));
            setCategoryList(removeDuplicates);
        } catch (error) {
            inputToastMessage(error?.response?.data);
        }
    }, []);

    useEffect(() => {
        handleFetchAllProducts();
    }, [handleFetchAllProducts]);

    const handleSearchContainer = () => {
        setMenuOpen(!menuOpen);
        setSearchContainer(true);
        menuRef.current.classList.toggle('search-menu-first-show');
    };

    useEffect(() => {
        if (window.innerWidth <= 992) {
            setSearchContainer(false); // 更換 class 名稱
        }
    }, [searchContainer]);

    return (
        <div
            className="search-sticky bg-white w-100"
            style={{
                position: 'sticky',
                top: `${navbar.height - 1}px`, // RWD選單時也可以悬停搜尋欄位
                zIndex: 50,
                height: `50px`,
            }}
        >
            <div
                className="bg-white sidebar-collapse-icon "
                onClick={() => handleSearchContainer()}
                title={menuOpen ? '展開篩選條件區塊' : '收合篩選條件區塊'}
            >
                {menuOpen ? (
                    <TbLayoutSidebarRightCollapse
                        style={{
                            width: `2.5rem`,
                            height: `2.5rem`,
                        }}
                    />
                ) : (
                    <TbLayoutSidebarLeftCollapse
                        style={{
                            width: `2.5rem`,
                            height: `2.5rem`,
                        }}
                    />
                )}
            </div>
            <div className="search-navbar-container " ref={searchContainerRef}>
                {/* <input type='checkbox' id='search-check' /> */}
                <label htmlFor="search-check" className="search-menu-btn" onClick={() => navbarToggle()}>
                    <span className="me-2">篩選</span>
                    {toggleIcon ? <BsXLg className="search-menu-icon" /> : <IoMdFunnel className="search-menu-icon" />}
                </label>
                <nav className="">
                    <ul className={`${searchContainer ? 'search-menu-first' : 'search-menu '} mb-0`} ref={menuRef}>
                        <li>
                            <div
                                className={` search-menu-items d-flex flex-column justify-content-center align-items-center  ${
                                    categoryRedux?.category || searchRedux?.searchText ? '' : ''
                                }`}
                            >
                                {categoryRedux?.category ? (
                                    <div className=" d-flex justify-content-start justify-content-lg-center align-items-center w-100 ">
                                        當前類別：
                                        <mark className="position-relative border border-2 user-select-none bg-white pe-4">
                                            {categoryRedux.category}
                                            <BsXSquare
                                                className="closure-icon position-absolute top-50 end-0 translate-middle-y"
                                                role="button"
                                                title="清除類別選擇"
                                                onClick={() => {
                                                    navbarToggle();
                                                    dispatch(removeCategory());
                                                }}
                                            />
                                        </mark>
                                    </div>
                                ) : searchRedux?.searchText ? (
                                    <div className="d-flex justify-content-start justify-content-lg-center align-items-center ">
                                        當前搜尋：
                                        <mark className="position-relative border border-2 user-select-none bg-white ps-4 pe-5">
                                            {searchRedux.searchText}
                                            <BsXSquare
                                                className="closure-icon position-absolute top-50 end-0 translate-middle-y"
                                                role="button"
                                                title="清除搜尋目標"
                                                onClick={() => {
                                                    navbarToggle();
                                                    dispatch(removeSearch());
                                                }}
                                            />
                                        </mark>
                                    </div>
                                ) : null}
                            </div>
                        </li>
                        <li>
                            <div className="search-menu-items form-floating  ">
                                <select
                                    name="category"
                                    id="searchCategory"
                                    className="form-select"
                                    onChange={(e) => handleChangeCategory(e)}
                                    value={category}
                                    disabled={searchRedux.searchText !== '' ? true : false}
                                >
                                    <option className="bg-dark text-white" value="" disabled>
                                        {searchRedux.searchText !== '' ? '不可選擇' : ' 開始選擇'}
                                    </option>
                                    {categoryList?.map((item) => (
                                        <option className="bg-dark text-white fs-6" value={item} key={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="searchCategory">使用類別搜尋</label>
                            </div>
                        </li>
                        <li>
                            <div className="search-menu-items form-floating ">
                                <select
                                    name="category"
                                    id="searchCategory"
                                    className="form-select"
                                    onChange={(e) => handleChangeSorting(e)}
                                    value={sortingValue}
                                >
                                    {sortingList.map((item) => (
                                        <option className="bg-dark text-white fs-6" value={item} key={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="searchCategory">商品排序</label>
                            </div>
                        </li>
                        <li>
                            <div className="search-menu-items form-floating ">
                                <input
                                    type="search"
                                    className="form-control"
                                    id="searchInput"
                                    placeholder="關鍵字搜尋"
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onKeyDown={handleKeyDownSearch}
                                    value={searchValue}
                                    disabled={categoryRedux.category !== '' ? true : false}
                                />
                                <label htmlFor="searchInput">關鍵字搜尋</label>
                            </div>
                        </li>
                    </ul>
                    <div className="search-blur-bg " ref={menuBgRef} onClick={() => navbarToggle()}></div>
                </nav>
            </div>
        </div>
    );
};
export default ProductsSearchSection;
