import { memo } from 'react';
import { BsDashLg, BsPlusLg } from 'react-icons/bs';
import PropTypes from 'prop-types';

const QuantityButtonGroup = memo(function QuantityButtonGroup({ quantity, setChange, groupWidth = `200px`, btnSize }) {
    return (
        <>
            <div className="input-group" style={{ width: groupWidth }}>
                <button
                    type="button"
                    className={`btn btn-outline-primary ${btnSize ? btnSize : ''}`}
                    onClick={() => setChange((pre) => (pre === 1 ? pre : pre - 1))}
                >
                    <BsDashLg />
                </button>
                <input type="number" className="form-control text-center" value={quantity} readOnly />
                <button
                    type="button"
                    className={`btn btn-outline-primary ${btnSize ? btnSize : ''}`}
                    onClick={() => setChange((pre) => pre + 1)}
                >
                    <BsPlusLg />
                </button>
            </div>
        </>
    );
});

QuantityButtonGroup.propTypes = {
    quantity: PropTypes.number,
    setChange: PropTypes.func,
    groupWidth: PropTypes.string,
    btnSize: PropTypes.string,
};
export default QuantityButtonGroup;
