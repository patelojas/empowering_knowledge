import React, {Component} from "react";
import {
    Button, ButtonGroup, Col, Card, CardBody, CardTitle, CardSubtitle, 
    CardDeck, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Form, Input, 
    FormGroup, Row
    } from 'reactstrap';
import {BrowserRouter} from 'react-router-dom';
import Highlighter from "react-highlight-words";
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyPagination from "./Pagination.js";

const STATESURL = 'https://api.empoweringknowledge.me/api/states';
const ORDER = '"order_by":[{"field":"name","direction":"';

export class States extends Component {

constructor(props) {
    super(props);
    this.state = {
        page: 1,
        pages: 0,
        nextpage: 2,
        lastpage: 1,
        items: [],
        input: "",
        isLoading: false,
        sortBy: "asc",
        attributes: {
            name: "", 
            dominant_party: "", 
            population: {"lower": "", "upper": ""}, 
            median_hh_income: {"lower": "", "upper": ""}, 
            primary_energy_source_1: ""},
        dropdownOpen: {
            party: false, 
            population: false, 
            median: false, 
            resource: false},
        dropDownSelections: {
            party: "None", 
            population: "None", 
            median: "None", 
            resource: "None"},
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handlePageClick = this.handlePageClick.bind(this); 
}

componentDidMount() {
    this.setState({isLoading: true});

    var url = this.buildUrl();

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            this.setState({ items: data.objects, items: data.objects, 
                pages:data.total_pages,isLoading: false}, () => {
                if(this.state.pages <= 1)
                    this.setState({nextpage: 1})    
            });      
        })
        .catch(console.log);
}

/*
 * Builds the url that will be used to fetch the data.
 */
buildUrl(){
    var filter = "";
    var url = "";
    
    filter = this.buildFilter();
    filter = this.buildSearch(filter);
    
    // If there aren't any filters or terms for searching, use default url
    // that displays data in ascending order
    if(filter === ""){
        url = STATESURL + '?q={'
        + ORDER 
        + this.state.sortBy 
        + '"}]}&page='
        + this.state.page;
    } else{ // Else, add the filters and search query
        url = STATESURL + '?q={"filters":['
        + filter
        + '],'
        + ORDER
        + this.state.sortBy 
        + '"}]}&page='
        + this.state.page;
    }

    return url;
}

/*
 * Loops through all of the of the model's filterable attributes and checks if 
 * there is a filter being applied. If there is, it adds that filter query to 
 * the filter string. 
 */
buildFilter(){
    var filter = "";
    var keys = Object.keys(this.state.attributes); // Grabs list of attributes
    var currAttribute = "";
    var currAttributeVal = "";

    for(var i = 1; i < keys.length; i++){
        currAttribute = keys[i];
        currAttributeVal = this.state.attributes[currAttribute];

        // Special cases, checks if the attribute we're looking at is population 
        // or median
        if(currAttribute === "population" || 
            currAttribute === "median_hh_income"){
            if(currAttributeVal["lower"] !== ""){
                // If filter is empty, no comma is needed at the beginning
                if(filter === ""){ 
                    filter += '{"name":"' + currAttribute   
                        + '","op":"gt","val":"'+ currAttributeVal["lower"] +'"}'
                } else{
                    filter += ',{"name":"' + currAttribute 
                        + '","op":"ge","val":"'+ currAttributeVal["lower"] +'"}'
                }

                // Adds the second value to the filter query
                if(currAttributeVal["upper"] !== "")
                    filter += ',{"name":"' + currAttribute 
                        + '","op":"le","val":"'+ currAttributeVal["upper"] +'"}'
            }
        }

        // Checks the rest of the attributes
        else if( currAttributeVal !== ""){
            if(filter === ""){
                filter += '{"name":"' + currAttribute 
                    + '","op":"eq","val":"'+ currAttributeVal +'"}'
            }else{
                filter += ',{"name":"' + currAttribute 
                    + '","op":"eq","val":"'+ currAttributeVal +'"}'
            }
        }
    }

    return filter;
}

