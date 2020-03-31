import React, {Component} from "react";
import PropTypes from 'prop-types';
import {
    Pagination, PaginationItem, PaginationLink
    } from 'reactstrap';

    export class MyPagination extends Component {
        constructor(props) {
            super(props);
            this.state = {
                pages: 0,
                page: 1,
                nextpage: 2,
                lastpage: 1,
                isLoading: false,
            }      
        }
       
        render(){
            return(
                <div>
                    <Pagination size="lg" style={{justifyContent: 'center', paddingTop:'3%'}} >
                        <PaginationItem>
                            <PaginationLink first onClick={() =>this.props.handlePageClick(1)} href={"#"} />
                            </PaginationItem>
                        <PaginationItem>
                            <PaginationLink previous onClick={() => this.props.handlePageClick(this.props.lastpage)} href={"#"} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={() => this.props.handlePageClick(this.props.page)} href={"#"}>
                                {this.props.page}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={() => this.props.handlePageClick(this.props.nextpage)} href={"#"}>
                                {this.props.nextpage}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink next onClick={() => this.props.handlePageClick(this.props.nextpage)} href={"#"} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink last onClick={() => this.props.handlePageClick(this.props.pages)} href="#" />
                        </PaginationItem>
                    </Pagination>
                </div>
            );
        }
        
    }  
  
  export default MyPagination;
  