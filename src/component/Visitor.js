import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddVisitorModal} from './AddVisitorModal';
import {EditVisitorModal} from './EditVisitorModal';
/*
function Visitor (){
    return <div className="mt-5 d-flex justify-content-left">
        <h1>This is Visitor page!</h1>
        </div>
}
 */

class Visitor extends Component {
    constructor(props){
        super(props);
        this.state={visitors:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
       //console.log({ REACT_APP_API: process.env.REACT_APP_API })
       fetch(process.env.REACT_APP_API+'visitor/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({visitors:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList(); // David
    }
    deleteVisitor(visitorid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API + 'visitor/' + visitorid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }


    render() {
        const {visitors, visitorid, visitorname, parkid, dateofreservation, numberofguests, photofilename, visitoremail, visitorphone}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
        <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Visitor Id</th>
                    <th>Visitor Name</th>
                    <th>Park Id</th>
                    <th>Date Of Reservation</th>
                    <th>Number Of Guests</th>
                    <th>Photo File Name</th>
                    <th>Visitor Phone</th>
                    <th>Visitor Email</th>
                    <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {visitors.map(vis=>
                        <tr key={vis.VisitorId}>
                            <td>{vis.VisitorId}</td>
                            <td>{vis.VisitorName}</td>
                            <td>{vis.ParkId}</td>
                            <td>{vis.DateOfReservation}</td>
                            <td>{vis.NumberOfGuests}</td>
                            <td>{vis.PhotoFileName}</td>
                            <td>{vis.VisitorPhone}</td>
                            <td>{vis.VisitorEmail.toString()}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                    onClick={()=>this.setState({editModalShow:true,
                                        visitorid:vis.VisitorId,visitorname:vis.VisitorName,parkid:vis.ParkId,dateofreservation:vis.DateOfReservation,numberofguests:vis.NumberOfGuests,photofilename:vis.PhotoFileName, visitoremail:vis.VisitorEmail, visitorphone:vis.VisitorPhone})}>
                                            Edit 
                                        </Button>
                                    <Button className="mr-2" variant="danger"
                                    onClick={()=>this.deleteVisitor(vis.VisitorId)}>
                                            Delete 
                                        </Button>
                                        <EditVisitorModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        visitorid={visitorid}
                                        visitorname={visitorname}
                                        parkid={parkid}
                                        dateofreservation={dateofreservation}
                                        numberofguests={numberofguests}
                                        photofilename={photofilename}
                                        visitorphone={visitorphone}
                                        visitoremail={visitoremail}/>
                                </ButtonToolbar>
                            </td>
                        </tr>)}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button variant='primary'
                onClick={()=>this.setState({addModalShow:true})}>
                    Add Visitor
                </Button>
                <AddVisitorModal show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>
        </div>
        )
    }
}




export default Visitor;