import React, {Component} from 'react';
import { Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class AddParkModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'park/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'appliction/json'
            },
            body:JSON.stringify({
                ParkName:event.target.ParkName.value,
                ParkLocation:event.target.ParkLocation.value,
                ParkSeason:event.target.ParkSeason.value,
                ParkHours:event.target.ParkHours.value,
                ParkCapacity:event.target.ParkCapacity.value,
                ParkCost:event.target.ParkCost.value,
                ParkParkingAvailable:event.target.ParkParkingAvailable.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render(){
        return (
            <div className="container">
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Park
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="ParkName">
                                    <Form.Label>Park Name</Form.Label> 
                                    <Form.Control type="text" name="Park Name" required
                                    placeholder="Park Name"/>
                                </Form.Group>
                                <Form.Group controlId="ParkLocation">
                                    <Form.Label>Park Location</Form.Label> 
                                    <Form.Control type="text" name="Park Location" required
                                    placeholder="Park Location"/>
                                </Form.Group>
                                <Form.Group controlId="ParkSeason">
                                    <Form.Label>Park Season</Form.Label> 
                                    <Form.Control type="text" name="Park Season" required
                                    placeholder="Park Season"/>
                                </Form.Group>
                                <Form.Group controlId="ParkHours">
                                    <Form.Label>Park Hours</Form.Label> 
                                    <Form.Control type="text" name="Park Hours" required
                                    placeholder="Park Hours"/>
                                </Form.Group>
                                <Form.Group controlId="ParkCapacity">
                                    <Form.Label>Park Capacity</Form.Label> 
                                    <Form.Control type="text" name="Park Capacity" required
                                    placeholder="Park Capacity"/>
                                </Form.Group>
                                <Form.Group controlId="ParkCost">
                                    <Form.Label>Park Cost</Form.Label> 
                                    <Form.Control type="text" name="Park Cost" required
                                    placeholder="Park Cost"/>
                                </Form.Group>
                                <Form.Group controlId="ParkParkingAvailable">
                                    <Form.Label>Park Parking Available</Form.Label> 
                                    <Form.Control type="text" name="Park Parking Available" required
                                    placeholder="Park Parking Available"/>
                                </Form.Group>
                                <Form.Group>
                                <Button variant="primary" type="submit">
                                    Add Park
                                </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
                </Modal>
            </div>

        )
    }
    
}