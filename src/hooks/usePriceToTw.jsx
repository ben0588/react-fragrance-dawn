import { useMemo } from 'react';

const usePriceToTw = () => {
    const handlePriceToTw = useMemo(
        () => (value) => {
            const price = value !== undefined ? Math.floor(value) : 0;

            return new Intl.NumberFormat('zh-TW', {
                style: 'currency',
                currency: 'TWD',
                minimumFractionDigits: 0,
            }).format(price);
        },
        [],
    );

    return { handlePriceToTw };
};

export default usePriceToTw;
