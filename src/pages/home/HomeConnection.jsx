import { useState } from 'react';
import InputGroup from '../../components/InputGroup';
import TextareaGroup from '../../components/TextareaGroup';
import Swal from 'sweetalert2';

const HomeConnection = () => {
    const initialValue = {
        id: new Date().getTime(),
        create_at: new Date().getTime(),
        name: '',
        email: '',
        content: '',
    };
    const [user, setUser] = useState(initialValue);

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.name !== '' && user.email !== '' && user.content !== '') {
            const newUser = {
                data: {
                    user,
                },
            };
            Swal.fire({
                title: '表單成功送出',
                text: `尊敬的 ${newUser?.data?.user?.name} 我們收到表單資料後會盡速與您聯繫，謝謝。`,
                icon: 'success',
                confirmButtonColor: '#111c30',
                cancelButtonColor: '#b2bec3',
                confirmButtonText: '確認',
                cancelButtonText: '取消',
                showCloseButton: true,
            });
            setUser(initialValue);
        }
    };

    return (
        <div className=' position-relative my-5 mt-5'>
            <div
                className='position-absolute top-100 start-50 translate-middle w-100 '
                style={{ zIndex: -1, height: `300px`, backgroundColor: '#dfe6e9' }}
            ></div>
            <div className='container bg-white'>
                <h2 className='home-title py-3'>
                    聯絡我們<span></span>
                    <span></span>
                </h2>
                <div className='row  border border-2  py-3'>
                    <div className='col-12 col-lg-6 '>
                        <iframe
                            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14561.12891656417!2d120.6468631!3d24.1618329!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2c5e7459c2aaf71a!2z6Ie65Lit5biC5pS_5bqc!5e0!3m2!1szh-TW!2stw!4v1664543172932!5m2!1szh-TW!2stw'
                            width='100%'
                            height='100%'
                            title='Google 地圖'
                            aria-label='Google 地圖，顯示香氛晨光總公司位置的地理信息'
                            allowFullScreen={false}
                            loading='lazy'
                            referrerPolicy='no-referrer-when-downgrade'
                        ></iframe>
                    </div>
                    <div className='col-12 col-lg-6'>
                        <form onSubmit={(e) => handleSubmit(e)} className='mt-4'>
                            <InputGroup
                                name='name'
                                id='ConnectionName'
                                type='text'
                                title='姓名'
                                groupClass='mb-3'
                                labelClass='form-label '
                                inputClass='form-control'
                                onChange={handleChangeValue}
                                value={user.name || ''}
                                placeholder='請輸入您的姓名'
                            />
                            <InputGroup
                                name='email'
                                id='ConnectionEmail'
                                type='email'
                                title='電子信箱'
                                groupClass='mb-3'
                                labelClass='form-label '
                                inputClass='form-control'
                                onChange={handleChangeValue}
                                value={user.email || ''}
                                placeholder='請輸入您的電子信箱'
                            />
                            <TextareaGroup
                                name='content'
                                id='ConnectionContent'
                                title='內容'
                                groupClass='mb-3'
                                labelClass='form-label '
                                textareaClass='form-control'
                                placeholder='請輸入內容'
                                cols={30}
                                rows={5}
                                onChange={handleChangeValue}
                                value={user.content || ''}
                            />

                            <input type='submit' value='送出表單' className='btn btn-dark w-100' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomeConnection;
