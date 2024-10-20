import React from 'react';
import { Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer className=' m-0 wh-100' style={{
            width: '100%',
            backgroundColor: 'dark',
            textAlign: 'center',

        }}>
            <Row>
                <Col className="text-center py-3">
                    <p>&copy; 2024 FECreative. Todos los derechos reservados.</p>
                </Col>
            </Row>
        </footer>
    );
}

export default Footer;
