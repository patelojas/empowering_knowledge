import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Timeline } from 'react-twitter-widgets'

import {
     ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
     } from 'reactstrap';

export class RepresentativeInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        values: [],
        isLoading: false,
        twitter: null,
        party: "",
        img:"",
    }
    
    
}
toLowerCase(value){
    if(value != null){
      return value.toLowerCase();  
    }
}

setDefault(values){
  var result;
  if(values.length === 0){
    result = "No bills Sponsored"
  }
  else{
    result = ""
  }
  return result
}
componentDidMount() {
    var value = window.location.href.split("/")
    var path = (value[4])
    console.log('https://api.empoweringknowledge.me/api/bills?q={"filters":[{"name":"sponsor_id","op":"eq","val":"'+ path + '"}]}')
    this.setState({isLoading: true});
    fetch('https://api.empoweringknowledge.me/api/congressmembers/' + path)
    .then(res => res.json())
    .then((data) => {
        this.setState({ items: data});      
    })
    .catch(console.log)

    fetch('https://api.empoweringknowledge.me/api/bills?q={"filters":[{"name":"sponsor_id","op":"eq","val":"'+ path + '"}]}')
    .then(res => res.json())
    .then((data) => {
        this.setState({ values: data.objects,isLoading: false});      
    })
    .catch(console.log)
}

render() {
    const {items, isLoading, values} = this.state;
    console.log(values)
    

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
    
    this.state.twitter = items.twitter_account
    if(items.twitter_account == null){
        this.state.twitter = "twitter"
        return false
    }

    this.state.party = items.party
    if(items.party != null){
        if(items.party == "D"){
          this.state.party = "Democrat";
        } 
        else if(items.party == "R"){
          this.state.party = "Republican";
        }
        else{
          this.state.party = "Independent";
        }
    }


    console.log(values)
    console.log(values.bill_id)        
    
      return (
        
        <div center className="RepresentativeInstance"style = {{paddingLeft:'3%',textAlign: 'center',color: '#000000'}}>
            <img style={{paddingTop:'4%',width: '260px', height: '375px'}} src={"https://theunitedstates.io/images/congress/original/" + items.member_id + ".jpg"} alt={"No Image Found"}/>
            <h2 style = {{paddingTop: "3%",color: '#000000'}}> {items.first_name} {items.last_name} </h2>
            <center>
            <ListGroup style = {{paddingTop:'1%', paddingLeft:'3%',textAlign: 'center',color: '#000000', width: '50%'}}>
                <ListGroupItem>
                <ListGroupItemHeading>State</ListGroupItemHeading>
                    
                    <ListGroupItemText>
                    <a href = {'/state/' + (items.state)}>{items.state}</a>
                    </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>District</ListGroupItemHeading>
                  <ListGroupItemText>
                  {items.district}
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>Party</ListGroupItemHeading>
                  <ListGroupItemText>
                  {this.state.party}
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>Date Of Birth</ListGroupItemHeading>
                    <ListGroupItemText>
                    {items.date_of_birth}
                    </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>Title</ListGroupItemHeading>
                    <ListGroupItemText>
                    {items.title}
                    </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading> Energy Bills</ListGroupItemHeading>
                  <ListGroupItemText>
                    {this.setDefault(values)}
                  </ListGroupItemText>
                  {values.map(value =>
                    <ListGroupItemText>
                        <a href={"/bill/" + value.bill_id}>{value.bill_id}</a>
                    </ListGroupItemText>
                  )}
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>Percent Of Votes With Party</ListGroupItemHeading>
                  <ListGroupItemText>
                  {items.votes_with_party_pct}
                  </ListGroupItemText>
                </ListGroupItem>
        </ListGroup>
        </center>
            <div>
                <Timeline
                dataSource={{
                sourceType: 'profile',
                screenName: this.state.twitter
                }}
                options={{
                height: '400'
            }}/>
        </div>
        </div>
        

      );
    }
}

export default RepresentativeInstance;