import HashLoader from 'react-spinners/HashLoader';

const FirstLoading = () => {
    return (
        <div className='position-fixed top-50 start-50 translate-middle'>
            <HashLoader color='#0d2e5f' size={50} />
        </div>
    );
};
export default FirstLoading;
