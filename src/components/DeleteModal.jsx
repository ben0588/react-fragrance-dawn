import { memo } from 'react';
import PropTypes from 'prop-types';

const DeleteModal = memo(function DeleteModal({ handleCancelDeleteModal, handleDelete, title, type, id }) {
    return (
        <div className='modal' id='deleteModal'>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header bg-danger'>
                        <h5 className='modal-title text-white'>
                            {type === 'article' ? '確認刪除文章' : '確認刪除商品'}
                        </h5>
                        <button
                            type='button'
                            className='btn-close'
                            aria-label='Close'
                            onClick={() => handleCancelDeleteModal()}
                        ></button>
                    </div>
                    <div className='modal-body '>
                        <p className='m-0'>
                            {type === 'article' ? '您正操作刪除文章名稱' : '您正操作刪除商品名稱'}：「{title}」
                        </p>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' onClick={() => handleCancelDeleteModal()}>
                            取消
                        </button>
                        <button type='button' className='btn btn-danger' onClick={() => handleDelete(id)}>
                            確認刪除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

DeleteModal.propTypes = {
    handleCancelDeleteModal: PropTypes.func,
    handleDelete: PropTypes.func,
    title: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
};

export default DeleteModal;
