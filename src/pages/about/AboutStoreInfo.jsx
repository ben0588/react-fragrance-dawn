import axios from 'axios';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateLoadingState } from '../../store/slice/loadingSlice';
import useMessage from '../../hooks/useMessage';
const AboutStoreInfo = () => {
    const [storeList, setStoreList] = useState([]);
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.loading);
    const { inputToastMessage } = useMessage();

    const handleFetchStore = useCallback(async () => {
        try {
            dispatch(updateLoadingState(true));
            const result = await axios({
                method: 'GET',
                baseURL: null,
                // url: '../../../src/data/storeInfo.json',
                url: 'https://ben0588.github.io/react-fragrance-dawn/storeInfo.json',
                'Content-Type': 'application/json',
            });
            setStoreList(result.data);
        } catch (error) {
            inputToastMessage(error.response.data);
        } finally {
            dispatch(updateLoadingState(false));
        }
    }, [dispatch, inputToastMessage]);

    useEffect(() => {
        handleFetchStore();
    }, [handleFetchStore]);

    return (
        <div>
            {isLoading.isLoading ? (
                <div>isLoading</div>
            ) : (
                <>
                    <h2 className="text-center">門市資訊</h2>
                    <p className="my-4">
                        「香氛晨光」目前在全國各地開設了多家門市，為顧客提供便捷的購物體驗，請參考以下門市地址與營業時間，也可以透過網路商城購買您喜愛的產品，以下是我們的門市資訊：
                    </p>
                    <div className="row">
                        {storeList?.map?.((items, index) => (
                            <div className="col-md-6 col-lg-4" key={index}>
                                <div className="card h-100 border-none">
                                    <div className="card-img-top">
                                        <img
                                            src={items.image}
                                            alt={items.title}
                                            className="w-100 object-fit-cover"
                                            style={{ height: `300px` }}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title fs-4 fw-bolder text-center">{items.title}</h3>
                                        <address className="d-flex align-items-center justify-content-center fs-6 m-0 pt-3 text-center">
                                            {items.address}
                                            <Link to={items.addressPath} target="_blank">
                                                <FaMapMarkerAlt className="icon-md ms-1" />
                                            </Link>
                                        </address>
                                        <a
                                            className="d-block text-decoration-none link-primary-hover fs-5 pb-3 text-center"
                                            href={`tel:+886-${
                                                items.tel.slice(1, 3) + items.tel.slice(3).replace('-', '')
                                            }`}
                                        >
                                            {items.tel}
                                        </a>
                                        <ul className="list-unstyled mt-2 text-center">
                                            {items.date.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
export default AboutStoreInfo;
