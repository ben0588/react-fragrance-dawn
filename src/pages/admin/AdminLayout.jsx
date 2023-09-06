import { Link, Outlet, useNavigate } from 'react-router-dom';
import ReactBootstrapToast from '../../components/ReactBootstrapToast';
import { removeAdminLogout } from '../../store/slice/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createAsyncMessage } from '../../store/slice/messageSlice';
import Loading from '../../components/Loading';
import { useEffect } from 'react';
import { useAdminLogoutMutation } from '../../store/store';

const AdminLayout = () => {
    const adminState = useSelector((state) => state.admin);
    const [adminLogout, result] = useAdminLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAdminLogout = async () => {
        // 處理權限不足時操作
        adminLogout(adminState.uid)
            .unwrap()
            .then((response) => {
                document.cookie = 'adminToken=;';
                dispatch(removeAdminLogout());
                dispatch(
                    createAsyncMessage({
                        ...response,
                        message: '成功登出',
                    }),
                );
                navigate('/admin');
            })
            .catch((error) => {
                dispatch(createAsyncMessage(error?.data));
                navigate('/admin');
            });
    };

    useEffect(() => {
        // 監控有效時間，無效時通知且登出管理員
        if (adminState.expired !== '' && adminState.expired <= new Date().getTime()) {
            dispatch(createAsyncMessage({ id: new Date().getTime(), message: '管理者時效已達，登出成功，請重新登入' }));
            handleAdminLogout();
        }
    }, [adminState]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container-fluid">
                    <Link
                        to="/admin"
                        className="text-white text-decoration-none mb-0"
                        onClick={(e) => e.preventDefault()}
                    >
                        FRAGRANCE DAWN 後台管理系統
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            {adminState.isLogin ? (
                                <>
                                    {adminState.expired && (
                                        <li className="nav-item d-flex justify-content-center align-items-center text-white ">
                                            <span className="me-3">
                                                管理者登入成功，有效時間：
                                                {new Date(adminState.expired).toLocaleString()}
                                            </span>
                                        </li>
                                    )}
                                    <li className="nav-item me-2">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-light fw-bolder px-3"
                                            onClick={handleAdminLogout}
                                            disabled={result.isLoading}
                                        >
                                            {result.isLoading && (
                                                <div className="spinner-border spinner-border-sm me-2 " role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            )}
                                            {result.isLoading ? '登出中' : '登出'}
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="dashboard" className="btn btn-sm btn-light fw-bolder px-3">
                                            管理
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to="login" className="btn btn-sm btn-light fw-bolder px-3">
                                            管理者登入
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet context={{ adminLogout: handleAdminLogout }} />
            <ReactBootstrapToast />
            <Loading />
        </div>
    );
};
export default AdminLayout;
