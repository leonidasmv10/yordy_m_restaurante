import Card from 'react-bootstrap/Card';

const PlatoCard = ({ plato, children }) =>
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={`../images/${plato.fotografia}`} />
        <Card.Body>
            <Card.Title>{plato.nombre}</Card.Title>
            <Card.Text>
                <strong>Precio: </strong> {plato.precio} euros
                {children}
            </Card.Text>
        </Card.Body>
    </Card>

export default PlatoCard;