import { useForm } from 'react-hook-form';
import ValidationSelectGroup from '../../components/ReactHookForm/ValidationSelectGroup';
import ValidationInputGroup from '../../components/ReactHookForm/ValidationInputGroup';
import ValidationTextareaGroup from '../../components/ReactHookForm/ValidationTextareaGroup';
import useMessage from '../../hooks/useMessage';

const ServiceContactUs = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            question: '',
            name: '',
            email: '',
            tel: '',
            content: '',
        },
        mode: 'onTouched',
    });
    const { inputToastMessage } = useMessage();

    const options = [
        { text: '付款問題' },
        { text: '訂單問題' },
        { text: '運輸問題' },
        { text: '退貨問題' },
        { text: '其他' },
    ];

    const handleSubmitForm = async () => {
        try {
            // const result = await axios.post() // 發送內容
            inputToastMessage({ success: true, message: '表單內容已送出，我們將盡快處理並與您聯絡 !' });
            reset();
        } catch (error) {
            inputToastMessage(error?.response?.data);
        }
    };

    return (
        <div>
            <p>如果您有任何問題、意見或需要協助，請隨時聯繫我們的客戶服務團隊</p>
            <h4 className="border-top border-2 mt-4 pt-2"> 電話連絡：</h4>
            <div className="mt-4">
                客服專線 <a href="tel:+886-2-1234567">0800-775-800</a>
            </div>
            <div>客服中心營業時間：</div>
            <p> 週一至週五 (例假日除外) 9:30-12:30, 14:00-17:30 </p>

            <h4 className="border-top border-2 mt-4 pt-2">電子信箱聯絡：</h4>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <ValidationSelectGroup
                    id="question"
                    labelText="我想詢問的事項是關於："
                    groupClass="mt-3"
                    labelClass="form-label mb-1"
                    selectClass="form-control"
                    errors={errors}
                    register={register}
                    required={true}
                    rules={{
                        required: { value: true, message: '必須選擇詢問類型' },
                    }}
                    defaultValue=""
                >
                    <option className="bg-dark text-white" value="" disabled>
                        *請選擇
                    </option>
                    {options.map((items) => (
                        <option value={items.text} key={items.text} className="bg-dark text-white">
                            {items.text}
                        </option>
                    ))}
                </ValidationSelectGroup>
                <ValidationInputGroup
                    id="name"
                    type="text"
                    errors={errors}
                    register={register}
                    groupClass="mt-3"
                    labelText="聯絡人姓名"
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
                    id="email"
                    type="email"
                    errors={errors}
                    register={register}
                    groupClass="mt-3"
                    labelText="電子信箱"
                    labelClass="form-label mb-1"
                    inputClass="form-control"
                    placeholder="請輸入電子郵件"
                    required={true}
                    rules={{
                        required: { value: true, message: '此欄位必填' },
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // 基於 RFC 5332 Email 正則表達式
                            message: '未符合電子郵箱格式',
                        },
                    }}
                />

                <ValidationInputGroup
                    id="tel"
                    type="tel"
                    errors={errors}
                    register={register}
                    groupClass="mt-3"
                    labelText="聯絡手機"
                    labelClass="form-label mb-1"
                    inputClass="form-control"
                    placeholder="請輸入聯絡手機"
                    required={true}
                    rules={{
                        required: { value: true, message: '此欄位必填' },
                        pattern: {
                            // 任意
                            value: /^(0|\+?886)9\d{8}$/, // 台灣手機正則表達式
                            message: '格式錯誤，請使用 09 或 886 前綴',
                        },
                    }}
                />

                <ValidationTextareaGroup
                    id="content"
                    type="text"
                    errors={errors}
                    register={register}
                    groupClass="mt-3"
                    labelText="內容"
                    labelClass="form-label mb-1"
                    textareaClass="form-control"
                    placeholder="請描述問題"
                    required={true}
                    rows={5}
                    rules={{
                        required: { value: true, message: '此欄位必填' },
                    }}
                />
                <input type="submit" value="提交表單" className="btn btn-primary btn-primary-hover w-100 mt-4" />
            </form>
        </div>
    );
};
export default ServiceContactUs;
