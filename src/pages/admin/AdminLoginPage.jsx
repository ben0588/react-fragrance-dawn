import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAsyncMessage } from '../../store/slice/messageSlice';
import { useDispatch } from 'react-redux';
import { createAdminLogin } from '../../store/slice/adminSlice';
import ValidationInputGroup from '../../components/ReactHookForm/ValidationInputGroup';
import { useForm } from 'react-hook-form';
import { useAdminLoginMutation } from '../../store/store';

const AdminLoginPage = () => {
    const adminLoginRef = useRef(null);
    const [adminLogin, result] = useAdminLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'onTouched',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAdminLoginSubmit = async (data) => {
        await adminLogin(data)
            .unwrap()
            .then((result) => {
                let newDate = new Date(result.expired).toLocaleString();
                document.cookie = `adminToken=${result.token}; expires=${newDate};`; // 儲存 Token
                dispatch(createAdminLogin({ ...result, expired: result.expired }));
                dispatch(createAsyncMessage(result));
                if (document.cookie) {
                    navigate('/admin/dashboard');
                }
            })
            .catch((error) => {
                dispatch(createAsyncMessage(error?.response?.data));
            });
    };

    const checkForm = Object.values(watch()).every((value) => value !== '');

    return (
        <div className="position-relative ">
            <form
                className=" mx-auto my-5"
                style={{ width: `40%` }}
                onSubmit={handleSubmit(handleAdminLoginSubmit)}
                ref={adminLoginRef}
            >
                <fieldset>
                    <legend className="fs-3 fw-bolder mb-4">管理者登入介面</legend>

                    <div className="mb-2">
                        <ValidationInputGroup
                            id="username"
                            type="text"
                            errors={errors}
                            register={register}
                            groupClass="mt-3"
                            labelText="管理者帳號"
                            labelClass="form-label fw-bolder mb-1"
                            inputClass="form-control"
                            rules={{
                                required: { value: true, message: '此欄位必填' },
                                pattern: {
                                    value: /^[A-Za-z0-9_\-.@]+$/,
                                    message: '不接受中文格式輸入',
                                },
                            }}
                        />
                    </div>
                    <div className="mb-2">
                        <ValidationInputGroup
                            id="password"
                            type="password"
                            errors={errors}
                            register={register}
                            groupClass="mt-3"
                            labelText="管理者密碼"
                            labelClass="form-label fw-bolder mb-1"
                            inputClass="form-control"
                            rules={{
                                required: { value: true, message: '此欄位必填' },
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className=" btn btn-primary w-25 mt-2"
                        disabled={!checkForm || result.isLoading}
                    >
                        {result.isLoading && (
                            <div className="spinner-border spinner-border-sm me-2 " role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        )}
                        {result.isLoading ? '登入中' : '登入'}
                    </button>
                </fieldset>
            </form>
        </div>
    );
};
export default AdminLoginPage;
