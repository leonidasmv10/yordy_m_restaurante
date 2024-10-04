import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const ContactoComponent = ({ contacto, children }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`../images/${contacto.imagen}`} />
            <Card.Body>
                <Card.Title><strong>{contacto.nombre}</strong></Card.Title>
                <Card.Text>
                    <strong>Como llegar: </strong>{contacto.instrucciones_destino}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item><strong>Telefono: </strong>{contacto.telefono} </ListGroup.Item>
                <ListGroup.Item><strong>Email: </strong>{contacto.email} </ListGroup.Item>
                <ListGroup.Item><strong>Horario Apertura: </strong>{contacto.horario_apertura} </ListGroup.Item>
                <ListGroup.Item><strong>Horario Cierre: </strong>{contacto.horario_cierre} </ListGroup.Item>
                <ListGroup.Item><strong>Festivos: </strong>{contacto.festivos} </ListGroup.Item>
                {children}
            </ListGroup>
        </Card>
    );
}

export default ContactoComponent;