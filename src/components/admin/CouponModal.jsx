import { useEffect, useState } from 'react';
import { adminAddCoupon, adminPutCoupon } from '../../api/adminApis';
import InputGroup from '../InputGroup';
import useMessage from '../../hooks/useMessage';
import { memo } from 'react';

import PropTypes from 'prop-types';

const CouponModal = memo(function CouponModal({
    handleCancelCouponModal,
    fetchCoupons,
    modalOpenType,
    editCouponTarget,
    checkAdminAuth,
}) {
    const initialValue = {
        title: '',
        is_enabled: 0,
        percent: '',
        due_date: new Date().toISOString().split('T')[0], // 初始純取都是 yyyy-mm-dd 格式，新增修改時才更新成 unix 時間戳
        code: '',
    };
    const [coupons, setCoupons] = useState(initialValue);
    const { inputToastMessage } = useMessage();
    const [checkAuth, setCheckAuth] = useState(false);

    const allFieldsFilled = Object.values(coupons).every((value) => value !== ''); // 監控是否都填寫完畢

    useEffect(() => {
        if (modalOpenType === 'create') {
            setCoupons(initialValue);
        } else if (modalOpenType === 'edit') {
            setCoupons({
                ...editCouponTarget,
                due_date: new Date(editCouponTarget.due_date).toISOString().split('T')[0], // 編輯將 unix 轉換 yyyy-mm-dd 格式
            });
        }
    }, [modalOpenType, editCouponTarget]);

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        if (name === 'percent') {
            const couponMinPercent = 0;
            if (value <= couponMinPercent) {
                setCoupons({
                    ...coupons,
                    [name]: couponMinPercent,
                });
            } else {
                setCoupons({
                    ...coupons,
                    [name]: parseInt(value),
                });
            }
        } else if (name === 'is_enabled') {
            setCoupons({
                ...coupons,
                [name]: +e.target.checked, // 因傳入 api 參數限制 1 or 0
            });
        } else if (name === 'due_date') {
            setCoupons({
                ...coupons,
                [name]: new Date(value).toISOString().split('T')[0], // 為了編輯時改成 yyyy-mm-dd
            });
        } else {
            setCoupons({
                ...coupons,
                [name]: value,
            });
        }
    };

    const handleSubmitAddCoupon = async () => {
        const newCoupons = { ...coupons, due_date: new Date(coupons.due_date).getTime() }; // 將到期時間 yyyy-dd-mm 轉換 unix 時間戳
        try {
            setCheckAuth(true);
            await checkAdminAuth();
            let typeToggle = modalOpenType === 'create' ? true : false;
            let result;
            if (typeToggle) {
                result = await adminAddCoupon(newCoupons);
            } else {
                result = await adminPutCoupon(newCoupons, newCoupons.id);
            }
            inputToastMessage(result);
            fetchCoupons();
            handleCancelCouponModal();
        } catch (error) {
            inputToastMessage(error?.response?.data);
        } finally {
            handleCancelCouponModal();
            setCheckAuth(false);
        }
    };

    return (
        <div
            className='modal fade'
            id='couponModal' // 與 Bootstrap Modal 綁定
        >
            <div className='modal-dialog modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title fw-bolder'>
                            {modalOpenType === 'create' ? '新增優惠卷' : `編輯優惠卷：${editCouponTarget.title}`}
                        </h5>
                        <button
                            type='button'
                            className='btn-close'
                            onClick={() => handleCancelCouponModal()}
                            aria-label='Close'
                        ></button>
                    </div>
                    <div className='modal-body'>
                        <div className=''>
                            <InputGroup
                                name='title'
                                id='couponTitle'
                                type='text'
                                title='標題'
                                groupClass='mb-3'
                                labelClass='form-label fw-bolder'
                                inputClass='form-control'
                                onChange={handleChangeValue}
                                value={coupons.title || ''}
                                placeholder='請輸入標題'
                            />

                            <div className='row g-3'>
                                <div className='col-6'>
                                    <InputGroup
                                        name='percent'
                                        id='couponPercent'
                                        type='number'
                                        title='折扣 (%)'
                                        groupClass='mb-3'
                                        labelClass='form-label fw-bolder'
                                        inputClass='form-control'
                                        onChange={handleChangeValue}
                                        value={coupons.percent || ''}
                                        placeholder='請輸入折扣 (%)'
                                    />
                                </div>
                                <div className='col-6'>
                                    <InputGroup
                                        name='due_date'
                                        id='couponDueDate'
                                        type='date'
                                        title='到期日'
                                        groupClass='mb-3'
                                        labelClass='form-label fw-bolder'
                                        inputClass='form-control'
                                        onChange={handleChangeValue}
                                        value={coupons.due_date || ''}
                                    />
                                </div>
                                <div className='col-6 mt-0'>
                                    <InputGroup
                                        name='code'
                                        id='couponCode'
                                        type='text'
                                        title='優惠碼'
                                        groupClass='mb-3'
                                        labelClass='form-label fw-bolder'
                                        inputClass='form-control'
                                        onChange={handleChangeValue}
                                        value={coupons.code || ''}
                                        placeholder='請輸入優惠碼'
                                    />
                                </div>
                                <div className='col-12 mt-0'>
                                    <InputGroup
                                        name='is_enabled'
                                        id='couponEnabled'
                                        type='checkbox'
                                        title='是否啟用'
                                        groupClass='form-check mb-3'
                                        labelClass='form-check-label'
                                        inputClass='form-check-input'
                                        onChange={handleChangeValue}
                                        checked={Boolean(coupons.is_enabled)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' onClick={() => handleCancelCouponModal()}>
                            關閉
                        </button>
                        <button
                            type='button'
                            className='btn btn-primary '
                            onClick={() => handleSubmitAddCoupon()}
                            disabled={!allFieldsFilled || checkAuth}
                        >
                            {checkAuth && (
                                <div className='spinner-border spinner-border-sm me-2 ' role='status'>
                                    <span className='visually-hidden'>Loading...</span>
                                </div>
                            )}
                            {modalOpenType === 'create'
                                ? checkAuth
                                    ? '檢查中'
                                    : '新增'
                                : checkAuth
                                ? '檢查中'
                                : '儲存'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

CouponModal.propTypes = {
    handleCancelCouponModal: PropTypes.func,
    fetchCoupons: PropTypes.func,
    modalOpenType: PropTypes.oneOf(['create', 'edit']),
    editCouponTarget: PropTypes.object,
    checkAdminAuth: PropTypes.func,
};
export default CouponModal;
