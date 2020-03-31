import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navigation from './Navbar.js';
import {Route, BrowserRouter} from 'react-router-dom';
import {Representatives} from './Representatives.js';
import {About} from './About.js';
import {Home} from './Home.js';
import {States} from './States.js';
import {EnergyBills} from './EnergyBills.js';
import {RepresentativeInstance} from './RepresentativeInstance.js';
import {EnergyBillsInstance} from './EnergyBillsInstance.js';
import {StatesInstance} from './StatesInstance.js';
import {Search} from './search.js';
import waitUntil from "async-wait-until";



configure({adapter: new Adapter()});
//test 1
it('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

//test 2
it('EnergyBills model page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EnergyBills />, div);
  ReactDOM.unmountComponentAtNode(div);
});
//test 3
it('Representatives model page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Representatives />, div);
  ReactDOM.unmountComponentAtNode(div);
});
//test 4
it('Home page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
  ReactDOM.unmountComponentAtNode(div);
});
//test 5
it('About page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<About />, div);
  ReactDOM.unmountComponentAtNode(div);
});
//test 6
it('States model page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<States />, div);
  ReactDOM.unmountComponentAtNode(div);
});
//test 7
it('Representatives instance page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RepresentativeInstance />, div);
  ReactDOM.unmountComponentAtNode(div);
});
//test 8
it('EnergyBills instance page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EnergyBillsInstance />, div);
  ReactDOM.unmountComponentAtNode(div);
});


const home = shallow(<Home />)

//test 9 and 10
describe("Home Component", () => {
  it('Correctly Renders Title', () => {
    expect(home.find('h3').text()).toEqual("Empowering Knowledge")
  })
  it('Correctly Renders Subtext', () => {
    expect(home.find('p').text()).toEqual("Do you know where your energy is coming from? Do you know who is making those decisions?")
  })
})

const about = shallow(<About />)

//test
describe("About Component", () => {
  it('Correctly Renders Title', () => {
    expect(about.find('h1').at(0).text()).toEqual("About Us")
  })
  it('Correctly Renders Mission Statement', () => {
    expect(about.find('p').at(0).text()).toEqual("We believe that everyone needs to know where their energy is coming from and who is making those decisions. Today, more than ever, we need to make the right choices and how to get our energy and what the impact of energy-related legislation is. This site contains information on states, members of Congress, and legislation related to energy so EVERYONE can make educated decisions.")
  })
  it('Correctly Renders Mission Statement', () => {
    expect(about.find('p').at(1).text()).toEqual("Our goal in integrating the data is to see if there is a connection between different aspects of a state such as the primary partisanship, population, GDP, and energy consumption and the representatives they elect. In turn, we want to explore if there are characteristics of representatives that might determine how they vote on different energy bills and legislation.")
  })
  it('Correctly Renders Project Links', () => {
    expect(about.find('h1').at(1).text()).toEqual("Project Links")
  })
  it('Correctly Renders Project Tools', () => {
    expect(about.find('h1').at(3).text()).toEqual("Tools")
  })
  it('Correctly Renders Project Data', () => {
    expect(about.find('h1').at(2).text()).toEqual("Data")
  })
  
})

const state = shallow(<EnergyBills />)
describe("EnergyBills Component", () => {
  it('Correctly Renders Title', () => {
    expect(state.find('h4').at(0).text()).toEqual("Energy Bills")
  })

})

