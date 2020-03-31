import React, {Component} from "react";
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Home.css'
import windmill from './Photos/Windmills.jpeg'
import home from './homepage.jpg'
import {Slideshow} from './Slideshow.js'
  
export class Home extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div>
            <Slideshow />
            <center>
                <h3 style={{fontSize: '50px'}}>Empowering Knowledge</h3>
                <div className="text">
                    <p style={pStyle}>Do you know where your energy is coming from? Do you know who is making those decisions?</p>
                </div>
            </center>
        </div>
      );
    }
}

const containerStyle = {
    height: "50%"
}

const pStyle = {
    textAlign: "center",
    fontSize: "20px",
    paddingTop: "2%"
}

export default Home;