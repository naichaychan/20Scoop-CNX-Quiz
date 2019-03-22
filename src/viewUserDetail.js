import React, { Component } from 'react';
import {Card,Table} from 'react-bootstrap';
import ViewUserRepos from './Component/viewUserRepos';
import  { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

class viewUserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,   
            apiAddress: "https://api.github.com/users/naichaychan", 
            error: null,
            isLoaded: false,
            items: []
        };
        this.updateApiUrl = this.updateApiUrl.bind(this);
      }
      
      componentDidUpdate() {
        var newUser=this.props.location.gitUser;
        var curUser=this.state.userName;
        if(newUser!==curUser)
        {
            var newApi="https://api.github.com/users/"+newUser;
            this.updateApiUrl(newApi,newUser);    
            this.fetchData(newApi);
        }   
      }

      componentDidMount() {
        var newUser=this.props.location.gitUser;
        var curUser=this.state.userName;
        if(newUser!==curUser)
        {
            var newApi="https://api.github.com/users/"+newUser;
            this.updateApiUrl(newApi,newUser+"Firstime");            
        }   
      }
    
      updateApiUrl(url,user) {
        this.setState({
            apiAddress:url,
            userName:user
        })
      }

      fetchData(url){
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
      

      render() {
        const { error, isLoaded, items } = this.state;
        
        if (error) {
          return (
            <div>
              <BtnBack />
              <Card responsive >
                <Card.Body>
                  <Card.Title>Result (Error:{error.message})</Card.Title>
                </Card.Body>
              </Card>
            </div>
          );
        } else if (!isLoaded) {
          return (
            <div class="text-center mt-4" >
              {(this.state.userName)?
                <Loader type="Oval" color="#66CCCC" height={80} width={80} />
                :""                
              }
            </div>
          );
        } else {
          return (
            <div>     
                <BtnBack />
                <div class="form-row mt-3s">
                    <div class="form-group col-12">
                        <Card>
                            <Card.Body>
                            <Card.Title>User detail</Card.Title>
                            <Table bordered hover responsive size="lg">
                                <thead class="thead-light text-center">
                                    <tr>
                                        <th>Pic</th>
                                        <th>User</th>
                                        <th>Total Repository</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="text-center">                                
                                            <img src={items.avatar_url}  alt={items.login} width="50px" ></img>
                                        </td>             
                                        <td>
                                            {items.login} 
                                        </td>                 
                                        <td class="text-center">
                                            {items.public_repos}
                                        </td>              
                                    </tr>
                                </tbody>
                            </Table>     
                            </Card.Body>
                        </Card>  
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-12">
                        <Card>
                        <Card.Body>                                         
                            <Card.Title>Repository list</Card.Title>
                            <ViewUserRepos gitUser={this.state.userName}/>                     
                        </Card.Body>
                        </Card>  
                    </div>
                </div>     
            </div>            
          );
        }
      }
    }
    
class BtnBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Active : false
    };
  }
  render(){
    return(
      <div>
        
        {(this.state.Active)?
            <Redirect to={{pathname: '/searchUser'}}
            /> 
            :""
        }  
        <div class="form-row mt-3">
          <div class="form-group col-12">
          <button type="button" className="btn btn-danger" onClick={() => {this.setState({Active:true})}}>Back</button>                              
          </div>
        </div>
      </div>  
    );
  }
}
export default viewUserDetail