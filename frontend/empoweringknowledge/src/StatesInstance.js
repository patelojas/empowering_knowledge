import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText
    } from 'reactstrap';

export class StatesInstance extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        isLoading: false,
        values: [],
        bill: {},
        energy: [],
        bills: [],
        map: {
          "Alabama":"al",
          "Alaska":"ak",
          "Arizona":"az",
          "Arkansas":"ar",
          "California":"ca",
          "Colorado":"co",
          "Connecticut":"ct",
          "Delaware":"de",
          "Florida":"fl",
          "Georgia":"ga",
          "Hawaii":"hi",
          "Idaho":"id",
          "Illinois":"il",
          "Indiana":"in",
          "Iowa":"ia",
          "Kansas":"ks",
          "Kentucky":"ky",
          "Louisiana":"la",
          "Maine":"me",
          "Maryland":"md",
          "Massachusetts":"ma",
          "Michigan":"mi",
          "Minnesota":"mn",
          "Mississippi":"ms",
          "Missouri":"mo",
          "Montana":"mt",
          "Nebraska":"ne",
          "Nevada":"nv",
          "New Hampshire":"nh",
          "New Jersey":"nj",
          "New Mexico":"nm",
          "New York":"ny",
          "North Carolina":"nc",
          "North Dakota":"nd",
          "Ohio":"oh",
          "Oklahoma":"ok",
          "Oregon":"or",
          "Pennsylvania":"pa",
          "Rhode Island":"ri",
          "South Carolina":"sc",
          "South Dakota":"sd",
          "Tennessee":"tn",
          "Texas":"tx",
          "Utah":"ut",
          "Vermont":"vt",
          "Virginia":"va",
          "Washington":"wa",
          "West Virginia":"wv",
          "Wisconsin":"wi",
          "Wyoming":"wy",
        },
        
    }
    
    
}
toLowerCase(value){
    if(value != null){
      return value.toLowerCase();  
    }
}
componentDidMount() {
    var value = window.location.href.split("/")
    var path = value[4]
    if(path.includes("%20")){

        value = path.split("%20")
        path = value[0] + " " + value[1]
    }
   
    
    console.log('https://api.empoweringknowledge.me/api/congressmembers?q={"filters":[{"name":"state_abr","op":"eq","val":"'+ this.state.map[path] + '"}]}')
    this.setState({isLoading: true});
    fetch('https://api.empoweringknowledge.me/api/states/' + path)
    .then(res => res.json())
    .then((data) => {
        this.setState({ items: data ,isLoading: false});      
    })
    .catch(console.log)
    console.log(path)
    fetch('https://api.empoweringknowledge.me/api/congressmembers?q={"filters":[{"name":"state_abr","op":"eq","val":"'+ this.state.map[path] + '"}]}')
    .then(res => res.json())
    .then((data) => {
        this.setState({ values: data.objects,isLoading: false});      
    })
    .catch(console.log)
    // console.log('api.empoweringknowledge.me/api/coal?q={"filters":[{"name":"state_name","op":"eq","val":"'+ path + '"}]}')
    // fetch('api.empoweringknowledge.me/api/coal?q={"filters":[{"name":"state_name","op":"eq","val":"'+ path + '"}]}')
    // .then(res => res.json())
    // .then((data) => {
    //     this.setState({ energy: data.objects,isLoading: false});      
    // })
    // .catch(console.log)
    
}

// getbills(id){
  
//   fetch('https://dm5v6ty0dwipl.cloudfront.net/api/bills?q={"filters":[{"name":"sponsor_id","op":"eq","val":"'+ id +'"}]}')
//     .then(res => res.json())
//     .then((data) => {
//         this.setState({ bills: data.objects,isLoading: false});      
//     })
// }

getBills(value){
  if(value != null){
      return (value.bill_id)
  }
}

