import { memo } from 'react';
import { useState } from 'react';
import { Accordion } from 'react-bootstrap';

const AccordionCollapse = memo(({ description }) => {
    return (
        <Accordion defaultActiveKey={['0']} alwaysOpen flush>
            <Accordion.Item eventKey='0'>
                <Accordion.Header>產品介紹</Accordion.Header>
                <Accordion.Body>{description}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
                <Accordion.Header>用法&用途</Accordion.Header>
                <Accordion.Body>適量噴灑於雙手脈搏處、及耳後。</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='2'>
                <Accordion.Header>主要成分</Accordion.Header>
                <Accordion.Body>如包裝所示。</Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
});
export default AccordionCollapse;
