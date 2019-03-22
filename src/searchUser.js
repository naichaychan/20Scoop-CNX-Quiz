import React, { Component } from 'react';
import {Card,Button} from 'react-bootstrap';
import SearchResultUser from './Component/searchResultUser';


class searchUser extends Component {  
  constructor(props) {
      super(props);
      this.state = {
        searchKeyword: "",
        inputText:""
      };
  
      this.btn_search_onClick = this.btn_search_onClick.bind(this);
      this.edt_input_onChange = this.edt_input_onChange.bind(this);      
    }

    edt_input_onChange(event) {
      this.setState({ inputText: event.currentTarget.value });
    }

    btn_search_onClick() {

      this.setState({searchKeyword: this.state.inputText});
    }

    render() {
      const ResultStyle = {
        fontSize: '15px'
      };      
      return(
        <div>
            <div class="form-row mt-3">
              <div class="form-group col-12">
                <Card>
                    <Card.Body>
                      <Card.Title>Search user on git hub</Card.Title>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">User : </span>
                          </div>
                          <input type="text" class="form-control mr-3" placeholder={this.state.searchKeyword} aria-label="Username" aria-describedby="basic-addon1" onChange={this.edt_input_onChange}/>                          
                          <Button class="btn btn-primary" onClick={this.btn_search_onClick}>Search</Button>
                        </div>  
                    </Card.Body>
                </Card>  
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-12" style={ResultStyle}>
                <Card>
                  <Card.Body>                                         
                    <Card.Title>Result {(this.state.searchKeyword?"("+this.state.searchKeyword+")":"")}</Card.Title>
                    <SearchResultUser keyword={this.state.searchKeyword}/>                    
                  </Card.Body>
                </Card>  
              </div>
            </div>            
        </div>
      );
    }
  }
    
export default searchUser