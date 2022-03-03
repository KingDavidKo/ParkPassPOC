import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './component/Home';
import Park from './component/Park';
import Visitor from './component/Visitor';
import Contact from './component/Contact';
import {Navigation} from './Navigation';
 
class App extends Component {
  render() {
    return (
       <Router>
           <div className="container">
            <h3 className = "m-3 d-flex justify-content-center" >
              ParkPass POC
            </h3>
            <Navigation/>
           <Routes>
                 <Route exact path='/' element={< Home />}></Route>
                 <Route exact path='/park' element={< Park />}></Route>
                 <Route exact path='/visitor' element={< Visitor />}></Route>
                 <Route exact path='/contact' element={< Contact />}></Route>
          </Routes>
          </div>
       </Router>
   );
  }
}
 
export default App;