import Swal from 'sweetalert2';
import InputGroup from '../../components/InputGroup';
import { clientDeleteAllCarts, clientUseCoupon } from '../../api/clientApis';
import { useDispatch, useSelector } from 'react-redux';
import { removeCarts } from '../../store/slice/cartSlice';
import { updateCoupon, removeCoupon, updateLoading } from '../../store/slice/couponSlice';
import { useState } from 'react';
import useMessage from '../../hooks/useMessage';
import { useEffect } from 'react';

const CartCouponSection = ({ handleFetchCart }) => {
    const dispatch = useDispatch();
    const [coupon, setCoupon] = useState('');
    const couponRedux = useSelector((state) => state.coupon);
    const { inputToastMessage } = useMessage();

    const handleRemoveCoupon = () => {
        Swal.fire({
            title: '清除折扣?',
            text: '若要清除優惠卷折扣時將會清空購物車，可使用其他優惠覆蓋，確定執行?',
            icon: 'warning',
            confirmButtonColor: '#111c30',
            cancelButtonColor: '#b2bec3',
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            showCancelButton: true,
            showCloseButton: true,
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    return await clientDeleteAllCarts();
                } catch (error) {
                    Swal.showValidationMessage(`請求失敗： ${error}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('成功', result?.value?.data?.message, 'success');
                setCoupon('');
                dispatch(removeCarts());
                dispatch(removeCoupon());
                handleFetchCart();
            }
        });
    };

    const handleUseOfferCode = async (coupon) => {
        try {
            dispatch(updateLoading(true));
            const data = {
                code: coupon,
            };
            const result = await clientUseCoupon(data);
            const couponData = {
                isLoading: false,
                isSelected: true,
                code: coupon,
                finalTotal: result?.data?.data?.final_total,
            };
            dispatch(updateCoupon(couponData));
            handleFetchCart();
        } catch (error) {
            inputToastMessage(error?.response?.data);
            dispatch(updateLoading(false));
        }
    };

    return (
        <>
            <InputGroup
                name='code'
                id='coupon'
                type='text'
                title='使用優惠碼'
                groupClass='mb-3 mt-3 '
                labelClass='form-label d-block'
                inputClass='form-control d-inline-block'
                inputStyle={{ width: `200px` }}
                onChange={(e) => setCoupon(e.target.value)}
                value={couponRedux.code ? couponRedux.code : coupon}
                placeholder='請輸入優惠碼'
                disabled={couponRedux.code ? true : false}
                // 50%OFF
            >
                <button
                    type='button'
                    className='form-control d-inline-block bg-primary  btn-primary-hover text-white ms-1'
                    style={{ width: `100px` }}
                    title='使用優惠碼'
                    value={coupon}
                    onClick={(e) => handleUseOfferCode(e.target.value)}
                    disabled={couponRedux.code ? true : false}
                >
                    套用折扣
                </button>

                {couponRedux.code && (
                    <button
                        type='button'
                        className='form-control d-inline-block bg-secondary  btn-primary-hover text-white mt-2'
                        style={{ width: `100px` }}
                        onClick={() => handleRemoveCoupon()}
                    >
                        清除折扣
                    </button>
                )}
            </InputGroup>
            <div className='fs-6 mt-4'> 當前可使用優惠卷：</div>
            <div className='table-responsive'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>活動名稱</th>
                            <th>優惠碼</th>
                            <th>使用期限</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { name: '新會員折扣優惠', coupon: '20%OFF', date_at: '長期有效' },
                            { name: '舊會員折扣優惠', coupon: '50%OFF', date_at: '3月15日~4月15日' },
                        ].map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.coupon}</td>
                                <td>{item.date_at}</td>
                                <td>
                                    <button
                                        type='button'
                                        className='btn btn-outline-primary  text-ellipsis py-1'
                                        onClick={() => handleUseOfferCode(item.coupon)}
                                        disabled={couponRedux.code === item.coupon ? true : false}
                                    >
                                        {couponRedux.code === item.coupon ? '代碼使用中' : '使用代碼'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default CartCouponSection;