describe("States test", function() {
  let querystring = {
    pathname: "/states",
    search: "?page=1"
  };

  it("States doesn't have any data at first render", function() {
    const root = shallow(<States location={querystring} />);
    expect(root.state("items").length).toEqual(0);
  });
})
  describe("EnergyBills test", function() {
    let querystring = {
      pathname: "/bills",
      search: "?page=1"
    };
  
    it("EnergyBills doesn't have any data at first render", function() {
      const root = shallow(<EnergyBills location={querystring} />);
      expect(root.state("items").length).toEqual(0);
    });
  })
    describe("Representatives test", function() {
      let querystring = {
        pathname: "/politicians",
        search: "?page=1"
      };
    
      it("Representatices doesn't have any data at first render", function() {
        const root = shallow(<Representatives location={querystring} />);
        expect(root.state("items").length).toEqual(0);
      });
    })

  // it("States loads correctly from api", function(done) {
  //   const root = shallow(<States location={querystring} />);
  //   waitUntil(() => root.state("items").length > 0).then(() => {
  //     assert.equal(root.state("items").length, 0);
  //     done();
  //   });
  // });


//const state = shallow(<Navigation />)

// describe('Navigation Bar Component', () => {
// 	it('Renders a Navigation Bar', () => {
// 	  const nav = shallow(<Navigation />);
// 	  const expected = '<div className = "Navbar"> <Navbar color = "dark" dark expand = "md"><NavbarBrand style = {{color: "#c7cfd9", textDecoration: "none"}} href = "/">Empowering Knowledge</NavbarBrand><NavbarToggler onClick={this.state.toggle} className="mr-2" /><Collapse navbar><Nav className ="ml-auto" navbar><NavItem><BrowserRouter><NavLink  href="/about" className="nav-link">About</NavLink></BrowserRouter></NavItem><NavItem><BrowserRouter><NavLink href="/politicians" className="nav-link">Politicians</NavLink></BrowserRouter></NavItem><NavItem><BrowserRouter><NavLink href="/states" className="nav-link">States</NavLink></BrowserRouter></NavItem><NavItem><NavLink href="/bills" className="nav-link">Energy Bills</NavLink></NavItem> <NavItem><Form className="searchbox" onSubmit={this.handleSubmit}><FormGroup row><Col sm={10}><Inputtype="text"placeholder="Search this site"onChange={this.handleTermChange}onKeyDown={this.handleEnter}/></Col></FormGroup></Form></NavItem></Nav></Collapse></Navbar></div>'
//     Received: '<div className = "Navbar"> <Navbar color = "dark" dark expand = "md"><NavbarBrand style = {{color: "#c7cfd9", textDecoration: "none"}} href = "/">Empowering Knowledge</NavbarBrand><NavbarToggler onClick={this.state.toggle} className="mr-2" /><Collapse navbar><Nav className ="ml-auto" navbar><NavItem><BrowserRouter><NavLink  href="/about" className="nav-link">About</NavLink></BrowserRouter></NavItem><NavItem><BrowserRouter><NavLink href="/politicians" className="nav-link">Politicians</NavLink></BrowserRouter></NavItem><NavItem><BrowserRouter><NavLink href="/states" className="nav-link">States</NavLink></BrowserRouter></NavItem><NavItem><NavLink href="/bills" className="nav-link">Energy Bills</NavLink></NavItem> <NavItem><Form className="searchbox" onSubmit={this.handleSubmit}><FormGroup row><Col sm={10}><Inputtype="text"placeholder="Search this site"onChange={this.handleTermChange}onKeyDown={this.handleEnter}/></Col></FormGroup></Form></NavItem></Nav></Collapse></Navbar></div>';
// 	  const actual = nav.find('Navb').html();
// 		expect(expected).toEqual(actual);
// 	});
// });


// const bills = shallow(<EnergyBills />)

// describe("Bill Component", () => {
//   it('Correctly Renders Title', () => {
//     expect(bills.find('h4').text()).toEqual("Energy Bills")
//   })
 
// })

//const repInstance = shallow(<RepresentativeInstance />)

//test 2 and 3
// describe("Representative Instance Component", () => {
//   it('Correctly Renders State', () => {
//     expect(repInstance.find('ListGroupItemHeading').at(0).text()).toEqual("State")
//   })
//   it('Correctly Renders District', () => {
//     expect(repInstance.find('ListGroupItemHeading').at(1).text()).at(1).toEqual("District")
//   })
// })