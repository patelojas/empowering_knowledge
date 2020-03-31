import React, {Component} from "react";
import './App.css';
import Navigation from './Navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, BrowserRouter} from 'react-router-dom';
import {Representatives} from './Representatives.js';
import {About} from './About.js';
import {Home} from './Home.js';
import {States} from './States.js';
import {EnergyBills} from './EnergyBills.js';
import {RepresentativeInstance} from './RepresentativeInstance.js';
import {EnergyBillsInstance} from './EnergyBillsInstance.js';
import {StatesInstance} from './StatesInstance.js';
import Search from './search.js';
import {Visualizations} from './Visualizations.js'




// import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Form, FormControl} from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      };
    }
  render(){
    return (
      <div className="App">
        <Navigation/>
        <BrowserRouter>
          <Route exact path="/" component={Home}  />
          <Route path={"/politicians"} component={Representatives}  />
          <Route path={"/about"} component={About}  />
          <Route path={"/home"} component={Home}  />
          <Route path={"/bills"} component={EnergyBills}  />
          <Route path={"/states"} component={States}  />
          <Route path={"/state/"} render={(props) => <StatesInstance {...props} />} />
          <Route path={"/bill/"} render={(props) => <EnergyBillsInstance {...props} />} />
          <Route path={"/politician/"} render={(props) => <RepresentativeInstance {...props}  />} />
          <Route path={"/results/"} render={(props) => <Search {...props} />} />
          <Route path={"/visualizations/"} render={(props) => <Visualizations {...props} />} />
       </BrowserRouter>
      </div>
    );
  }
}
  

export default App;
