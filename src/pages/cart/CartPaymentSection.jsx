import { useLocation, useNavigate } from 'react-router-dom';
import ValidationSelectGroup from '../../components/ReactHookForm/ValidationSelectGroup';
import useMessage from '../../hooks/useMessage';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { clientFetchOrder, clientPaymentOrder } from '../../api/clientApis';
import usePriceToTw from '../../hooks/usePriceToTw';
import { BsCheckAll } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoadingState } from '../../store/slice/loadingSlice';
import { useCallback } from 'react';

const CartPaymentSection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [orderId, setOrderId] = useState([]);
    const { handlePriceToTw } = usePriceToTw();
    const { inputToastMessage } = useMessage();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            paymentMethod: '',
        },
        mode: 'onTouched',
    });
    const [order, serOrder] = useState({});
    const dispatch = useDispatch();

    const handleFetchOrder = useCallback(async () => {
        try {
            if (location.state === null) {
                return;
            }
            dispatch(updateLoadingState(true));
            const result = await clientFetchOrder(location.state);
            const newOrder = {
                ...result?.data?.order,
                products: Object.values(result?.data?.order?.products), // 把物件格式轉成陣列格式
            };
            serOrder(newOrder);
            dispatch(updateLoadingState(false));
        } catch (error) {
            inputToastMessage(error?.response?.data);
            dispatch(updateLoadingState(false));
        }
    }, []);

    useEffect(() => {
        handleFetchOrder();
    }, [location, handleFetchOrder]);

    const handleSubmitForm = async (data) => {
        try {
            location.state = null;
            Swal.fire({
                icon: 'info',
                title: `付款中`,
                showConfirmButton: false,
                allowEscapeKey: false,
                didOpen: async () => {
                    try {
                        Swal.showLoading();
                        const result = await clientPaymentOrder(order.id);
                        Swal.hideLoading();
                        Swal.update({
                            icon: 'success',
                            title: `${result.data.message}`,
                            showConfirmButton: true,
                            confirmButtonColor: '#111c30',
                            confirmButtonText: '確認',
                        });
                    } catch (error) {
                        Swal.hideLoading();
                        Swal.update({
                            icon: 'error',
                            title: '付款失败',
                            text: error,
                            showConfirmButton: true,
                        });
                    }
                },
                allowOutsideClick: () => !Swal.isLoading(),
            }).then((result) => {
                if (result.isConfirmed) {
                    reset();
                    window.history.replaceState(null, null, window.location.href); // 跳轉後回到上一頁不帶 state 狀態
                    navigate('/account/orders', { state: null });
                }
            });
        } catch (error) {
            inputToastMessage(error?.response?.data);
        }
    };

    const paymentList = [
        { text: '信用卡一次付清' },
        { text: '信用卡分期' },
        { text: '信用卡紅利折抵' },
        { text: '行動支付' },
        { text: 'ATM轉帳(4小時內付款)' },
        { text: '超商付款' },
        { text: '中租銀角零卡' },
        { text: '銀聯卡' },
    ];

    if (Object.keys(order).length === 0) {
        return <div className='my-5 fs-5'>無訂單資料</div>;
    }

    return (
        <div className='mb-3 pb-3'>
            <div className='row flex-column-reverse flex-lg-row'>
                <div className='col-12 col-lg-6 mt-3'>
                    <h4 className=' fs-5 '>結帳</h4>
                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                        <ValidationSelectGroup
                            id='paymentMethod'
                            labelText='選擇付款方式'
                            groupClass='py-2'
                            labelClass='form-label mb-1'
                            selectClass='form-control'
                            errors={errors}
                            register={register}
                            rules={{
                                required: { value: true, message: '必須選擇付款方式' },
                            }}
                            defaultValue=''
                        >
                            <option className='bg-dark text-white' value=''>
                                請選擇付款方式
                            </option>
                            {paymentList.map((items) => (
                                <option value={items.text} key={items.text} className='bg-dark text-white'>
                                    {items.text}
                                </option>
                            ))}
                        </ValidationSelectGroup>
                        <input
                            type='submit'
                            value='確認付款'
                            className='btn btn-primary btn-primary-hover float-end mt-2 mb-3'
                            style={{ width: `120px` }}
                        />
                    </form>
                </div>
                <div className='col-12 col-lg-6 '>
                    <div className='border border-2 p-3'>
                        <h4 className='border-bottom border-2 border-primary fs-5 pb-2'>寄送資料明細</h4>
                        <div className='row mt-3'>
                            <div className='col-4'>
                                <div>姓名</div>
                                <div>電子信箱</div>
                                <div>寄送地址</div>
                                <div>聯絡人電話</div>
                            </div>
                            <div className='col-8'>
                                <div>{order?.user?.name}</div>
                                <div>{order?.user?.email}</div>
                                <div>{order?.user?.address}</div>
                                <div>{order?.user?.tel}</div>
                            </div>
                        </div>
                    </div>
                    <div className='border border-2 mt-4 p-3'>
                        <h4 className='border-bottom border-2 border-primary fs-5 pb-2'>訂單明細</h4>
                        {order?.products?.map((items) => (
                            <div className='row mt-3 border-bottom border-2 pb-3' key={items.id}>
                                <div className='col-3'>
                                    <img
                                        src={items.product.imageUrl}
                                        alt={items.product.title}
                                        title={items.product.title}
                                        style={{ width: `75px`, height: `75px` }}
                                    />
                                </div>
                                <div className='col-7'>
                                    <div className='d-flex justify-content-center align-items-start flex-column'>
                                        <span>{items.product.title}</span>
                                        <span className='text-muted fs-7'>總價：NT{handlePriceToTw(items.total)}</span>
                                    </div>
                                </div>
                                <div className='col-2'>
                                    <div className='d-flex justify-content-center align-items-start flex-column '>
                                        <span>x {items.qty}</span>
                                        <span className='opacity-0 fs-7'>|</span>
                                    </div>
                                </div>
                                <div className='col-8'>
                                    {items?.coupon?.code ? (
                                        <span className='mt-1 text-danger float-start d-flex align-items-center'>
                                            <BsCheckAll className='icon me-1' />
                                            使用優惠：{items?.coupon?.code}
                                        </span>
                                    ) : null}
                                </div>
                                <div className='col-4'>
                                    <span className='mt-1 fw-border float-end'>
                                        NT{handlePriceToTw(items.final_total)}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className='row row-cols-2 pt-3'>
                            <div className='col'>
                                <span className='fs-3 fw-bolder'>訂單總額</span>
                            </div>
                            <div className='col'>
                                <span className='float-end fs-3 fw-bolder'>NT{handlePriceToTw(order.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CartPaymentSection;
