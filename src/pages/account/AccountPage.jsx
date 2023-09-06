import { useDispatch, useSelector } from 'react-redux';
import { updateBulletinState } from '../../store/slice/bulletinSlice';
import useMessage from '../../hooks/useMessage';

const AccountPage = () => {
    const dispatch = useDispatch();
    const bulletin = useSelector((state) => state.bulletin);
    const { inputToastMessage } = useMessage();

    return (
        <div className="p-3 mb-3">
            <h4 className="fw-bolder pb-0">帳戶中心</h4>
            <hr />
            <p>親愛的會員_XXX_你好，歡迎回來</p>
            <hr />
            <div className="mb-2">
                公告開啟狀態：
                {bulletin.open ? '開啟中' : '關閉中'}
            </div>
            <div>{bulletin.open ? '感謝您的支持，請留意更多優惠通知！' : '可開啟接受更多優惠訊息與通知，謝謝！'}</div>
            <button
                type="button"
                className={`btn btn-dark mt-2`}
                onClick={() => {
                    dispatch(updateBulletinState(!bulletin.open));
                    if (bulletin.open) {
                        inputToastMessage({
                            success: true,
                            type: 'default',
                            message: '🌪️ 關閉通知成功',
                            position: 'top-left',
                        });
                    } else {
                        inputToastMessage({
                            success: true,
                            type: 'default',
                            message: '🌞 開啟通知成功',
                            position: 'top-left',
                        });
                    }
                }}
            >
                {bulletin.open ? '關閉通知' : '開啟通知'}
            </button>
        </div>
    );
};
export default AccountPage;
