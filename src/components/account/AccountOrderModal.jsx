import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import usePriceToTw from '../../hooks/usePriceToTw';

const AccountOrderModal = ({ show, handleClose, order }) => {
    const { handlePriceToTw } = usePriceToTw();

    const filterCarts = Object.entries(order.products ? order.products : {}).map((item) => item[1]);

    return (
        <div>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span>訂單：{order.id}</span>

                        {order.is_paid ? <div className='text-success '>付款完成</div> : <div>未付款</div>}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-3'>姓名</div>
                        <div className='col-9'>{order?.user?.name}</div>
                        <div className='col-3 mt-2'>郵箱</div>
                        <div className='col-9 mt-2'>{order?.user?.email}</div>
                        <div className='col-3 mt-2'>連絡電話</div>
                        <div className='col-9 mt-2'>{order?.user?.tel}</div>
                        <div className='col-3 mt-2'>寄送地址</div>
                        <div className='col-9 mt-2'>{order?.user?.address}</div>
                    </div>
                    <table className='table align-middle mt-5'>
                        <thead>
                            <tr>
                                <th>名稱</th>
                                <th>數量</th>
                                <th>總價</th>
                                <th>折扣</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterCarts?.map((cart) => (
                                <tr key={cart.id}>
                                    <td>{cart?.product?.title}</td>
                                    <td>{cart?.qty}</td>
                                    <td>{handlePriceToTw(cart?.final_total)}</td>
                                    <td>{cart?.coupon?.code ? cart?.coupon?.code : null}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className='text-end fs-5 fw-bolder pe-4' colSpan={4}>
                                    合計：NT{handlePriceToTw(order.total)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        離開
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default AccountOrderModal;