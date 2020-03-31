import React, {Component, useState} from "react";
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Redirect,Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem, 
    NavLink, Col, Button, Form, FormGroup, Label, Input
   } from 'reactstrap';

  export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            page: 1,
            pages: 0,
            nextpage: 2,
            lastpage: 1,
            isLoading: false,
            isOpen: false,
            setIsOpen: false,
            input: "",
        }
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

 

    toggle(){
      this.setState({isOpen: !this.state.isOpen});
    }

    handleTermChange(e) {
        this.setState({ input: e.target.value });
    }

    handleSearch() {
      document.location.href = '/results/' + this.state.input;
      //<Link to={{pathname:'/results', state:{input: this.state.input}}} />
    }

    handleEnter(e) {
        if (e.key === 13) {
        this.handleSearch();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleSearch();
  }
  render(){
    return (
      <div className = "Navbar">
      <Navbar color = "dark" dark expand = "md">
        <NavbarBrand style = {{color: '#c7cfd9', textDecoration: 'none'}} href = "/">Empowering Knowledge</NavbarBrand>
        <NavbarToggler onClick={this.state.toggle} className="mr-2" />
        <Collapse navbar>
          <Nav className ="ml-auto" navbar>
            <NavItem>
              <BrowserRouter>
                  <NavLink  href="/about" className="nav-link">About</NavLink>
              </BrowserRouter>
            </NavItem>
            <NavItem>
              <BrowserRouter>
                  <NavLink href="/politicians" className="nav-link">Politicians</NavLink>
              </BrowserRouter>
            </NavItem>
            <NavItem>
              <BrowserRouter>
                  <NavLink href="/states" className="nav-link">States</NavLink>
              </BrowserRouter>
            </NavItem>
            <NavItem>
              <NavLink href="/bills" className="nav-link">Energy Bills</NavLink>
            </NavItem> 
            <NavItem>
              <NavLink href="/visualizations" className="nav-link">Visualizations</NavLink>
            </NavItem> 
            <NavItem>
              <Form className="searchbox" onSubmit={this.handleSubmit}>
                <FormGroup row>
              
                <Col sm={10}>
                    <Input
                    type="text"
                    placeholder="Search this site"
                    onChange={this.handleTermChange}
                    onKeyDown={this.handleEnter}
                    />
                </Col>
                </FormGroup>

                </Form>
            </NavItem>
          </Nav>
          </Collapse>
      </Navbar>
    
      
    </div>
    );
  }
}

export default Navigation;