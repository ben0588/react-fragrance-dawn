import bgImage from '../../assets/home/bg-7.webp';

const HomeBottomBg = () => {
    return (
        <div className='mt-3 py-3'>
            <div
                className='mt-5 pt-5'
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundRepeat: 'repeat-x',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    height: `350px`,
                    maxWidth: `100%`,
                    width: `100%`,
                }}
            >
                <h2 className='home-bottom-bg-title mt-5 p-4'>香氣如詩，晨光如畫，與我們一起創造美好的生活</h2>
            </div>
        </div>
    );
};
export default HomeBottomBg;
