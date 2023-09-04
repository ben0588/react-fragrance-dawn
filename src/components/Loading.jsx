import { memo } from 'react';
import ReactLoading from 'react-loading';
import { useSelector } from 'react-redux';
const Loading = memo(function Loading() {
    const loading = useSelector((state) => state.loading);
    return (
        <>
            {loading.isLoading && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 10000,
                        backdropFilter: 'blur(2px)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <ReactLoading type={'cylon'} color={'white'} height={60} width={100} />
                </div>
            )}
        </>
    );
});
export default Loading;
