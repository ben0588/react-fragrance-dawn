import { memo } from 'react';
import { useState } from 'react';
import { Accordion } from 'react-bootstrap';

const AccordionCollapse = memo(({ list }) => {
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
});
export default AccordionCollapse;