render() {

    const {items, isLoading, values, bills, bill, energy} = this.state;
    console.log(values)
    var joined;
    var stateMap = {
      "Alabama":"al",
      "Alaska":"ak",
      "Arizona":"az",
      "Arkansas":"ar",
      "California":"ca",
      "Colorado":"co",
      "Connecticut":"ct",
      "Delaware":"de",
      "Florida":"fl",
      "Georgia":"ga",
      "Hawaii":"hi",
      "Idaho":"id",
      "Illinois":"il",
      "Indiana":"in",
      "Iowa":"ia",
      "Kansas":"ks",
      "Kentucky":"ky",
      "Louisiana":"la",
      "Maine":"me",
      "Maryland":"md",
      "Massachusetts":"ma",
      "Michigan":"mi",
      "Minnesota":"mn",
      "Mississippi":"ms",
      "Missouri":"mo",
      "Montana":"mt",
      "Nebraska":"ne",
      "Nevada":"nv",
      "New Hampshire":"nh",
      "New Jersey":"nj",
      "New Mexico":"nm",
      "New York":"ny",
      "North Carolina":"nc",
      "North Dakota":"nd",
      "Ohio":"oh",
      "Oklahoma":"ok",
      "Oregon":"or",
      "Pennsylvania":"pa",
      "Rhode Island":"ri",
      "South Carolina":"sc",
      "South Dakota":"sd",
      "Tennessee":"tn",
      "Texas":"tx",
      "Utah":"ut",
      "Vermont":"vt",
      "Virginia":"va",
      "Washington":"wa",
      "West Virginia":"wv",
      "Wisconsin":"wi",
      "Wyoming":"wy",
    };

    if (isLoading){
        return false;
    }
    

    console.log(energy)
    if(values === null){
      return true;
    }


      return (
        <div center className="StatesInstance"style = {{paddingLeft:'3%',textAlign: 'center',color: '#000000'}}>
            <img top width="80%" style={{width: '300px', height: '375px'}} src={"https://www.state-maps.org/"+ stateMap[items.name]+".gif"} alt={"No image"} />
            <h2 style = {{paddingTop: "3%",color: '#000000'}}> {items.name} </h2>
            <center>
            <ListGroup style = {{paddingTop:'1%', paddingLeft:'3%',textAlign: 'center',color: '#000000', width: '50%'}}>
                <ListGroupItem>
                  <ListGroupItemHeading>Top Energy Sources</ListGroupItemHeading>
                  <ListGroupItemText>
                  {items.primary_energy_source_1}, {items.primary_energy_source_2}, {items.primary_energy_source_3}
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                <ListGroupItemHeading>Population</ListGroupItemHeading>
                    <ListGroupItemText>
                    {items.population}
                    </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Median Income</ListGroupItemHeading>
                  <ListGroupItemText>
                  {items.median_hh_income}
                  </ListGroupItemText>
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Dominant Party</ListGroupItemHeading>
                  <ListGroupItemText>
                  {items.dominant_party}
                  </ListGroupItemText>
                </ListGroupItem>
                
                <ListGroupItem>
                  <ListGroupItemHeading>Past/Present Representatives</ListGroupItemHeading>
                 
                  {values.slice(0, 5).map(value =>
                    <ListGroupItemText>
                      <a href= {"/politician/" + value.member_id}   to={"/politician/" + value.member_id}>{value.first_name}{value.last_name}</a> 
                      {/* {bill[value.member_id] = value.member_id } */}
                      {/* {this.setState({ bill: value.member_id})}  */}
                    </ListGroupItemText>
                    
                  )}
                </ListGroupItem>
                <ListGroupItem>
                  <ListGroupItemHeading>Bills Sponsored By State Representatives</ListGroupItemHeading>
                  {values.slice(0, 5).map(value =>
                    value.bills_sponsored.slice(0, 5).map(bill =>
                        <ListGroupItemText>
                          <a href= {"/bill/" + bill.bill_id}   to={"/bill/" + bill.bills_id}>{bill.bill_id}</a>                    
                        </ListGroupItemText>
                    )
                  )}
                </ListGroupItem>
        </ListGroup>
        
        </center>
        
        </div>
      );
    }
}

export default StatesInstance;