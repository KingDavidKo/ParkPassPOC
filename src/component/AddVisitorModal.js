import React, {Component} from 'react';
import { Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';

export class AddVisitorModal extends Component{
    constructor(props){
        super(props);
        this.state={parks:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }
    photofilename = "";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;
    componentDidMount(){
        fetch(process.env.REACT_APP_API+'park/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({parks:data})
        });
    }
    
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'visitor/',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                VisitorName:event.target.VisitorName.value,
                ParkId:event.target.ParkId.value,
                DateOfReservation:event.target.DateOfReservation.value,
                NumberOfGuests:event.target.NumberOfGuests.value,
                PhotoFileName:this.photofilename,
                VisitorEmail:event.target.VisitorEmail.value,
                VisitorPhone:event.target.VisitorPhone.value,
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
    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );
        fetch(process.env.REACT_APP_API+'visitor/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
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
                            Add Visitor
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="VisitorName">
                                        <Form.Label>Visitor Name</Form.Label> 
                                        <Form.Control type="text" name="Visitor Name" required
                                        placeholder="Visitor Name"/>
                                    </Form.Group>
                                    
                                    <Form.Group controlId="ParkId">
                                        <Form.Label>Park Id</Form.Label> 
                                        <Form.Control type="text" name="Park Id" required
                                        placeholder="Park Id"/>
                                    </Form.Group>
                                
                                    {/*
                                    <Form.Group controlId="ParkId">
                                        <Form.Label>ParkId</Form.Label>
                                        <Form.Control as="select">
                                            {this.state.parks.map(par=>
                                                <option key={par.ParkId}>{par.ParkId}-{par.ParkName}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                    */}
                                    <Form.Group controlId="DateOfReservation">
                                        <Form.Label>Date Of Reservation</Form.Label> 
                                        <Form.Control type="date" name="Date Of Reservation" required
                                        placeholder="Date Of Reservation"/>
                                    </Form.Group>
                                    <Form.Group controlId="NumberOfGuests">
                                        <Form.Label>Number Of Guests</Form.Label> 
                                        <Form.Control type="text" name="Number Of Guests" required
                                        placeholder="Number Of Guests"/>
                                    </Form.Group>
                                    <Form.Group controlId="VisitorEmail">
                                        <Form.Label>Visitor Email</Form.Label> 
                                        <Form.Control type="text" name="Visitor Email" required
                                        placeholder="Visitor Email"/>
                                    </Form.Group>
                                    <Form.Group controlId="VisitorPhone">
                                        <Form.Label>Visitor Phone</Form.Label> 
                                        <Form.Control type="text" name="Visitor Phone" required
                                        placeholder="Visitor Phone"/>
                                    </Form.Group>
                                    <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add Visitor
                                    </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Image width="200px" height="200px" src={this.imagesrc}/>
                                <input onChange={this.handleFileSelected} type="File"/>
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