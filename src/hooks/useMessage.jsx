import { toast } from 'react-toastify';

const useMessage = () => {
    const initialOption = {
        position: 'top-right', // 顯示位置
        autoClose: 2000, // 讀取秒數，false則不顯示進度條
        hideProgressBar: false, // 隱藏進度條
        closeOnClick: true, // 支持點擊關閉
        pauseOnHover: false, // 滑鼠懸停時暫停
        pauseOnFocusLoss: false, // 畫面切換時暫停
        draggable: true, // 支持左右拖曳關閉
        theme: 'colored', // 主題:colored、dark、light
    };
    /*
        - 更多 react-toastify 功能支持，參考官網：
            https://fkhadra.github.io/react-toastify/introduction/

        <ToastContainer />
    */
    const inputToastMessage = (props) => {
        if (props?.success) {
            let type = props.type ?? 'success';
            if (props.type === 'default') {
                return toast(props.message, { ...initialOption, position: props.position ?? initialOption.position });
            } else {
                return toast[type](props.message, initialOption);
            }
        } else {
            return toast['error'](
                Array.isArray(props.message) ? props.message.join('、') : props.message,
                initialOption
            );
        }
    };

    const toastPromiseMessage = (fetch) => {
        return toast.promise(fetch, {
            pending: '獲取資料中',
            success: '資料更新成功👌',
            error: '失敗更新失敗🤯',
        });
    };

    return { inputToastMessage, toastPromiseMessage };
};
export default useMessage;
