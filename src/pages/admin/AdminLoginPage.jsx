import { useRef } from 'react';
import { AdminSignIns } from '../../api/adminApis';
import { useNavigate } from 'react-router-dom';
import { createAsyncMessage } from '../../store/slice/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createAdminLogin } from '../../store/slice/adminSlice';

const AdminLoginPage = () => {
    const adminLoginRef = useRef(null);
    const adminUserInputRef = useRef(null);
    const adminPasswordInputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAdminLoginSubmit = async (e) => {
        try {
            e.preventDefault();
            const user = {
                username: adminUserInputRef.current.value,
                password: adminPasswordInputRef.current.value,
            };
            const result = await AdminSignIns(user);
            adminLoginRef.current.reset();
            let newDate = new Date(result.expired).toLocaleString();
            document.cookie = `adminToken=${result.token}; expires=${newDate};`; // 儲存 Token
            dispatch(createAdminLogin({ ...result, expired: result.expired }));
            dispatch(createAsyncMessage(result));
            if (document.cookie) {
                navigate('/admin/dashboard');
            }
        } catch (error) {
            dispatch(createAsyncMessage(error?.response?.data));
        }
    };

    return (
        <div className='position-relative '>
            <form
                className=' mx-auto my-5'
                style={{ width: `40%` }}
                onSubmit={(e) => handleAdminLoginSubmit(e)}
                ref={adminLoginRef}
            >
                <fieldset>
                    <legend className='fs-3 fw-bolder mb-4'>管理者登入介面</legend>

                    <div className='mb-2'>
                        <label htmlFor='adminLogin-account' className='form-label fw-bolder mb-0'>
                            管理者帳號
                        </label>
                        <input
                            type='text'
                            name='username'
                            className='form-control'
                            id='adminLogin-account'
                            ref={adminUserInputRef}
                            defaultValue={''}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='adminLogin-password' className='form-label fw-bolder mb-0'>
                            管理者密碼
                        </label>
                        <input
                            name='password'
                            type='password'
                            className='form-control'
                            id='adminLogin-password'
                            ref={adminPasswordInputRef}
                            defaultValue={''}
                        />
                    </div>
                    <button type='submit' className=' btn btn-primary w-25 mt-2'>
                        登入
                    </button>
                </fieldset>
            </form>
        </div>
    );
};
export default AdminLoginPage;
