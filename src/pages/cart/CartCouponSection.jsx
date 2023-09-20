import Swal from 'sweetalert2';
import InputGroup from '../../components/InputGroup';
import { useEffect, useState } from 'react';
import useMessage from '../../hooks/useMessage';
import { useRemoveCartsMutation } from '../../store/store';
import { useAddCouponCartMutation, useFetchCartsQuery } from '../../store/apis/cartApi';

const CartCouponSection = () => {
    const [coupon, setCoupon] = useState('');
    const [useCoupon, setUseCoupon] = useState(false);
    const { inputToastMessage } = useMessage();
    const [removeCarts] = useRemoveCartsMutation();
    const [addCoupon, addCouponResult] = useAddCouponCartMutation();
    const { data } = useFetchCartsQuery();

    useEffect(() => {
        const newCoupon = data.data.carts.filter((item) => item.coupon && item.coupon);
        if (newCoupon.length) {
            setCoupon(newCoupon[0].coupon.code);
            setUseCoupon(true);
        }
    }, [data]);

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
                    return await removeCarts();
                } catch (error) {
                    Swal.showValidationMessage(`請求失敗： ${error}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result?.value?.data?.success) {
                Swal.fire({
                    icon: 'success',
                    title: '成功',
                    text: `購物車商品${result?.value?.data?.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                setCoupon('');
            }
        });
    };

    const handleUseOfferCode = async (coupon) => {
        try {
            const data = {
                code: coupon,
            };
            const result = await addCoupon(data);
            inputToastMessage({
                success: true,
                type: 'default',
                message: `✨ ${result.data.message}`,
                position: 'top-left',
            });
        } catch (error) {
            inputToastMessage(error?.response?.data);
        }
    };

    return (
        <>
            <InputGroup
                name="code"
                id="coupon"
                type="text"
                title="使用優惠碼"
                groupClass="mb-3 mt-3"
                labelClass="form-label d-block"
                inputClass="form-control d-inline-block"
                inputStyle={{ width: `200px` }}
                onChange={(e) => setCoupon(e.target.value)}
                value={coupon}
                placeholder="請輸入優惠碼"
                disabled={addCouponResult.isLoading || coupon !== ''}
            >
                <button
                    type="button"
                    className="form-control d-inline-block bg-primary  btn-primary-hover ms-1 text-white"
                    style={{ width: `100px` }}
                    title="請輸入優惠碼"
                    value={coupon}
                    onClick={(e) => handleUseOfferCode(e.target.value)}
                    disabled={addCouponResult.isLoading || coupon === '' || useCoupon}
                >
                    套用折扣
                </button>
                {useCoupon && (
                    <button
                        type="button"
                        className="form-control d-inline-block bg-secondary  btn-primary-hover mt-2 text-white"
                        style={{ width: `100px` }}
                        onClick={() => handleRemoveCoupon()}
                    >
                        清除折扣
                    </button>
                )}
            </InputGroup>
            <div className="fs-6 mt-4"> 當前可使用優惠卷：</div>
            <div className="table-responsive">
                <table className="table">
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
                                        type="button"
                                        className={`btn text-ellipsis py-1 ${
                                            coupon === item.coupon ? 'btn-primary' : 'btn-outline-primary'
                                        }`}
                                        onClick={() => handleUseOfferCode(item.coupon)}
                                        disabled={addCouponResult.isLoading || coupon === item.coupon ? true : false}
                                    >
                                        {addCouponResult.isLoading &&
                                        addCouponResult.originalArgs.code === item.coupon ? (
                                            <>
                                                <div className="spinner-border spinner-border-sm" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </>
                                        ) : null}
                                        {coupon === item.coupon ? '代碼使用中' : '使用代碼'}
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
