import { useLocation, useNavigate } from 'react-router-dom';
import ValidationSelectGroup from '../../components/ReactHookForm/ValidationSelectGroup';
import useMessage from '../../hooks/useMessage';
import { useForm } from 'react-hook-form';
import usePriceToTw from '../../hooks/usePriceToTw';
import { BsCheckAll } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { useFetchOrderQuery, usePaymentOrderMutation } from '../../store/store';

const CartPaymentSection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { handlePriceToTw } = usePriceToTw();
    const { inputToastMessage } = useMessage();
    const { data, isLoading } = useFetchOrderQuery(location.state);
    const [payOrder] = usePaymentOrderMutation();

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

    const handleSubmitForm = async () => {
        try {
            Swal.fire({
                title: '確認付款?',
                text: '請確認付款內容正確後按下確認',
                icon: 'question',
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
                        return await payOrder(data.order.id);
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
                        text: `${result?.value?.data?.message}`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
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

    if (isLoading) {
        return <div className="fs-5 my-5">取得訂單資料中...</div>;
    }

    return (
        <div className="mb-3 pb-3">
            <div className="row flex-column-reverse flex-lg-row">
                <div className="col-lg-6 mt-3">
                    <h4 className="fs-5">結帳</h4>
                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                        <ValidationSelectGroup
                            id="paymentMethod"
                            labelText="選擇付款方式"
                            groupClass="py-2"
                            labelClass="form-label mb-1"
                            selectClass="form-control"
                            errors={errors}
                            register={register}
                            required={true}
                            rules={{
                                required: { value: true, message: '必須選擇付款方式' },
                            }}
                            defaultValue=""
                        >
                            <option className="bg-dark text-white" value="">
                                請選擇付款方式
                            </option>
                            {paymentList.map((items) => (
                                <option value={items.text} key={items.text} className="bg-dark text-white">
                                    {items.text}
                                </option>
                            ))}
                        </ValidationSelectGroup>
                        <input
                            type="submit"
                            value="確認付款"
                            className="btn btn-primary btn-primary-hover float-end mb-3 mt-2"
                            style={{ width: `120px` }}
                        />
                    </form>
                </div>
                <div className="col-lg-6">
                    <div className="border border-2 p-3">
                        <h4 className="border-bottom border-primary fs-5 border-2 pb-2">寄送資料明細</h4>
                        <div className="row mt-3">
                            <div className="col-4">
                                <div>姓名</div>
                                <div>電子信箱</div>
                                <div>寄送地址</div>
                                <div>聯絡人電話</div>
                            </div>
                            <div className="col-8">
                                <div>{data?.order?.user?.name}</div>
                                <div>{data?.order?.user?.email}</div>
                                <div>{data?.order?.user?.address}</div>
                                <div>{data?.order?.user?.tel}</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 border border-2 p-3">
                        <h4 className="border-bottom border-primary fs-5 border-2 pb-2">訂單明細</h4>
                        {Object.values(data?.order?.products || {}).map((items) => (
                            <div className="row border-bottom mt-3 border-2 pb-3" key={items.id}>
                                <div className="col-3">
                                    <img
                                        src={items.product.imageUrl}
                                        alt={items.product.title}
                                        title={items.product.title}
                                        style={{ width: `75px`, height: `75px` }}
                                    />
                                </div>
                                <div className="col-7">
                                    <div className="d-flex justify-content-center align-items-start flex-column">
                                        <span>{items.product.title}</span>
                                        <span className="text-muted fs-7">總價：NT{handlePriceToTw(items.total)}</span>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="d-flex justify-content-center align-items-start flex-column">
                                        <span>x {items.qty}</span>
                                        <span className="fs-7 opacity-0">|</span>
                                    </div>
                                </div>
                                <div className="col-8">
                                    {items?.coupon?.code ? (
                                        <span className="text-danger float-start d-flex align-items-center mt-1">
                                            <BsCheckAll className="icon me-1" />
                                            使用優惠：{items?.coupon?.code}
                                        </span>
                                    ) : null}
                                </div>
                                <div className="col-4">
                                    <span className="fw-border float-end mt-1">
                                        NT{handlePriceToTw(items.final_total)}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <div className="row row-cols-2 pt-3">
                            <div className="col">
                                <span className="fs-3 fw-bolder">訂單總額</span>
                            </div>
                            <div className="col">
                                <span className="float-end fs-3 fw-bolder">NT{handlePriceToTw(data?.order?.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CartPaymentSection;
