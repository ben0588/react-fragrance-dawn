import { Toast, ToastContainer } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, closeMessage } from '../store/slice/messageSlice';
import { memo } from 'react';

const ReactBootstrapToast = memo(function ReactBootstrapToast() {
    const message = useSelector((state) => state.message);
    const dispatch = useDispatch();
    return (
        <>
            <ToastContainer position='top-end' className='p-3' style={{ zIndex: 1 }}>
                {message?.map((item) => (
                    <Toast
                        onClose={() =>
                            dispatch(
                                closeMessage({
                                    ...item,
                                    open: false,
                                })
                            )
                        }
                        key={item.id}
                        show={item.open}
                        // delay={2000}
                        // autohide
                        className='fw-bolder'
                    >
                        <Toast.Header className={`text-white bg-${item.type} `}>
                            <strong className='me-auto'>{item.title}</strong>
                        </Toast.Header>
                        <Toast.Body className='bg-blur'>{item.text}</Toast.Body>
                    </Toast>
                ))}
            </ToastContainer>
        </>
    );
});
export default ReactBootstrapToast;
