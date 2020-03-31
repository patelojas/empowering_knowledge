import React, {Component} from "react";
import {
    Button, ButtonGroup, ButtonToolbar, Dropdown, DropdownToggle, 
    DropdownMenu, DropdownItem, Table, Col, Pagination, PaginationItem, Form, 
    Input, FormGroup, Row, Container
     } from 'reactstrap';
import Highlighter from "react-highlight-words";
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyPagination from "./Pagination.js";

const BILLSSURL = 'https://api.empoweringknowledge.me/api/bills';
const ORDER = '"order_by":[{"field":"title","direction":"';

export class EnergyBills extends Component {

constructor(props) {
    super(props);
    this.state = {
        page: 1,
		pages: 0,
		nextpage: 2,
		lastpage: 1,
        items: [],
        input:"",
        isLoading: false,
        sortBy: "asc",
        attributes: {
            title: "",
            sponsor_id: "",
            committees: "", 
            introduced_date: "",
            house_passage: "",
            senate_passage: "",
            cosponsors_by_party_D: "",
            cosponsors_by_party_R: ""},
        dropdownOpen: {
            committee: false, 
            year: false},
        dropDownSelections: {
            "committee": "None", 
            "year":"None"}
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
        url = BILLSSURL + '?q={'
        + ORDER 
        + this.state.sortBy 
        + '"}]}&page='
        + this.state.page;
    } else{ // Else, add the filters and search query
        url = BILLSSURL + '?q={"filters":['
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

    // Only want loop through 2 attributes, committees and introduced_date,
    for(var i = 2; i < keys.length - 4; i++){
        currAttribute = keys[i];
        currAttributeVal = this.state.attributes[currAttribute];

        if(currAttribute === "introduced_date"){
            if(currAttributeVal !== ""){
                if(filter === ""){
                    filter += '{"name":"' + currAttribute 
                        + '","op":"like","val":"'+ currAttributeVal +'\%"}'
                }else{
                    filter += ',{"name":"' + currAttribute 
                        + '","op":"like","val":"'+ currAttributeVal +'\%"}'
                }
            }   
        }

        else if (currAttributeVal !== ""){
            if(filter === ""){
                filter += '{"name":"' + currAttribute 
                    + '","op":"like","val":"\%'+ currAttributeVal +'\%"}'
            }else{
                filter += ',{"name":"' + currAttribute 
                    + '","op":"like","val":"\%'+ currAttributeVal +'\%"}'
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
                if(currAttribute === "title" && i == 0)
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
 * Returns the bill sponsor's name.
 */ 
getName(value){
  if(value != null){
      return ("" + value.first_name + " " + value.last_name)
  }
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
            "committee":"None", 
            "year": "None"}, 
        input: "", 
        sortBy: "asc",
        attributes: {
            title: "",
            sponsor_id: "",
            committees: "", 
            introduced_date: "",
            house_passage: "",
            senate_passage: "",
            cosponsors_by_party_D: "",
            cosponsors_by_party_R: ""},
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

    if(attribute === "committee")
        this.handleFilter("committees", selection);

    else if(attribute === "year")
        this.handleFilter("introduced_date", selection);
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
        committee: [
            "None", "Agriculture","Appropriations", "Armed Services", "Budget",
            "Banking", "Education", "Energy", "Ethics", "Financial Services",
            "Foreign", "Homeland Security", "Administration", "Judiciary",
            "Natural Resources", "Oversight and Reform", "Rules", 
            "Administration", "Science", "Small Business", "Transportation", 
            "Veterans' Affairs", "Ways and Means", "Judiciary", 
            "Natural Resources"],
        year: [
            "None", "1993", "1994", "1995", "1996", "1997", "1998", "1999", 
            "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007",
            "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015",
            "2017", "2018","2019"]
    }

    // Titles for the filter buttons, "Filter by: _____"
    var filterTitles = {
        committee: "Committee",
        year: "Year",
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
    
    // Special case, if the attribute is "title", add a link to the bill
    if(attribute === "title"){
        return(
            <td> 
                <a href= {"/bill/" + item.bill_id}   to={"/bill/" 
                    + item.bill_id}><Highlighter
                        highlightClassName="HighlightClass"
                        searchWords={this.state.input.split(" ")}
                        autoEscape={true}
                        textToHighlight={"" + item.title}/></a>
            </td>
        )
    }

    // Special case, if the attribute is "sponsor_id", add a link to the sponsor
    else if(attribute === "sponsor_id"){
        return(
            <td>
                 <a href= {"/politician/" + item.sponsor_id}   to={"/politician/"
                     + item.sponsor_id}><Highlighter
                        highlightClassName="HighlightClass"
                        searchWords={this.state.input.split(" ")}
                        autoEscape={true}
                        textToHighlight={"" + this.getName(item.sponsor_rs)}/></a></td>
        )
    }

    return(
        <td> <Highlighter
                highlightClassName="HighlightClass"
                searchWords={this.state.input.split(" ")}
                autoEscape={true}
                textToHighlight={"" + item[attribute]}/>
        </td>
    )
 }

/*
 * Creates the rows for the table. Loops through all of the attributes and calls
 * renderAttribute() so each attribute is rendered. 
 */
renderRows(item){
    var rowAttributes = []; // Will hold all of the rendered attributes
    var attributeList = Object.keys(this.state.attributes);
   
    // Loop through attributes and render each of them
    attributeList.map(attribute => rowAttributes.push(this.renderAttribute(item, attribute)));

    return (
        <tr>
            <th scope="row"></th>
            {rowAttributes}
        </tr>
    );
}

/*
 * Renders rows for the energy bils.
 */
renderTable(){
    const items = this.state.items;

    return(
        <Table hover responsive>
            <thead>
            <tr>
                <th></th>
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
                {items.map(item => this.renderRows(item))}
            </tbody>

        </Table>
    )
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
            <div className="EnergyBills" style={{
                    paddingTop: "25px",
                    width:"100%", 
                    height:"60%"}}>
                <h4 style={{paddingBottom: "25px"}}>Energy Bills</h4>
                <div>
                    <Col sm={{ size: 'auto'}}>
                        {this.renderTable()}
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

export default EnergyBills;