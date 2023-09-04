import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import ValidationSelectGroup from '../ReactHookForm/ValidationSelectGroup';
import { memo } from 'react';
import PropTypes from 'prop-types';

const AccountPaymentModal = memo(function AccountPaymentModal({ show, handleClose, order, handlePaymentOrder }) {
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

    const handleSubmitForm = async (data) => {
        handlePaymentOrder(order.id, data);
        reset();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>訂單付款：{order.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(handleSubmitForm)}>
                    <ValidationSelectGroup
                        id='paymentMethod'
                        labelText='付款方式'
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
                        value='付款'
                        className='btn btn-primary btn-primary-hover float-end'
                        style={{ width: `80px` }}
                    />
                </form>
            </Modal.Body>
        </Modal>
    );
});

AccountPaymentModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func,
    order: PropTypes.object,
    handlePaymentOrder: PropTypes.func,
};
export default AccountPaymentModal;
