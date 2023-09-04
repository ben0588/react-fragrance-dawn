import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import usePriceToTw from '../../hooks/usePriceToTw';
import { useForm, useWatch } from 'react-hook-form';
import ValidationInputGroup from '../../components/ReactHookForm/ValidationInputGroup';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ValidationSelectGroup from '../../components/ReactHookForm/ValidationSelectGroup';
import { BsCheckAll, BsChevronDoubleLeft } from 'react-icons/bs';
import { clientCreateOrder } from '../../api/clientApis';
import useMessage from '../../hooks/useMessage';
import { removeCarts } from '../../store/slice/cartSlice';
import { removeCoupon } from '../../store/slice/couponSlice';
import { persistor } from '../../store/store';
import Swal from 'sweetalert2';

const CartCheckoutSection = () => {
    const [carts, setCarts] = useState([]);
    let { state } = useLocation();
    const couponRedux = useSelector((state) => state.coupon);
    const { handlePriceToTw } = usePriceToTw();
    const [isLoading, setIsLoading] = useState(false);
    const { inputToastMessage } = useMessage();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        control,
        reset,
        watch,
    } = useForm({
        defaultValues: {
            email: '',
            name: '',
            tel: '',
            address: '',
            city: '',
            area: '',
        },
        mode: 'onTouched',
    });
    const [taiwanAddress, setTaiwanAddress] = useState([]);

    useEffect(() => {
        if (couponRedux.total) {
            setCarts(state?.carts || []); // 調整傳入資料狀態清除
        } else {
            setCarts([]);
        }
    }, [state, couponRedux]);

    const handleSubmitForm = async (data) => {
        try {
            setIsLoading(true);
            const { name, email, tel, address, city, area } = data;
            const form = {
                data: {
                    user: {
                        name: name,
                        email: email,
                        tel: tel,
                        address: city + area + address,
                    },
                },
            };
            Swal.fire({
                title: '確認送出?',
                text: '配送資料填寫錯誤可能導致一些問題產生，確認寄送資料正確請按下確認',
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
                        return await clientCreateOrder(form);
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
                    dispatch(removeCarts());
                    dispatch(removeCoupon());
                    persistor.purge('coupon');
                    reset();
                    navigate('/cart/payment', { state: result.value.data.orderId });
                }
            });
        } catch (error) {
            inputToastMessage(error?.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFetchTaiwanAddress = useCallback(async () => {
        try {
            const twApiUrl =
                'https://raw.githubusercontent.com/donma/TaiwanAddressCityAreaRoadChineseEnglishJSON/master/CityCountyData.json';
            const result = await axios.get(twApiUrl);
            setTaiwanAddress(result.data);
        } catch (error) {
            inputToastMessage(error?.response?.data);
        }
    }, []);

    useEffect(() => {
        handleFetchTaiwanAddress();
    }, [handleFetchTaiwanAddress]);

    const filterAreaAddress = taiwanAddress.filter((city) => city.CityName === getValues('city'));

    // 監控中
    const useFormState = useWatch({ control });
    useEffect(() => {}, [useFormState]);

    // 監控是否表單所有內容已填寫
    const allFieldsFilled = Object.values(watch()).every((value) => value !== '');

    return (
        <div className='mb-3 pb-3'>
            <div className='row'>
                <div className='col-lg-8  pt-2 pb-3'>
                    <h4 className='border-bottom border-2 border-primary fs-5 pb-2'>配送資料</h4>
                    <form onSubmit={handleSubmit(handleSubmitForm)}>
                        <fieldset>
                            <legend>填寫寄送者資訊</legend>
                            <ValidationInputGroup
                                id='email'
                                type='email'
                                errors={errors}
                                register={register}
                                groupClass='mt-3'
                                labelText='Email'
                                labelClass='form-label mb-1'
                                inputClass='form-control'
                                placeholder='請輸入電子郵件'
                                required={true}
                                rules={{
                                    required: { value: true, message: '此欄位必填' },
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // 基於 RFC 5332 Email 正則表達式
                                        message: '未符合電子郵箱格式',
                                    },
                                }}
                            />
                            <ValidationInputGroup
                                id='name'
                                type='text'
                                errors={errors}
                                register={register}
                                groupClass='mt-3'
                                labelText='聯絡人姓名'
                                labelClass='form-label mb-1'
                                inputClass='form-control'
                                placeholder='請輸入聯絡人姓名'
                                required={true}
                                rules={{
                                    required: { value: true, message: '此欄位必填' },
                                    pattern: {
                                        // 任意
                                        value: /^[\u4E00-\u9FFF]*·*[\u4E00-\u9FFF]*$/, // 中文正則表達式
                                        message: '請填寫中文姓名',
                                    },
                                }}
                            />
                            <ValidationInputGroup
                                id='tel'
                                type='tel'
                                errors={errors}
                                register={register}
                                groupClass='mt-3'
                                labelText='聯絡手機'
                                labelClass='form-label mb-1'
                                inputClass='form-control'
                                placeholder='請輸入聯絡手機'
                                required={true}
                                rules={{
                                    required: { value: true, message: '此欄位必填' },
                                    pattern: {
                                        // 任意
                                        value: /^(0|\+?886)9\d{8}$/, // 台灣手機正則表達式
                                        message: '格式錯誤，請使用 09 或 886 前綴',
                                    },
                                }}
                            />
                            <ValidationSelectGroup
                                id='city'
                                errors={errors}
                                register={register}
                                labelText='縣市'
                                groupClass='mt-3'
                                labelClass='form-label mb-1'
                                selectClass='form-control'
                                required={true}
                                rules={{
                                    required: { value: true, message: '請選擇縣市' },
                                }}
                                defaultValue=''
                            >
                                <option value='' disabled>
                                    --請選擇縣市--
                                </option>
                                {taiwanAddress?.map((items) => (
                                    <option value={items.CityName} key={items.CityName}>
                                        {items.CityName}
                                    </option>
                                ))}
                            </ValidationSelectGroup>

                            <ValidationSelectGroup
                                id='area'
                                errors={errors}
                                register={register}
                                labelText='鄉/鎮/市/區'
                                groupClass='mt-3'
                                labelClass='form-label mb-1'
                                selectClass='form-control'
                                defaultValue=''
                                required={true}
                                rules={{
                                    required: { value: true, message: '請選擇鄉鎮市區' },
                                }}
                                disabled={getValues('city') ? false : true}
                            >
                                <option value='' disabled>
                                    --請選擇鄉鎮市區--
                                </option>
                                {filterAreaAddress?.[0]?.AreaList?.map((items) => (
                                    <option value={items.AreaName} key={items.AreaName}>
                                        {items.AreaName}
                                    </option>
                                ))}
                            </ValidationSelectGroup>

                            <ValidationInputGroup
                                id='address'
                                type='text'
                                errors={errors}
                                register={register}
                                groupClass='mt-3'
                                labelText='地址'
                                labelClass='form-label mb-1'
                                inputClass='form-control'
                                placeholder='請輸入配送地址'
                                required={true}
                                rules={{
                                    required: { value: true, message: '此欄位必填' },
                                    pattern: {
                                        value: /^[\u4e00-\u9fa5_(0-9|\uFF10-\uFF19)-]*$/,
                                        message: '請輸入地址',
                                    },
                                }}
                            />

                            <div className='d-flex justify-content-between align-items-center pt-3'>
                                <Link
                                    to='/cart'
                                    role='button'
                                    className='d-inline-block btn btn-secondary link-primary-hover'
                                >
                                    <BsChevronDoubleLeft className='icon me-1' />
                                    回到上一頁
                                </Link>
                                <input
                                    type='submit'
                                    className='btn btn-primary btn-primary-hover '
                                    value={isLoading ? '表單處理中' : '確認送出'}
                                    style={{ width: `120px` }}
                                    disabled={!allFieldsFilled || isLoading}
                                />
                            </div>
                        </fieldset>
                    </form>
                </div>
                <div className='col-lg-4 border border-2 py-2'>
                    <h4 className='border-bottom border-2 border-primary fs-5 pb-2'>購物車明細</h4>
                    {carts?.length
                        ? carts?.map((product) => (
                              <div key={product.id}>
                                  <div className='row mt-3 border-bottom border-2 pb-3'>
                                      <div className='col-3'>
                                          <img
                                              src={product.product.imageUrl}
                                              alt={product.product.title}
                                              title={product.product.title}
                                              style={{ width: `75px`, height: `75px` }}
                                          />
                                      </div>
                                      <div className='col-7'>
                                          <div className='d-flex justify-content-center align-items-start flex-column'>
                                              <span>{product.product.title}</span>
                                              <span className='text-muted fs-7'>
                                                  總價：NT{handlePriceToTw(product.total)}
                                              </span>
                                          </div>
                                      </div>
                                      <div className='col-2'>
                                          <div className='d-flex justify-content-center align-items-start flex-column '>
                                              <span>x {product.qty}</span>
                                              <span className='opacity-0 fs-7'>|</span>
                                          </div>
                                      </div>
                                      <div className='col-8'>
                                          {product?.coupon?.code ? (
                                              <span className='mt-1 text-danger float-start d-flex align-items-center'>
                                                  <BsCheckAll className='icon me-1' />
                                                  使用優惠：{product?.coupon?.code}
                                              </span>
                                          ) : null}
                                      </div>
                                      <div className='col-4'>
                                          <span className='mt-1 fw-border float-end'>
                                              NT{handlePriceToTw(product.final_total)}
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          ))
                        : '購物車內無商品'}

                    <div className='border-bottom border-2 border-primary pt-4 pb-2'>
                        <div className='row '>
                            <div className='col-6 text-start'>
                                <span className='fs-3 fw-bolder'>總價</span>
                            </div>
                            <div className='col-6 text-end'>
                                <span className='fs-3 fw-bolder'>NT{handlePriceToTw(couponRedux.finalTotal)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CartCheckoutSection;
