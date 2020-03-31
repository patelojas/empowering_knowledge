import React, {Component,  useState} from "react";
import './Navbar.css';
import Highlighter from "react-highlight-words";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';
import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {
    Table,Col, TabContent, Pagination, CardBody, CardImg, Container,
    CardSubtitle, CardDeck, PaginationItem, PaginationLink, Form, FormGroup, Label, Input , TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row
     } from 'reactstrap';

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            page: 1,
            pages: 0,
            nextpage: 2,
            lastpage: 1,
            isLoading: false,
            bills: [],
            states:[],
            politicians:[],
            activeTab:[],
            terms:[],

        }

        
    }

    newTab(){
        this.setState({lastpage: 1, page: 1, nextpage: 2})
    }
    handlePageClick(newPage){
        if(newPage === 1){
            this.setState({lastpage: newPage, page: newPage, nextpage: 2}, () => {
            this.componentDidMount();
            });
        }
        else if(newPage === this.state.pages){
            this.setState({lastpage: newPage - 1, page: newPage, nextpage: newPage}, () => {
                this.componentDidMount();
                });
        }
        else{
            this.setState({lastpage: newPage - 1, page: newPage, nextpage: newPage + 1}, () => {
                this.componentDidMount();
                });
        }
        
    }

    componentDidMount(){
        var value = window.location.href.split("/")
        var path = value[4]
        if(path.includes("%20")){
            path = path.split("%20");
        }
        else{
            path = [value[4]];
        }
        console.log(path)
        console.log(path.length)
        this.setState({terms:path}); 
        var url = 'https://api.empoweringknowledge.me/api/bills?q={"filters":[{"or":[';
        url += '{"name":"title","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"sponsor_id","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"committees","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"introduced_date","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"cosponsors_by_party_R","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"house_passage","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"senate_passage","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"cosponsors_by_party_D","op":"like","val":"%'+ path[0] +'%"}';
        for(var i = 1; i < path.length; i++){
            url += ',{"name":"title","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"sponsor_id","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"committees","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"introduced_date","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"cosponsors_by_party_R","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"house_passage","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"senate_passage","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"cosponsors_by_party_D","op":"like","val":"%'+ path[i] +'%"}';
        }
    
        url += "]}]}&page="+ this.state.page;
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then((data) => {
            this.setState({bills:data.objects});  
        })
        .catch(console.log)



        url = 'https://api.empoweringknowledge.me/api/states?q={"filters":[{"or":[';
        url += '{"name":"name","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"dominant_party","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"median_hh_income","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"population","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"primary_energy_source_1","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"primary_energy_source_2","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"primary_energy_source_3","op":"like","val":"%'+ path[0] +'%"}';
        for(var i = 1; i < path.length; i++){
            url += ',{"name":"name","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"dominant_party","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"median_hh_income","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"population","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"primary_energy_source_1","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"primary_energy_source_2","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"primary_energy_source_3","op":"like","val":"%'+ path[i] +'%"}';
        }
    
        url += "]}]}&page="+ this.state.page;
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then((data) => {
            this.setState({states:data.objects});  
        })
        .catch(console.log)

        url = 'https://api.empoweringknowledge.me/api/congressmembers?q={"filters":[{"or":[';
        url += '{"name":"first_name","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"last_name","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"party","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"state","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"title","op":"like","val":"%'+ path[0] +'%"}';
        url += ',{"name":"district","op":"like","val":"%'+ path[0] +'%"}';
        for(var i = 1; i < path.length; i++){
            url += ',{"name":"first_name","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"last_name","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"party","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"state","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"title","op":"like","val":"%'+ path[i] +'%"}';
            url += ',{"name":"district","op":"like","val":"%'+ path[i] +'%"}';
        }
    
        url += "]}]}&page="+ this.state.page;
        console.log(url);
        fetch(url)
        .then(res => res.json())
        .then((data) => {
            this.setState({politicians:data.objects});  
        })
        .catch(console.log)
    }
   
    render(){
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

          var titleMap ={
            "D": "Democratic",
            "R": "Republican",
            };
        return(
            <div>
               
            <Tabs>
                <TabList>
                <Tab  onClick={() => this.newTab()} >Bills</Tab>
                <Tab  onClick={() => this.newTab()}>States</Tab>
                <Tab  onClick={() => this.newTab()}>Politicians</Tab>
                </TabList>

                <TabPanel>
                <Row>
                    <Col sm="12">
                    <Table hover responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Sponsor</th>
                        <th>Committees</th>
                        <th>Introduced Date</th>
                        <th>House Passage</th>
                        <th>Senate Passage</th>
                        <th>Democrat Cosponsors</th>
                        <th>Republican Cosponsors</th>
                    </tr>
                    </thead>
                    <tbody>     
                    {this.state.bills.map(item =>

                    <tr>
                        <th scope="row"></th>
                        <td> <a href= {"/bill/" + item.bill_id}   to={"/bill/" + item.bill_id}> 
                                <Highlighter
                                highlightClassName="HighlightClass"
                                searchWords={this.state.terms}
                                autoEscape={true}
                                textToHighlight={"" + item.title}/></a>
                        </td>
                        <td> <Highlighter
                                highlightClassName="HighlightClass"
                                searchWords={this.state.terms}
                                autoEscape={true}
                                textToHighlight={"" + item.sponsor_id}/>
                        </td>
                        <td> <Highlighter
                                highlightClassName="HighlightClass"
                                searchWords={this.state.terms}
                                autoEscape={true}
                                textToHighlight={"" + item.committees}/>
                        </td>
                        <td> <Highlighter
                                highlightClassName="HighlightClass"
                                searchWords={this.state.terms}
                                autoEscape={true}
                                textToHighlight={"" + item.introduced_date}/>
                        </td>
                        <td> <Highlighter
                                highlightClassName="HighlightClass"
                                searchWords={this.state.terms}
                                autoEscape={true}
                                textToHighlight={"" + item.house_passage}/>
                        </td>
                        <td> <Highlighter
                                highlightClassName="HighlightClass"
                                searchWords={this.state.terms}
                                autoEscape={true}
                                textToHighlight={"" + item.senate_passage}/>
                        </td>
                        <td> <Highlighter
                                highlightClassName="HighlightClass"
                                searchWords={this.state.terms}
                                autoEscape={true}
                                textToHighlight={"" + item.cosponsors_by_party_D}/>
                        </td>
                        <td> <Highlighter
                                highlightClassName="HighlightClass"
                                searchWords={this.state.terms}
                                autoEscape={true}
                                textToHighlight={"" + item.cosponsors_by_party_R}/>
                        </td>
                    </tr>
                    )}
                    </tbody>
                    </Table>
                    </Col>
                </Row>
          
                </TabPanel>
                <TabPanel>
                <Row>
                <Col sm={{ size: 'auto'}}>
                    <CardDeck>
                        {this.state.states.slice(0, 3).map(item =>
                            <Card>
                                {<img top width="80%" style={{width: '300px', height: '375px'}} src={"https://www.state-maps.org/"+ stateMap[item.name]+".gif"} alt={"No image"} /> }
                                <CardBody>
                                <CardTitle><Highlighter
                                highlightClassName="HighlightClass"
                                searchWords={this.state.terms}
                                autoEscape={true}
                                textToHighlight={"" + item.name}/></CardTitle>
                                <CardSubtitle>Dominate Party: <Highlighter
                                highlightClassName="HighlightClass"
                                searchWords={this.state.terms}
                                autoEscape={true}
                                textToHighlight={"" +item.dominant_party}/></CardSubtitle>
                                <CardSubtitle>Population: <Highlighter
                                highlightClassName="HighlightClass"
                                searchWords={this.state.terms}
                                autoEscape={true}
                                textToHighlight={"" + item.population}/></CardSubtitle>
                                <CardSubtitle>Median Income: <Highlighter
                                highlightClassName="HighlightClass"
                                searchWords={this.state.terms}
                                autoEscape={true}
                                textToHighlight={"" +item.median_hh_income}/></CardSubtitle>
                                <CardSubtitle>Primary Energy Source: <Highlighter
                                highlightClassName="HighlightClass"
                                searchWords={this.state.terms}
                                autoEscape={true}
                                textToHighlight={"" + item.primary_energy_source_1}/></CardSubtitle>
                                <Button href= {"/state/" + item.name} class="nav-link"  to={"/state/" + item.name}> See More</Button>
                                </CardBody>
                                
                            </Card>
                        )}
                    </CardDeck>
                    <CardDeck>
                        {this.state.states.slice(3, 6).map(item =>
                            <Card>
                            {<img top width="80%" style={{width: '300px', height: '375px'}} src={"https://www.state-maps.org/"+ stateMap[item.name]+".gif"} alt={"No image"} /> }
                            <CardBody>
                            <CardTitle><Highlighter
                            highlightClassName="HighlightClass"
                            searchWords={this.state.terms}
                            autoEscape={true}
                            textToHighlight={"" + item.name}/></CardTitle>
                            <CardSubtitle>Dominate Party: <Highlighter
                            highlightClassName="HighlightClass"
                            searchWords={this.state.terms}
                            autoEscape={true}
                            textToHighlight={"" +item.dominant_party}/></CardSubtitle>
                            <CardSubtitle>Population: <Highlighter
                            highlightClassName="HighlightClass"
                            searchWords={this.state.terms}
                            autoEscape={true}
                            textToHighlight={"" + item.population}/></CardSubtitle>
                            <CardSubtitle>Median Income: <Highlighter
                            highlightClassName="HighlightClass"
                            searchWords={this.state.terms}
                            autoEscape={true}
                            textToHighlight={"" +item.median_hh_income}/></CardSubtitle>
                            <CardSubtitle>Primary Energy Source: <Highlighter
                            highlightClassName="HighlightClass"
                            searchWords={this.state.terms}
                            autoEscape={true}
                            textToHighlight={"" + item.primary_energy_source_1}/></CardSubtitle>
                            <Button href= {"/state/" + item.name} class="nav-link"  to={"/state/" + item.name}> See More</Button>
                            </CardBody>
                            
                        </Card>
                        )}
                    </CardDeck>
                    <CardDeck>
                        {this.state.states.slice(6, 10).map(item =>
                           <Card>
                           {<img top width="80%" style={{width: '300px', height: '375px'}} src={"https://www.state-maps.org/"+ stateMap[item.name]+".gif"} alt={"No image"} /> }
                           <CardBody>
                           <CardTitle><Highlighter
                           highlightClassName="HighlightClass"
                           searchWords={this.state.terms}
                           autoEscape={true}
                           textToHighlight={"" + item.name}/></CardTitle>
                           <CardSubtitle>Dominate Party: <Highlighter
                           highlightClassName="HighlightClass"
                           searchWords={this.state.terms}
                           autoEscape={true}
                           textToHighlight={"" +item.dominant_party}/></CardSubtitle>
                           <CardSubtitle>Population: <Highlighter
                           highlightClassName="HighlightClass"
                           searchWords={this.state.terms}
                           autoEscape={true}
                           textToHighlight={"" + item.population}/></CardSubtitle>
                           <CardSubtitle>Median Income: <Highlighter
                           highlightClassName="HighlightClass"
                           searchWords={this.state.terms}
                           autoEscape={true}
                           textToHighlight={"" +item.median_hh_income}/></CardSubtitle>
                           <CardSubtitle>Primary Energy Source: <Highlighter
                           highlightClassName="HighlightClass"
                           searchWords={this.state.terms}
                           autoEscape={true}
                           textToHighlight={"" + item.primary_energy_source_1}/></CardSubtitle>
                           <Button href= {"/state/" + item.name} class="nav-link"  to={"/state/" + item.name}> See More</Button>
                           </CardBody>
                           
                       </Card>
                        )}
                    </CardDeck>

                
                </Col>
                </Row>
               
                </TabPanel>
                <TabPanel>
                <Row>
                <Col sm={{ size: 'auto'}}>
                <CardDeck>
                    {this.state.politicians.slice(0, 3).map(item =>
                        <Card>
                            <Container style={{height: "80%", width: "100%"}}>
                                <CardImg top width="100%" height="100%" src={item.image_url} alt={"No image"} />
                            </Container>
                            <CardBody>
                            <CardTitle><Highlighter
                           highlightClassName="HighlightClass"
                           searchWords={this.state.terms}
                           autoEscape={true}
                           textToHighlight={"" +item.first_name + " " + item.last_name}/></CardTitle>
                            <CardSubtitle>Title:  <Highlighter
                           highlightClassName="HighlightClass"
                           searchWords={this.state.terms}
                           autoEscape={true}
                           textToHighlight={"" +item.title}/></CardSubtitle>
                            <CardSubtitle>Party: <Highlighter
                           highlightClassName="HighlightClass"
                           searchWords={this.state.terms}
                           autoEscape={true}
                           textToHighlight={"" +titleMap[item.party]}/></CardSubtitle>
                            <CardSubtitle>State: <Highlighter
                           highlightClassName="HighlightClass"
                           searchWords={this.state.terms}
                           autoEscape={true}
                           textToHighlight={"" +item.state}/></CardSubtitle>
                            <CardSubtitle>Active from: Congress {item.congresses[0]["con_num"]} - Congress {item.congresses[item.congresses.length - 1]["con_num"]} </CardSubtitle>
                            <Button href= {"/politician/" + item.member_id} class="nav-link"  to={"/politician/" + item.member_id} > See More</Button>
                            </CardBody>
                            
                        </Card>
                    )}
                </CardDeck>
                <CardDeck>
                    {this.state.politicians.slice(3, 6).map(item =>
                         <Card>
                            <Container style={{height: "80%", width: "100%"}}>
                                <CardImg top width="100%" height="100%" src={item.image_url} alt={"No image"} />
                            </Container>
                         <CardBody>
                         <CardTitle><Highlighter
                        highlightClassName="HighlightClass"
                        searchWords={this.state.terms}
                        autoEscape={true}
                        textToHighlight={"" +item.first_name + " " + item.last_name}/></CardTitle>
                         <CardSubtitle>Title:  <Highlighter
                        highlightClassName="HighlightClass"
                        searchWords={this.state.terms}
                        autoEscape={true}
                        textToHighlight={"" +item.title}/></CardSubtitle>
                         <CardSubtitle>Party: <Highlighter
                        highlightClassName="HighlightClass"
                        searchWords={this.state.terms}
                        autoEscape={true}
                        textToHighlight={"" +titleMap[item.party]}/></CardSubtitle>
                         <CardSubtitle>State: <Highlighter
                        highlightClassName="HighlightClass"
                        searchWords={this.state.terms}
                        autoEscape={true}
                        textToHighlight={"" +item.state}/></CardSubtitle>
                         <CardSubtitle>Active from: Congress {item.congresses[0]["con_num"]} - Congress {item.congresses[item.congresses.length - 1]["con_num"]} </CardSubtitle>
                         <Button href= {"/politician/" + item.member_id} class="nav-link"  to={"/politician/" + item.member_id} > See More</Button>
                         </CardBody>
                         
                     </Card>
                    )}
                </CardDeck>
                <CardDeck>
                    {this.state.politicians.slice(6, 10).map(item =>
                         <Card>
                            <Container style={{height: "80%", width: "100%"}}>
                                <CardImg top width="100%" height="100%" src={item.image_url} alt={"No image"} />
                            </Container>
                         <CardBody>
                         <CardTitle><Highlighter
                        highlightClassName="HighlightClass"
                        searchWords={this.state.terms}
                        autoEscape={true}
                        textToHighlight={"" +item.first_name + " " + item.last_name}/></CardTitle>
                         <CardSubtitle>Title:  <Highlighter
                        highlightClassName="HighlightClass"
                        searchWords={this.state.terms}
                        autoEscape={true}
                        textToHighlight={"" +item.title}/></CardSubtitle>
                         <CardSubtitle>Party: <Highlighter
                        highlightClassName="HighlightClass"
                        searchWords={this.state.terms}
                        autoEscape={true}
                        textToHighlight={"" +titleMap[item.party]}/></CardSubtitle>
                         <CardSubtitle>State: <Highlighter
                        highlightClassName="HighlightClass"
                        searchWords={this.state.terms}
                        autoEscape={true}
                        textToHighlight={"" +item.state}/></CardSubtitle>
                         <CardSubtitle>Active from: Congress {item.congresses[0]["con_num"]} - Congress {item.congresses[item.congresses.length - 1]["con_num"]} </CardSubtitle>
                         <Button href= {"/politician/" + item.member_id} class="nav-link"  to={"/politician/" + item.member_id} > See More</Button>
                         </CardBody>
                         
                     </Card>
                    )}
                </CardDeck>

            </Col>
                </Row>
                
                </TabPanel>
                
            </Tabs>
            <Pagination size="lg" style={{justifyContent: 'center', paddingTop:'3%'}} aria-label="Page navigation example">
            <PaginationItem>
              <PaginationLink first onClick={() => this.handlePageClick(1)} href={""} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous onClick={() => this.handlePageClick(this.state.lastpage)} href={""} />
            </PaginationItem>
            {/* <PaginationItem>
              <PaginationLink onClick={() => this.handlePageClick(this.state.lastpage)} href={"#"}>
                {this.state.lastpage}
              </PaginationLink>
            </PaginationItem> */}
            <PaginationItem>
              <PaginationLink onClick={() => this.handlePageClick(this.state.page)} href={""}>
                {this.state.page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => this.handlePageClick(this.state.nextpage)} href={""}>
                {this.state.nextpage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink next onClick={() => this.handlePageClick(this.state.nextpage)} href={""} />
            </PaginationItem>
            {/* <PaginationItem>
              <PaginationLink last onClick={() => this.handlePageClick(this.state.pages)} href="" />
            </PaginationItem> */}
          </Pagination>
            
            
          </div>
        );
    }
}
export default Search;