import ValidationInputGroup from '../../components/ReactHookForm/ValidationInputGroup';
import { useForm } from 'react-hook-form';
import ValidationTextareaGroup from '../../components/ReactHookForm/ValidationTextareaGroup';
import Swal from 'sweetalert2';

const HomeConnection = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm({
        defaultValues: {
            connectionName: '',
            connectionEmail: '',
            connectionContent: '',
        },
        mode: 'onTouched',
    });

    const allFieldsFilled = Object.values(watch()).every((value) => value !== ''); // 監控是否表單所有內容已填寫

    const handleSubmitConnection = (data) => {
        const newData = {
            ...data,
            id: new Date().getTime(),
            create_at: new Date().getTime(),
        };
        Swal.fire({
            title: '表單成功送出',
            text: `尊敬的 ${newData.connectionName} 我們收到表單資料後會盡速與您聯繫，謝謝。`,
            icon: 'success',
            confirmButtonColor: '#111c30',
            cancelButtonColor: '#b2bec3',
            showConfirmButton: false,
            timer: 1500,
        }).then((result) => {
            if (result.isDismissed) {
                reset();
            }
        });
    };

    return (
        <div className=" position-relative my-5 mt-5">
            <div
                className="position-absolute top-100 start-50 translate-middle w-100 "
                style={{ zIndex: -1, height: `300px`, backgroundColor: '#dfe6e9' }}
            ></div>
            <div className="container bg-white">
                <h2 className="home-title py-3">
                    聯絡我們<span></span>
                    <span></span>
                </h2>
                <div className="row  border border-2  py-3">
                    <div className="col-lg-6 ">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14561.12891656417!2d120.6468631!3d24.1618329!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2c5e7459c2aaf71a!2z6Ie65Lit5biC5pS_5bqc!5e0!3m2!1szh-TW!2stw!4v1664543172932!5m2!1szh-TW!2stw"
                            width="100%"
                            height="100%"
                            title="Google 地圖"
                            aria-label="Google 地圖，顯示香氛晨光總公司位置的地理信息"
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="col-lg-6">
                        <form onSubmit={handleSubmit(handleSubmitConnection)} className="mt-4">
                            <ValidationInputGroup
                                id="connectionName"
                                type="text"
                                errors={errors}
                                register={register}
                                groupClass="mt-3"
                                labelText="姓名"
                                labelClass="form-label mb-1"
                                inputClass="form-control"
                                placeholder="請輸入聯絡人姓名"
                                required={true}
                                rules={{
                                    required: { value: true, message: '此欄位必填' },
                                    pattern: {
                                        // 任意
                                        value: /^[\u4E00-\u9FFF]*·*[\u4E00-\u9FFF]*$/, // 中文正則表達式
                                        message: '請填寫中文姓名',
                                    },
                                }}
                            />

                            <ValidationInputGroup
                                id="connectionEmail"
                                type="text"
                                errors={errors}
                                register={register}
                                groupClass="mt-3"
                                labelText="電子信箱"
                                labelClass="form-label mb-1"
                                inputClass="form-control"
                                placeholder="請輸入聯絡人電子信箱"
                                required={true}
                                rules={{
                                    required: { value: true, message: '此欄位必填' },
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // 基於 RFC 5332 Email 正則表達式
                                        message: '未符合電子郵箱格式',
                                    },
                                }}
                            />
                            <ValidationTextareaGroup
                                id="connectionContent"
                                type="text"
                                errors={errors}
                                register={register}
                                groupClass="mt-3"
                                labelText="內容"
                                labelClass="form-label mb-1"
                                textareaClass="form-control"
                                placeholder="請輸入聯絡內容"
                                required={true}
                                rows={5}
                                rules={{
                                    required: { value: true, message: '此欄位必填' },
                                }}
                            />

                            <input
                                type="submit"
                                value="送出表單"
                                className="btn btn-dark w-100 mt-4"
                                disabled={!allFieldsFilled}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomeConnection;
