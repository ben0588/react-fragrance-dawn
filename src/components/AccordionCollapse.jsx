import { memo } from 'react';
import { Accordion } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AccordionCollapse({ list }) {
    return (
        <Accordion defaultActiveKey={['0']} alwaysOpen flush>
            {list?.length &&
                list.map((item, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>{item.title}</Accordion.Header>
                        <Accordion.Body>{item.text}</Accordion.Body>
                    </Accordion.Item>
                ))}
        </Accordion>
    );
}

AccordionCollapse.propTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        })
    ),
};
export default memo(AccordionCollapse);
