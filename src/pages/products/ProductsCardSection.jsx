import { useEffect, useMemo, useState } from 'react';
import Card from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/Pagination';
import { clientFetchAllProducts, clientFetchCategoryProduct, clientFetchLimitedProducts } from '../../api/clientApis';
import useMessage from '../../hooks/useMessage';
import { updateLoadingState } from '../../store/slice/loadingSlice';
import { useCallback } from 'react';

const ProductsCardSection = () => {
    const [products, setProducts] = useState([]);
    const [initialProducts, setInitialProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const dispatch = useDispatch();
    const categoryRedux = useSelector((state) => state.category); // 類別搜尋
    const { inputToastMessage } = useMessage();
    const searchRedux = useSelector((state) => state.search);
    const sortingRedux = useSelector((state) => state.sorting);

    const handleFetchAllProducts = useCallback(async () => {
        try {
            dispatch(updateLoadingState(true));
            const result = await clientFetchAllProducts();
            setInitialProducts(result?.data?.products);
            dispatch(updateLoadingState(false));
        } catch (error) {
            inputToastMessage(error?.response?.data);
            dispatch(updateLoadingState(false));
        }
    }, [dispatch, inputToastMessage]);

    const handleFetchCategoryProducts = useCallback(
        async (page = 1, category) => {
            try {
                dispatch(updateLoadingState(true));
                const result = await clientFetchCategoryProduct(page, category);
                setProducts(result?.data?.products);
                setPagination(result?.data?.pagination);
                dispatch(updateLoadingState(false));
            } catch (error) {
                inputToastMessage(error?.response?.data);
                dispatch(updateLoadingState(false));
            }
        },
        [dispatch, inputToastMessage],
    );

    const fetchProducts = useCallback(
        async (page = 1) => {
            try {
                dispatch(updateLoadingState(true));
                const result = await clientFetchLimitedProducts(page);
                const { products, pagination } = result.data;
                setProducts(products);
                setPagination(pagination);
                dispatch(updateLoadingState(false));
            } catch (error) {
                inputToastMessage(error?.response?.data);
                dispatch(updateLoadingState(false));
            }
        },
        [dispatch, inputToastMessage],
    );

    useEffect(() => {
        handleFetchAllProducts(); // 初始取得全部商品用來關鍵字搜尋
    }, [fetchProducts, handleFetchAllProducts]);

    useEffect(() => {
        if (categoryRedux.category !== '') {
            // 類別選擇後重新搜尋
            handleFetchCategoryProducts(1, categoryRedux.category);
        } else {
            // 如果是空值在觸發一次重新取得商品
            fetchProducts();
        }
    }, [categoryRedux, fetchProducts, handleFetchCategoryProducts]);

    const filterSortProducts = useMemo(() => {
        // 切換類別後，都會更新同一個 products 資料，所以共用此方法
        return [...products].sort((x, y) =>
            sortingRedux.sorting === '商品名稱'
                ? x.title.localeCompare(y.title)
                : sortingRedux.sorting === '價格：由高到低'
                ? y.price - x.price
                : sortingRedux.sorting === '價格：由低到高'
                ? x.price - y.price
                : sortingRedux.sorting === '上架時間：由新到舊'
                ? null
                : sortingRedux.sorting === '上架時間：由舊到新'
                ? null
                : null,
        );
        // 資料內容尚未包含創建商品時間資料，未來新增後進行修改
    }, [products, sortingRedux.sorting]);

    const filterSearchProducts = useMemo(() => {
        // 由於搜尋資料是 All 商品，與初始、類別搜尋資內格式不同，故且分開寫
        let list;
        if (searchRedux.searchText !== '') {
            list = [...initialProducts].filter((product) => product.title.includes(searchRedux.searchText));
            if (sortingRedux.sorting === '' || sortingRedux.sorting === '建議') {
                return list;
            } else if (sortingRedux.sorting === '商品名稱') {
                return list.sort((x, y) => x.title.localeCompare(y.title));
            } else if (sortingRedux.sorting === '價格：由高到低') {
                return list.sort((x, y) => y.price - x.price);
            } else if (sortingRedux.sorting === '價格：由低到高') {
                return list.sort((x, y) => x.price - y.price);
            } else if (sortingRedux.sorting === '上架時間：由新到舊') {
                // 資料內容尚未包含創建商品資料
                return list;
            } else if (sortingRedux.sorting === '上架時間：由舊到新') {
                // 資料內容尚未包含創建商品資料
                return list;
            }
        }
    }, [initialProducts, searchRedux.searchText, sortingRedux.sorting]);

    return (
        <div className="container mb-3 pb-3 pt-1">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 mt-5">
                {searchRedux.isSearch ? (
                    filterSearchProducts.length ? (
                        filterSearchProducts?.map((product) => (
                            <div className="col" key={product.id}>
                                <Card product={product} />
                            </div>
                        ))
                    ) : (
                        <div className="text-danger fs-5 w-100">關鍵字搜尋不到相關商品，請重新進行搜尋</div>
                    )
                ) : (
                    filterSortProducts?.map((product) => (
                        <div className="col" key={product.id}>
                            <Card product={product} />
                        </div>
                    ))
                )}
            </div>

            <div className="pt-4">
                {!searchRedux.isSearch && (
                    <Pagination
                        // 當搜尋時因為獲取全部資料去搜尋的，所以分頁資料無法取得正確，故直接不顯示
                        changePage={categoryRedux.category === '' ? fetchProducts : handleFetchCategoryProducts}
                        category={pagination.category}
                        totalPage={pagination.total_pages}
                        currentPage={pagination.current_page}
                        isPre={pagination.has_pre}
                        isNext={pagination.has_next}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductsCardSection;
