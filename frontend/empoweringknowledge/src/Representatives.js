import React, {Component} from "react";
import MyPagination from "./Pagination.js";
import {
    Button, ButtonGroup, Col, Card, CardImg, CardBody, CardTitle, 
    CardSubtitle, CardDeck, Dropdown, DropdownToggle, DropdownMenu, 
    DropdownItem, Form, FormGroup, Input, Pagination, PaginationItem, Container,
    Row
     } from 'reactstrap';
import { BrowserRouter} from 'react-router-dom';
import Highlighter from "react-highlight-words";
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {RepresentativeInstance} from './RepresentativeInstance.js';

const POLIURL = 'https://api.empoweringknowledge.me/api/congressmembers';
const ORDER = '"order_by":[{"field":"first_name","direction":"';

export class Representatives extends Component {

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
            first_name: "", 
            last_name: "",
            title: "", 
            party: "", 
            state: ""},
        dropdownOpen: {
            title: false, 
            party: false, 
            state: false},
        dropDownSelections: {
            title: "None", 
            party: "None", 
            state: "None"},
    }
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this); 
	this.handlePageClick = this.handlePageClick.bind(this); 
}

componentDidMount() {
    this.setState({isLoading: true});

    var url = this.buildUrl();
    console.log(url);
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
        url = POLIURL + '?q={'
        + ORDER 
        + this.state.sortBy 
        + '"}]}&page='
        + this.state.page;
    } else{ // Else, add the filters and search query
        url = POLIURL + '?q={"filters":['
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

    for(var i = 2; i < keys.length; i++){
        currAttribute = keys[i];
        currAttributeVal = this.state.attributes[currAttribute];

        // Checks if currAttribute is title, if it is then do a "like" operation
        if(currAttribute === "title"){
            if(currAttributeVal !== ""){
                if(filter === ""){
                    filter += '{"name":"title","op":"like","val":"%'
                    + currAttributeVal +'%"}'
                }else{
                    filter += ',{"name":"title","op":"like","val":"%'
                    + currAttributeVal +'%"}' 
                }   
            }
        }
        // Checks the rest of the attributes
        else if(currAttributeVal !== ""){
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
                if(currAttribute === "first_name" && i == 0)
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
		this.setState({lastpage: newPage - 1, page: newPage, 
            nextpage: newPage}, () => {
			this.componentDidMount();
		});
	}
	else{
		this.setState({lastpage: newPage - 1, page: newPage, 
            nextpage: newPage + 1}, () => {
			this.componentDidMount();
		});
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
 * Resets all the attributes and variables that are used for filtering, 
 * searching, and pagination to their default. Then calls componentDidMount() 
 * so that the new data is loaded. 
 */
handleReset(){
    this.setState({
        dropDownSelections: {
            "title":"None", 
            "party": "None", 
            "state":"None"}, 
        input: "",
        sortBy: "asc",
        attributes: {
            first_name: "", 
            last_name: "",
            title: "", 
            party: "", 
            state: ""},
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

    // Special case, If attribute is "party," then change selection to D or R
    // based on what selection is equal to
    if(attribute === "party"){
        switch(selection){
            case "Democratic":
                selection = "D"
                break;
            case "Republican":
                selection = "R"
                break;
        }
    }

    this.handleFilter(attribute, selection);
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
        <DropdownMenu 
            modifiers={{
                setMaxHeight: {
                    enabled: true,
                    order: 890,
                    fn: (data) => {
                      return {
                        ...data,
                        styles: {
                          ...data.styles,
                          overflow: 'auto',
                          maxHeight: 150,
                        },
                      };
                    },
                },
            }}>{
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
        title: [
            "None", "Representative", "Senator"],
        party: [
            "Democratic", "Republican"],
        state: [
            "Alabama", "Alaska", "Arizona", "Arkansas", "California", 
            "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
            "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
            "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
            "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
            "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
            "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
            "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
            "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
            "Washington", "West Virginia", "Wisconsin", "Wyoming"]
    }

    // Titles for the filter buttons, "Filter by: _____"
    var filterTitles = {
        title: "Title",
        party: "party",
        state: "State"
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
        first_name: "",
        title: "Title: ",
        party: "Party: ",
        state: "State: "
    }

    // Maps the attribute values for the politician's party from letter to full
    // name
    var titleMap ={
        "D": "Democratic",
        "R": "Republican",
    }

    switch(attribute){
        // If the attribute equal to "first_name", renders the 
        // attribute with a CardTitle
        case "first_name":
           return(
                <CardTitle>{attributeTitles[attribute]}<Highlighter
                    highlightClassName="HighlightClass"
                    searchWords={this.state.input.split(" ")}
                    autoEscape={true}
                    textToHighlight={"" + item[attribute] + " " + item["last_name"]}/>
                </CardTitle>
            )
        case "party":
            return(
                <CardSubtitle>{attributeTitles[attribute]}<Highlighter
                    highlightClassName="HighlightClass"
                    searchWords={this.state.input.split(" ")}
                    autoEscape={true}
                    textToHighlight={"" + titleMap[item.party]}/>
                </CardSubtitle>
            )
        // If the attribute is equal to "active", renders the 
        // attribute with the congresses the politician has been active in
        case "active":
            return(
                <CardSubtitle>
                    Active from: Congress {item.congresses[0]["con_num"]} 
                     - Congress {item.congresses[item.congresses.length - 1]
                        ["con_num"]}
                </CardSubtitle>
            )
        default:
            return(
                <CardSubtitle>{attributeTitles[attribute]}<Highlighter
                    highlightClassName="HighlightClass"
                    searchWords={this.state.input.split(" ")}
                    autoEscape={true}
                    textToHighlight={"" + item[attribute]}/>
                </CardSubtitle>
            )
    }
        
}

/*
 * Renders a card item.
 */
renderCard(item){
    // List of attributes that whose information will be rendered on each card
    var attributeList = ["first_name", "title", "party", "state", "active"]; 

    return(
        <Card>
            <Container style={{height: "80%", width: "100%"}}>
                <CardImg top width="100%" height="100%" src={item.image_url}  alt={"No image"} />
            </Container>
            <CardBody>{
                attributeList.map((attribute) => this.renderAttribute(item, attribute))
            }
            <Button href= {"/politician/" + item.member_id} class="nav-link"  to={"/politician/" + item.member_id}> See More</Button>
            </CardBody>
        </Card>
    )
}

/*
 * Creates the cards for the politicians. Loops 3 times to create 3 card decks 
 * items with 3 card items. Returns all 3 card deck items at the end. 
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
            <div className="Representatives" style={{
                    paddingTop: "25px",
                    width:"100%", 
                    height:"100%"}}>
                <div>
                    <h4 style={{paddingBottom: "25px"}}>Politicians</h4>
                    <Col lg={{ size: '15'}}>
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

export default Representatives;