/*
 * Loops through all of the model's attributes and adds a search query for each
 * term the user inputs. 
 */
buildSearch(filter){
    var search = "";
    var input = [];
    var keys = Object.keys(this.state.attributes);
    var currAttribute = "";

    input = this.state.input.split(" "); // List of terms the user inputs

    // Checks if there's atleast one search term
    if(input[0] != ""){
        // Checks if anything precedes this query
        // If something does, add a comma
        if(filter === ""){ 
            search = '{"or":['
        }
        else{
            search = ',{"or":['
        }

        // Loops through each of the attributes
        for(var j = 0; j < keys.length; j++){
            // Loops through each term the user inputs
            for(var i = 0; i < input.length; i++){
                currAttribute = keys[j]
                // Special case, adds comma if this is the first entry in the 
                // search query 
                if(currAttribute === "name" && i == 0)
                    search += '{"name":"' + currAttribute 
                        + '","op":"like","val":"\%'+ input[i] +'\%"}'
                else
                    search += ',{"name":"' + currAttribute 
                        + '","op":"like","val":"\%'+ input[i] +'\%"}'
            }
        }

        search += "]}";
        filter += search;
    }

    return filter;
}

/*
 * Sets the state input variable to what the user types.
 */
handleTermChange(e) {
    this.setState({ input: e.target.value });
}

/*
 * Calls componentDidMount so the data that is displayed is updated.
 */
handleSearch() {
    this.componentDidMount();
}

/*
 * If the user presses 'Enter', calls the handleSearch() method so that the 
 * search is made.
 */
handleEnter(e) {
    if (e.key === 13) {
        this.handleSearch();
    }
}

/*
 * If the user clicks on the 'Submit' buttion, calls the handleSearch() 
 * method so that the search is made.
 */
handleSubmit(e) {
    e.preventDefault();
    this.handleSearch();
}

/*
 * Sets the state sort variable to what the user chooses. Either 'asc' 
 * or 'desc.' Then calls componentDidMount() so that the new data is loaded. 
 */
handleSorting(sort){
    this.setState({sortBy: sort}, () => {
    this.componentDidMount();
    });
}

/*
 * Updates the state attributes variable to what the user chooses for the 
 * specified filter. Then calls componentDidMount() so that the new data 
 * is loaded. 
 */
handleFilter(attribute, filter){
    var newAttributes = this.state.attributes;
    newAttributes[attribute] = filter;

    this.setState({attributes: newAttributes, page: 1, 
                   nextpage: 2, lastpage: 1}, () =>{
    this.componentDidMount();
    });
}

/*
* Updates page variables that are used in pagination when the user clicks 
* on a new page number to go to. Then calls componentDidMount() so that the 
* new data is loaded. 
*/
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

/*
 * Resets all the attributes and variables that are used for filtering, 
 * searching, and pagination to their default. Then calls componentDidMount() 
 * so that the new data is loaded. 
 */
handleReset(){
    this.setState({
            dropDownSelections: {
                "party":"None", 
                "population": "None", 
                "median":"None", 
                "resource":"None"}, 
            input: "", 
            sortBy: "asc",
            attributes: {
                name: "", 
                dominant_party: "", 
                population: {"lower": "", "upper": ""}, 
                median_hh_income: {"lower": "", "upper": ""}, 
                primary_energy_source_1: ""},
            page: 1, 
            nextpage: 2, 
            lastpage: 1}, () =>{
    this.componentDidMount();
    });
}

/*
 * Toggles the dropdown option for the specified filterable attribute.
 */
setDropdownOpen(attribute){
    var newdropdownOpen = this.state.dropdownOpen;
    newdropdownOpen[attribute] = !newdropdownOpen[attribute];

    this.setState({dropdownOpen: newdropdownOpen});
}

