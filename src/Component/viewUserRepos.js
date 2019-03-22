import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import Loader from 'react-loader-spinner';

class viewUserRepos extends Component {
    constructor(props) {
        super(props);
        this.state = {
          apiAddress: "", 
          error: null,
          isLoaded: false,
          items: [],
          limitRepos: 5
        };
        this.updateApiUrl = this.updateApiUrl.bind(this);
        this.btn_LoadMore_onClick = this.btn_LoadMore_onClick.bind(this);
      }
      
      componentDidUpdate() {
        var curApi=this.state.apiAddress;
        var newApi="https://api.github.com/users/"+this.props.gitUser+"/repos?per_page=100";
        
        if(curApi!==newApi)
        {
        this.updateApiUrl(newApi);            
        // this.fetchData(newApi);            
        }
        this.fetchData(newApi);
          
      }

      componentDidMount() {
          
        var curApi=this.state.apiAddress;
        var newApi="https://api.github.com/users/"+this.props.gitUser+"/repos?per_page=100";
          if(curApi!==newApi)
          {
            this.updateApiUrl(newApi);                    
          } 
      }
    
      updateApiUrl(url) {
        this.setState({apiAddress:url})
      }

      btn_LoadMore_onClick(){
        this.setState({limitRepos:this.state.limitRepos+5})
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
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
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
                <Table bordered hover responsive size="lg">
                    <thead class="thead-light text-center">
                        <tr>
                            <th>No.</th>
                            <th>Repository Name</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                    {items.slice(0,this.state.limitRepos).map(( item, index ) => (
                        <tr key={index} >
                            <td class="text-center">
                                {index+1} 
                            </td>  
                            <td >
                                {item.name} 
                            </td>                 
                            <td>
                                {item.description}
                            </td>         
                        </tr>
                    ))}
                    </tbody>
                </Table>             
                <div class="text-center">
                  {(this.state.limitRepos<items.length)?
                    <button class="btn btn-success" onClick={this.btn_LoadMore_onClick}>Show more...</button>
                    :""
                  }
                </div>
            </div>
            
          );
        }
      }
    }
    
export default viewUserRepos