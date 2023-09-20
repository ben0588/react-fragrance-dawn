import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useMessage from '../../hooks/useMessage';
import { updateLoadingState } from '../../store/slice/loadingSlice';
import { useCallback } from 'react';

const SalePage = () => {
    const [sales, setSales] = useState([]);
    const dispatch = useDispatch();
    const { inputToastMessage } = useMessage();
    const loading = useSelector((state) => state.loading);

    const handleFetchSales = useCallback(async () => {
        try {
            dispatch(updateLoadingState(true));
            const result = await axios({
                method: 'GET',
                baseURL: null,
                // url: '/src/data/sale.json',
                url: 'https://ben0588.github.io/react-fragrance-dawn/sale.json',
                'Content-Type': 'application/json',
            });

            setSales(result.data);
            setTimeout(() => {
                dispatch(updateLoadingState(false));
            }, 1000);
        } catch (error) {
            inputToastMessage(error?.response?.data);
            dispatch(updateLoadingState(false));
        }
    }, [dispatch, inputToastMessage]);

    useEffect(() => {
        handleFetchSales();
    }, [handleFetchSales]);
    return (
        <div className="container my-5 px-2">
            <div className="row g-3">
                {loading.isLoading ? (
                    <div>isLoading</div>
                ) : (
                    sales?.map((item) => (
                        <div className="col-sm-6 col-md-4 col-xl-3 " key={item.id}>
                            <Link to="/products" className="hover-opacity text-decoration-none" title="前往查看">
                                <div className="card  border-none h-100 ">
                                    <img
                                        src={item.imageUrl}
                                        className="card-img-top object-fit-cover"
                                        alt={item.content}
                                    />
                                    <div className="card-body ps-0">
                                        <h5 className="card-title fw-bolder"> {item.title}</h5>
                                        <p className="card-text text-muted py-3">{item.content}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default SalePage;
