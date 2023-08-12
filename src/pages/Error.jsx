import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Error = () => {
    const location = useLocation();
    const [seconds, setSeconds] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        let timed;
        if (seconds > 0) {
            timed = setTimeout(() => {
                setSeconds((pre) => pre - 1);
            }, 1000);
        } else if (seconds === 0) {
            navigate('/');
        }

        return () => clearTimeout(timed);
    }, [seconds]);

    return (
        <div className='container text-center mt-5'>
            <h4>
                頁面 <span className='text-danger px-3'>{location.pathname}</span>不存在，{seconds} 秒後返回首頁
            </h4>
        </div>
    );
};
export default Error;
