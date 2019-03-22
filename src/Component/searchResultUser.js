import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import  { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

class searchResultUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          apiAddress: "https://api.github.com/search/users?q="+this.props.keyword+"+in:login+type:user", 

          error: null,
          isLoaded: false,
          items: [],

          selectUser:null
        };
        this.updateApiUrl = this.updateApiUrl.bind(this);
      }
      
      componentDidUpdate() {
        var curApi=this.state.apiAddress;
        var newApi="https://api.github.com/search/users?q="+this.props.keyword+"+in:login+type:user";
          if(curApi!==newApi)
          {
            this.updateApiUrl(newApi);            
            this.fetchData(newApi);
          }
          
      }

      componentDidMount() {
        this.fetchData(this.state.apiAddress);  
      }
    
      updateApiUrl(url) {
        this.setState({apiAddress:url})
      }
      
      fetchData(url){
        fetch(url)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                items: result.items
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
              Error:{error.message}
            </div>
          );
        } else if (!isLoaded) {
          return (
            <div class="text-center">
              <Loader type="Oval" color="#66CCCC" height={80} width={80} />
            </div>
          );
        } else {
          return (
            <div>   
                {(this.state.selectUser)?
                    <Redirect to={{
                        pathname: '/viewUserDetail',
                        gitUser: this.state.selectUser
                      }}
                    /> 
                    :""
                }  
                    
                <Table bordered hover responsive size="lg">
                    <thead class="thead-light text-center">
                        <tr>
                            <th>Pic</th>
                            <th>User</th>
                            <th>URL</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item.id} >
                            <td class="text-center">                                
                                <img src={item.avatar_url}  alt={item.login} width="50px" ></img>
                            </td>             
                            <td>
                                {item.login} 
                            </td>                 
                            <td>
                                {item.url}
                            </td>                 
                            <td class="text-center">
                              <button type="button" className="btn btn-primary" onClick={() => {this.setState({selectUser:item.login})}}>Detail</button>                              
                            </td>   
                        </tr>
                    ))}
                    </tbody>
                </Table>             
            </div>
            
          );
        }
      }
    }
    
export default searchResultUser