/*
 * Sets the title variable for the dropdown menu of the correct filter. Then
 * checks the attribute that was passed in. Updates variables where needed and 
 * calls handleFilter() with the attribute name and value.
 */
setDropDownTitle(attribute, selection){
    var newDropDownSelections = this.state.dropDownSelections;
    newDropDownSelections[attribute] = selection;

    this.setState({dropDownSelections: newDropDownSelections});

    if(selection === "None"){
        selection = "";
    }

    if(attribute === "party")
        this.handleFilter("dominant_party", selection)

    else if(attribute === "population"){
        var lowerPop = ""
        var upperPop = ""
        switch(selection){
            case "1 - 999,999":
                selection = {"lower": "1", "upper": "999999"}
                break;
            case "1,000,000 - 9,999,999":
                selection = {"lower": "1000000", "upper": "9999999"}
                break;
            case "10,000,000 - 19,999,999":
                selection = {"lower": "10000000", "upper": "19999999"}
                break;
            case "> 20,000,000":
                selection = {"lower": "20000000", "upper": ""}
                break;
            default:
                selection = {"lower": "", "upper": ""}
        }
        this.handleFilter("population",selection);
    }

    else if(attribute === "median"){
        switch(selection){
            case "1 - 49,999":
                selection = {"lower": "1", "upper": "49999"}
                break;
            case "50,000 - 59,999":
                selection = {"lower": "50000", "upper": "59999"}
                break;
            case "60,000 - 69,999":
                selection = {"lower": "60000", "upper": "69999"}
                break;
            case "> 70,000":
                selection = {"lower": "70000", "upper": ""}
                break;
            default:
                selection = {"lower": "", "upper": ""}
        }
        this.handleFilter("median_hh_income",selection);
    }

    else if(attribute === "resource")
        this.handleFilter("primary_energy_source_1",selection);
}

/* 
 * Renders the button group for filters.
 */
renderFilterButtonGroup(attribute, filterOptions, filterTitles){ 
    return (
    <Dropdown isOpen={this.state.dropdownOpen[attribute]} toggle={() => this.setDropdownOpen(attribute)}>
        <DropdownToggle caret>
            Filter by {filterTitles[attribute]}: {this.state.dropDownSelections[attribute]}
        </DropdownToggle>
        <DropdownMenu>{
                filterOptions[attribute].map((selection) =>
                    <DropdownItem onClick={() => this.setDropDownTitle(attribute, selection)}>{selection}</DropdownItem>
                )
            }
        </DropdownMenu>{' '}
    </Dropdown>
    )
}

/*
 * Renders the buttons for filters and sorting.
 */
renderTop(){
    // Lists of all of the options for filtering for each attribute
    var filterOptions = {
        party: [
            "None", "Democratic", "Republican"],
        population: [
            "None", "1 - 999,999", "1,000,000 - 9,999,999", 
            "10,000,000 - 19,999,999", "> 20,000,000"],
        median: [
            "None", "1 - 49,999", "50,000 - 59,999", 
            "60,000 - 69,999", "> 70,000"],
        resource:  [
            "None", "Nuclear Power", "Natural Gas", "Coal", "Petroleum", 
            "Hydroelectricity"]
    }

    // Titles for the filter buttons, "Filter by: _____"
    var filterTitles = {
        party: "Party",
        population: "Population",
        median: "Income",
        resource: "Energy"
    }

    // Grabs list of filterable attributes
    var attributesList = Object.keys(filterOptions);

    return(
        <container>
            <Row>
                <Col className="text-left">
                    <ButtonGroup>{
                            // Renders all the filter buttons
                            attributesList.map((attribute) => 
                                this.renderFilterButtonGroup(attribute, filterOptions, filterTitles))         
                        }
                        <Button onClick={() => this.handleReset()}>Reset</Button>{' '}
                    </ButtonGroup>
                </Col>
                <Col className="text-right">
                    <Button color="primary" onClick={() => this.handleSorting("asc")}>Ascending</Button>{' '}
                    <Button color="secondary"onClick={() => this.handleSorting("desc")}>Descending</Button>{' '}
                </Col>
            </Row>
            <Form className="searchbox" onSubmit={this.handleSubmit}>
                <FormGroup row style={{paddingTop: "25px"}}>
                    <Col sm={{ size: 'auto', offset: 5 }}>
                        <Input
                            type="text"
                            placeholder="Search"
                            onChange={this.handleTermChange}
                            onKeyDown={this.handleEnter}
                        />
                    </Col>
                </FormGroup>
            </Form>

        </container>
    );
}

