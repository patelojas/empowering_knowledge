import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

export class EnergyBillsInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        values: [],
        isLoading: false,
    }
    
    
}
toLowerCase(value){
    if(value != null){
      return value.toLowerCase();  
    }
}
componentDidMount() {
    var value = window.location.href.split("/")
    var path = (value[4])
    console.log('https://api.empoweringknowledge.me/api/api/bills/' + path)
    this.setState({isLoading: true});
    fetch('https://api.empoweringknowledge.me/api/bills/' + path)
    .then(res => res.json())
    .then((data) => {
        this.setState({ items: data,isLoading: false});      
    })
    .catch(console.log)

    // fetch('http://3.84.54.129:5000/api/bills?q={"filters":[{"name":"sponsor_id","op":"eq","val":"'+ path + '"}]}')
    // .then(res => res.json())
    // .then((data) => {
    //     this.setState({ values: data.objects,isLoading: false});      
    // })
    // .catch(console.log)
}

getName(value){
    if(value != null){
        return ("" + value.first_name + " " + value.last_name)
    }
}
getState(value){
    if(value != null){
        return ("" + value.state)
    }
}
render() {

    const {items, isLoading, values} = this.state;
    var stateMap = {
      "AL": "Alabama",
      "AK": "Alaska",
      "AZ": "Arizona",
      "AR": "Arkansas",
      "CA": "California",
      "CO": "Colorado",
      "CT": "Connecticut",
      "DE": "Delaware",
      "FL": "Florida",
      "GA": "Georgia",
      "HI": "Hawaii",
      "ID": "Idaho",
      "IL": "Illinois",
      "IN": "Indiana",
      "IA": "Iowa",
      "KS": "Kansas",
      "KY": "Kentucky",
      "LA": "Louisiana",
      "ME": "Maine",
      "MD": "Maryland",
      "MA": "Massachusetts",
      "MI": "Michigan",
      "MN": "Minnesota",
      "MS": "Mississippi",
      "MO": "Missouri",
      "MT": "Montana",
      "NE": "Nebraska",
      "NV": "Nevada",
      "NH": "New Hampshire",
      "NJ": "New Jersey",
      "NM": "New Mexico",
      "NY": "New York",
      "NC": "North Carolina",
      "ND": "North Dakota",
      "OH": "Ohio",
      "OK": "Oklahoma",
      "OR": "Oregon",
      "PA": "Pennsylvania",
      "RI": "Rhode Island",
      "SC": "South Carolina",
      "SD": "South Dakota",
      "TN": "Tennessee",
      "TX": "Texas",
      "UT": "Utah",
      "VT": "Vermont",
      "VA": "Virginia",
      "WA": "Washington",
      "WV": "West Virginia",
      "WI": "Wisconsin",
      "WY": "Wyoming",
    };
    if (isLoading){
        return false;
    }
    

    console.log(items)
    
      return (
        <div center className="RepresentativeInstance"style = {{paddingLeft:'3%',color: '#000000'}}>
            {/* <img style={{paddingTop:'4%',width: '260px', height: '375px'}} src={require('./'+image+'.jpg')}/> */}
            <center><h2 style = {{paddingTop: "3%",color: '#000000', fontSize:'25px', textAlign:'center'}}> {this.props.name} </h2></center>
            <center>
            <ListGroup style = {{paddingTop:'3%', paddingLeft:'3%',textAlign: 'center',color: '#000000', width: '50%'}}>
            <ListGroupItem>
                <ListGroupItemHeading>Summary</ListGroupItemHeading>
                    <ListGroupItemText>
                    {items.summary}
                    </ListGroupItemText>
                    <ListGroupItemText>
                    <a href={items.congressdotgov_url}>Read Full Document</a>
                    </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>Sponsor</ListGroupItemHeading>
                    <ListGroupItemText>
                    <img style={{paddingRight:'2%',width: '90px', height: '100px'}} src={"https://theunitedstates.io/images/congress/original/" + items.sponsor_id + ".jpg"} alt={"No Image"}/>
                    </ListGroupItemText>
                    <ListGroupItemText>
                   <a href={'/politician/'+items.sponsor_id}>{this.getName(items.sponsor_rs)}</a>
                    </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>State of Sponsor</ListGroupItemHeading>
                    <ListGroupItemText>
                    <a href={'/state/'+this.getState(items.sponsor_rs)}>{this.getState(items.sponsor_rs)}</a>
                    </ListGroupItemText>
                    </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>Date Introduced</ListGroupItemHeading>
                <ListGroupItemText>
                {items["introduced_date"]}
                </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>Committee</ListGroupItemHeading>
                    <ListGroupItemText>
                    {items.committees}
                    </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>Democrat Cosponsors</ListGroupItemHeading>
                    <ListGroupItemText>
                    {items.cosponsors_by_party_D}
                    </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>Republican Cosponsors</ListGroupItemHeading>
                    <ListGroupItemText>
                    {items.cosponsors_by_party_R}
                    </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>House Passage</ListGroupItemHeading>
                    <ListGroupItemText>
                    {items.house_passage}
                    </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>Senate Passage</ListGroupItemHeading>
                    <ListGroupItemText>
                    {items.senate_passage}
                    </ListGroupItemText>
                </ListGroupItem>
        </ListGroup>
        </center>
        </div>
      );
    }
}

export default EnergyBillsInstance;