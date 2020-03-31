import React, {Component} from "react";
import './About.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col,
    Card, CardImg, CardText, CardBody,
    CardTitle,  CardDeck,
    } from 'reactstrap';
import brianaImg from './briana.jpg';
import edwinImg from './edwin.jpeg';
import ryanImg from './ryan.jpg';
import ojasImg from './ojas.jpg';
import travisImg from './travis.jpeg';
export class About extends Component {
    constructor(props) {
      super(props);
      this.state = {
        people: [],
        issues:[]
      };
    }
    componentWillMount() {
        fetch('https://gitlab.com/api/v4/projects/14474532/repository/contributors')
        .then(res => res.json())
        .then((data) => {
          this.setState({ people: data });
        })
        .catch(console.log)
        var page = 1;
        var val = [];

        while(page < 4){
            fetch('https://gitlab.com/api/v4/projects/14474532/issues?page='+ page)
            .then(res => res.json())
            .then((info) => {
                this.setState({
                    issues: this.state.issues.concat(info)
                })
        
            })
            page += 1
        }
       
    }
    loadData(){
       
    }
    render() {
        var briana = {'commits':0, 'issues':0}
        var ojas = {'commits':0, 'issues':0}
        var travis = {'commits':0, 'issues':0}
        var edwin = {'commits':0, 'issues':0}
        var ryan = {'commits':0, 'issues':0}
        var totalCommits = 0
        var totalIssues = 0
        var person;
        for(person of this.state.people){
            if(person.name == "Ojas Patel"){
                ojas['commits'] += person.commits;
            } 
            else if(person.name == "Travarin"){
                travis['commits'] += person.commits;
            }
            else if(person.name == "Edwin_Silerio"){
                edwin['commits'] += person.commits;
            }
            else if(person.name == "Ryan Morris"){
                ryan['commits'] += person.commits;
            }
            else if(person.name == "brianawhite"){
                briana['commits'] += person.commits;
            }
            
        }
        var issue;
        var i;
        for(i in this.state.issues){
            if(this.state.issues[i].closed_by != null){
                if(this.state.issues[i].closed_by.name == "Ojas Patel"){
                    ojas['issues'] += 1;
                } 
                else if(this.state.issues[i].closed_by.name == "Travis Langston"){
                    travis['issues'] += 1;
                }
                else if(this.state.issues[i].closed_by.name == "Edwin Silerio"){
                    edwin['issues'] += 1;
                }
                else if(this.state.issues[i].closed_by.name == "Ryan Morris"){
                    ryan['issues'] += 1;
                } 
                else if(this.state.issues[i].closed_by.name == "Briana White"){
                    briana['issues'] += 1;
                }
            }
            
        }
        totalCommits = ojas['commits'] + travis['commits'] + edwin['commits'] + ryan['commits'] + briana['commits']
        totalIssues = ojas['issues'] + travis['issues'] + edwin['issues'] + ryan['issues'] + briana['issues']
      console.log(briana)
      return (
        <div className = "main">
            <div className="About">
                <h1 style= {{ textAlign: "center", paddingTop: '3%',color: '#000000'}}>About Us</h1>
                <p style= {{ textAlign: "center", paddingLeft:'5%', paddingRightt: '5%',color: '#000000'}}>We believe that everyone needs to know where their energy is coming from and who is making those decisions. Today, more than ever, we need to make the right choices and how to get our energy and what the impact of energy-related legislation is. This site contains information on states, members of Congress, and legislation related to energy so EVERYONE can make educated decisions.</p>        
                <p style= {{ textAlign: "center", paddingLeft:'5%', paddingRightt: '5%',paddingTop: '1%', color: '#000000'}}>Our goal in integrating the data is to see if there is a connection between different aspects of a state such as the primary partisanship, population, GDP, and energy consumption and the representatives they elect. In turn, we want to explore if there are characteristics of representatives that might determine how they vote on different energy bills and legislation.</p>        

            </div>
            <div className = "cards" style= {{MarginTop: 10, paddingTop: '5%'}}>
                <Row>
                    <Col sm={{ size: '10'}} style={{paddingLeft: '17%'}}>
                        <CardDeck>
                            <Card>
                                <CardImg top width="100%" src={brianaImg} />
                                <CardBody>
                                <CardTitle style={{fontSize: '20px'}}>Briana White</CardTitle>
                                <CardText>Senior at UTCS. Enjoys painting, playing video games, and watching movies</CardText>
                                <CardText>Frontend</CardText>
                                <CardText>Commits: {briana['commits']}</CardText>
                                <CardText>Issues: {briana['issues']}</CardText>
                                <CardText>Unit tests: 10</CardText>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardImg top width="0%" src={edwinImg} alt="Card image cap" />
                                <CardBody>
                                <CardTitle style={{fontSize: '20px'}}>Edwin Silerio</CardTitle>
                                <CardText>Can probably find him playing Monster Hunter in his free time.</CardText>
                                <CardText>Frontend</CardText>
                                <CardText>Commits: {edwin['commits']}</CardText>
                                <CardText>Issues: {edwin['issues']}</CardText>
                                <CardText>Unit tests: 10</CardText>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardImg top width="100%" src={ojasImg} alt="Card image cap" />
                                <CardBody>
                                <CardTitle style={{fontSize: '20px'}}>Ojas Patel</CardTitle>
                                <CardText>Likes eating expensive pasta and watching the Teenage Mutant Ninja Turtles</CardText>
                                <CardText>Backend</CardText>
                                <CardText>Commits: {ojas['commits']}</CardText>
                                <CardText>Issues: {ojas['issues']}</CardText>
                                <CardText>Unit tests: 19</CardText>
                                </CardBody>
                            </Card>
                            </CardDeck>
                        </Col>
                </Row>
                <Row>
                    <Col sm={{ size: '10'}} style={{paddingTop: "5px",paddingLeft: "17%"}}>
                        <CardDeck>
                            <Card>
                                <CardImg top width="100%" src={ryanImg} alt="Card image cap" />
                                <CardBody>
                                <CardTitle style={{fontSize: '20px'}}>Ryan Morris</CardTitle>
                                <CardText>CS/English double major. Likes punk music and creative writing.</CardText>
                                <CardText>Backend</CardText>
                                <CardText>Commits: {ryan['commits']}</CardText>
                                <CardText>Issues: {ryan['issues']}</CardText>
                                <CardText>Unit tests: 61</CardText>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardImg top width="100%" src={travisImg} alt="Card image cap" />
                                <CardBody>
                                <CardTitle style={{fontSize: '20px'}}>Travis Langston</CardTitle>
                                <CardText>Junior CS Major. Loves Scuba Diving and going to metal concerts.</CardText>
                                <CardText>Backend</CardText>
                                <CardText>Commits: {travis['commits']}</CardText>
                                <CardText>Issues: {travis['issues']}</CardText>
                                <CardText>Unit tests: 15</CardText>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardBody>
                                <CardTitle style={{fontSize: '30px'}}>Total Stats</CardTitle>
                                <CardText>Commits: {totalCommits}</CardText>
                                <CardText>Issues: {totalIssues}</CardText>
                                <CardText>Unit tests: 115</CardText>
                                </CardBody>
                            </Card>
                        </CardDeck>
                    </Col>
                </Row>
            </div>
            <div className="Stats">
                <h1 style= {{ textAlign: "center", paddingTop: '5%',color: '#000000'}}>Project Links</h1>
                <ListGroup>
                    <ListGroupItem >
                        <ListGroupItemHeading tag="a" href="https://gitlab.com/patelojasv/cs373-web">GitLab Repo</ListGroupItemHeading>
                            <ListGroupItemText>
                                Used to collect information in a JSON format about energy consumption and production
                            </ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading tag="a" href="https://documenter.getpostman.com/view/8970166/SVtR1AJx">Postman Documentation API</ListGroupItemHeading>
                            <ListGroupItemText>
                                Used to collect information in a JSON format about members of Congress
                            </ListGroupItemText>
                    </ListGroupItem>
                </ListGroup>
                <h1 style= {{ textAlign: "center", paddingTop: '5%',color: '#000000'}}>Data</h1>
                <ListGroup>
                    <ListGroupItem >
                        <ListGroupItemHeading tag="a" href="https://www.eia.gov/opendata/commands.php">ETA</ListGroupItemHeading>
                            <ListGroupItemText>
                                Used to collect information in a JSON format about energy consumption and production
                            </ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading tag="a" href="https://projects.propublica.org/api-docs/congress-api/">ProPublica</ListGroupItemHeading>
                            <ListGroupItemText>
                                Used to collect information in a JSON format about members of Congress
                            </ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading tag="a" href="https://datausa.io/about/api/">Data USA</ListGroupItemHeading>
                            <ListGroupItemText>
                                Used to collect information in a JSON format about different states in the United States of America
                            </ListGroupItemText>
                    </ListGroupItem>
                </ListGroup>
                <p style= {{ textAlign: "center", paddingLeft:'5%',paddingTop: '1%',color: '#000000'}}>We scraped each data source using Postman, which generated Python code for us, leveraging the Python requests library.</p>
                <h1 style= {{ textAlign: "center", paddingTop: '5%',color: '#000000'}}>Tools</h1>
                <ListGroup>
                    <ListGroupItem >
                        <ListGroupItemHeading tag="a" href=" https://reactjs.org/">React</ListGroupItemHeading>
                            <ListGroupItemText>
                            Frontend framework used to build our website
                            </ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading tag="a" href="https://reactstrap.github.io/">Reactstrap</ListGroupItemHeading>
                            <ListGroupItemText>
                            Tool with React4 Bootstrap components, making the website beautiful and clean 
                            </ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading tag="a" href="https://slack.com/">Slack</ListGroupItemHeading>
                            <ListGroupItemText>
                            Allowed for easy communication within the team
                            </ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading tag="a" href=" https://www.getpostman.com/">Postman</ListGroupItemHeading>
                            <ListGroupItemText>
                            Pulled data from different APIs and created and documented our API
                            </ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading tag="a" href="https://gitlab.com/">GitLab</ListGroupItemHeading>
                            <ListGroupItemText>
                            Version control software
                            </ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading tag="a" href="https://palletsprojects.com/p/flask/">Flask</ListGroupItemHeading>
                            <ListGroupItemText>
                            Python framework to route API calls
                            </ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading tag="a" href="https://www.namecheap.com/">Namecheap</ListGroupItemHeading>
                            <ListGroupItemText>
                            Free domain name provider
                            </ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading tag="a" href="https://aws.amazon.com/">Amazon Web Services (AWS)</ListGroupItemHeading>
                            <ListGroupItemText>
                            Used to host and support the website
                            </ListGroupItemText>
                    </ListGroupItem>
                </ListGroup>

            </div>
            
        </div>
      );
    }
}

export default About;