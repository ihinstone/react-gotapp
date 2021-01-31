import {Col, Row, Container} from 'reactstrap';

export const RowBlock = ({left, right}) => {
    return (
        <Row>
            <Col md='6'>
                {left}
            </Col>
            <Col md='6'>
                {right}
            </Col>
        </Row>
    )
}
