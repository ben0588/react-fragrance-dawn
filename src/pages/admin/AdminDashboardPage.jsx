import { NavLink, Outlet, useNavigate, useMatch, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactBootstrapToast from '../../components/ReactBootstrapToast';
import { useDispatch, useSelector } from 'react-redux';
import { createAsyncMessage } from '../../store/slice/messageSlice';
import { useAdminCheckMutation } from '../../store/store';

const AdminDashboardPage = () => {
    const navigate = useNavigate();
    const matchDashboardLayout = useMatch('/admin/dashboard'); // 登入後台 Layout 首頁
    const dispatch = useDispatch();
    const adminState = useSelector((state) => state.admin);
    const [adminCheck] = useAdminCheckMutation();
    const { adminLogout } = useOutletContext();

    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('adminToken='))
        ?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = token; // 全域 axios 設置

    const handleCheckAdminAuth = async () => {
        try {
            const response = await adminCheck(adminState.uid).unwrap();
            return response;
        } catch (error) {
            dispatch(createAsyncMessage(error.data));
            adminLogout(adminState.uid); // 登出 + 返回管理者
            throw error;
        }
    };

    useEffect(() => {
        if (!token) {
            return navigate('/admin'); // 沒有 Token 直接返回，不執行檢查權限
        } else if (!matchDashboardLayout) {
            return; // 不是初次進入後台就不重新檢查權限
        }
    }, [token, navigate]);

    return (
        <div>
            <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
                <div className="bg-light" style={{ width: '200px' }}>
                    <ul className="list-group list-group-flush">
                        <NavLink className="list-group-item list-group-item-action fw-bolder py-2" to="products">
                            產品列表
                        </NavLink>
                        <NavLink className="list-group-item list-group-item-action fw-bolder py-2" to="coupons">
                            優惠卷列表
                        </NavLink>
                        <NavLink className="list-group-item list-group-item-action fw-bolder py-2" to="orders">
                            訂單列表
                        </NavLink>
                        <NavLink className="list-group-item list-group-item-action fw-bolder py-2" to="article">
                            文章列表
                        </NavLink>
                    </ul>
                </div>
                <div className="w-100">{token && <Outlet context={{ adminCheck: handleCheckAdminAuth }} />}</div>
            </div>

            <ToastContainer />
            <ReactBootstrapToast />
        </div>
    );
};
export default AdminDashboardPage;
