import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddParkModal} from './AddParkModal';
import {EditParkModal} from './EditParkModal';

/*
function Park (){
    return <div className="mt-5 d-flex justify-content-left">
        <h1>This is Park page!</h1>
        </div>
}
*/

class Park extends Component {
    constructor(props){
        super(props);
        this.state={parks:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
       //console.log({ REACT_APP_API: process.env.REACT_APP_API })
       fetch(process.env.REACT_APP_API+'park/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({parks:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList(); // David
    }
    deletePark(parkid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API + 'park/' + parkid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }


    render() {
        const {parks, parkid, parkname, parklocation, parkseason, parkhours, parkcapacity, parkcost, parkparkingavailable}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
        <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>Park Id</th>
                    <th>Park Name</th>
                    <th>Park Location</th>
                    <th>Park Season</th>
                    <th>Park Hours</th>
                    <th>Park Capacity</th>
                    <th>Park Cost</th>
                    <th>Park Parking Available</th>
                    <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {parks.map(par=>
                        <tr key={par.ParkId}>
                            <td>{par.ParkId}</td>
                            <td>{par.ParkName}</td>
                            <td>{par.ParkLocation}</td>
                            <td>{par.ParkSeason}</td>
                            <td>{par.ParkHours}</td>
                            <td>{par.ParkCapacity}</td>
                            <td>{par.ParkCost}</td>
                            <td>{par.ParkParkingAvailable.toString()}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button className="mr-2" variant="info"
                                    onClick={()=>this.setState({editModalShow:true,
                                        parkid:par.ParkId,parkname:par.ParkName,parklocation:par.ParkLocation,parkseason:par.ParkSeason,parkhours:par.ParkHours,parkcapacity:par.ParkCapacity,parkcost:par.ParkCost,parkparkingavailable:par.ParkParkingAvailable})}>
                                            Edit 
                                        </Button>
                                    <Button className="mr-2" variant="danger"
                                    onClick={()=>this.deletePark(par.ParkId)}>
                                            Delete 
                                        </Button>
                                        <EditParkModal show={this.state.editModalShow}
                                        onHide={editModalClose}
                                        parkid={parkid}
                                        parkname={parkname}
                                        parklocation={parklocation}
                                        parkseason={parkseason}
                                        parkhours={parkhours}
                                        parkcapacity={parkcapacity}
                                        parkcost={parkcost}
                                        parkparkingavailable={parkparkingavailable}/>
                                </ButtonToolbar>
                            </td>
                        </tr>)}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button variant='primary'
                onClick={()=>this.setState({addModalShow:true})}>
                    Add Park
                </Button>
                <AddParkModal show={this.state.addModalShow}
                onHide={addModalClose}/>
            </ButtonToolbar>
        </div>
        )
    }
}
export default Park;