/*
 * Renders the body of a card item.
 */
 renderAttribute(item, attribute){
    // Titles for the attributes in the card body
    var attributeTitles = {
        name: "",
        dominant_party: "Dominate Party: ",
        population: "Population: ",
        median_hh_income: "Median Income: ",
        primary_energy_source_1: "Primary Energy Source: "
    }

    // Special case, if the attribute is the name, renders the attribute with
    // a CardTitle
    if(attribute === "name"){
       return(
        <CardTitle>{attributeTitles[attribute]}<Highlighter
            highlightClassName="HighlightClass"
            searchWords={this.state.input.split(" ")}
            autoEscape={true}
            textToHighlight={"" + item[attribute]}/>
        </CardTitle>
        )
    }

    return(
        <CardSubtitle>{attributeTitles[attribute]}<Highlighter
            highlightClassName="HighlightClass"
            searchWords={this.state.input.split(" ")}
            autoEscape={true}
            textToHighlight={"" + item[attribute]}/>
        </CardSubtitle>
    )
    

 }

/*
 * Renders a card item.
 */
renderCard(item){
    var attributeList = Object.keys(this.state.attributes); // Makes list of attributes

    return(
        <Card>
            <img 
                top width="80%" 
                style={{width: '300px', height: '375px'}}  
                src={"https://www.state-maps.org/" 
                    + item.congress_members[1]["state_abr"].toLowerCase() 
                    + ".gif" } alt={"No image"} />
            <CardBody>{
                attributeList.map((attribute) => this.renderAttribute(item, attribute))
            }
            <Button href= {"/state/" + item.name} class="nav-link"  to={"/state/" + item.name}> See More</Button>
            </CardBody>
        </Card>
    )
}

/*
 * Creates the cards for the states. Loops 3 times to create 3 card decks itmems
 * with 3 card items. Returns all 3 card deck items at the end. 
 */
renderCards(){
    const items = this.state.items;
    var cardDecks = []; // Will hold the card deck items
    var cards = []; // Will hold the card 
   
    // Need 3 card deck items so loop 3 times
    for(var i = 0; i < 3; i++){
        cards = []; // Clears out the old card items to make a new one
        // Grabs 3 pieces of data at a time, creates card items for each of them
        // and adds each one to the cards list
        items.slice(i * 3,(i + 1) * 3).map(item => cards.push(this.renderCard(item))
        )
        // Adds the 3 newly created cards to the cardDecks list
        cardDecks.push(<CardDeck>{cards}</CardDeck>);
    }
    return cardDecks;
}

/*
 * Renders the entire page.
 */
render() {
    return (
        <div>
            <div>
                {this.renderTop()}
            </div>
            <div className="States" style={{
                    paddingTop: "25px",
                    width:"100%", 
                    height:"60%"}}>
                <div>
                    <h4 style={{paddingBottom: "25px"}}>States</h4>
                    <Col sm={{ size: 'auto'}}>
                        {this.renderCards()}
                    </Col>
                </div>
                <div>
                    <MyPagination 
                        pages = {this.state.pages} 
                        handlePageClick = {this.handlePageClick}
                        nextpage = {this.state.nextpage} 
                        lastpage = {this.state.lastpage}
                        page = {this.state.page}/> 
                </div>
            </div>
        </div>
    );
}


}

export default States;