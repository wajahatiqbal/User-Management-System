import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: [],
            age: '',
            operator: 'LT'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.onClickAge = this.onClickAge.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({
            operator: e.target.value
        })
    }

    handleFieldChange(e){
        this.setState({
            age: e.target.value
        })
    }

    handleSubmit(e){
        console.log(this.state.operator)
        console.log(this.state.age)
        e.preventDefault();
        

        
        axios.get(`http://localhost:4000/user/filter?age=${this.state.age}&operator=${this.state.operator}`)
        .then(response => {
          this.setState({ user: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    onClickAge(e){
        axios.get('http://localhost:4000/user/sort')
        .then(response => {
            this.setState({ user: response.data });
          })
          .catch(function (error) {
            console.log(error);
          })
    }


    componentDidMount(){
      axios.get('http://localhost:4000/user/')
        .then(response => {
          this.setState({ user: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
    return this.state.user.map((object, i)=>{
        return <TableRow obj={object} key={i} refresh={()=>{
            axios.get('http://localhost:4000/user/')
        .then(response => {
            this.setState({ user: response.data });
        })
        .catch(function (error) {
            console.log(error);
        })}} />;
    });
    }

    render() {
      return (
        <div>
            <h3 align="center">User List</h3>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group" align="center">
                    <label>
                        Age
                        <select 
                        value={this.state.value} 
                        onChange={this.handleChange} 
                        style={{marginLeft: 20}}>
                            <option value="LT">LT</option>
                            <option value="LTE">LTE</option>
                            <option value="GT">GT</option>
                            <option value="GTE">GTE</option>
                            <option value="EQ">EQ</option>
                            <option value="NE">NE</option>
                        </select>
                        <input type="text" 
                        style={{marginLeft: 20}} 
                        value={this.state.value} 
                        onChange={this.handleFieldChange} />
                    </label>
                    <input type="submit" value="Submit" style={{marginLeft: 20, marginBottom: 5}} className= "btn btn-primary" />
                    
                    
                </div>
            </form>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Person</th>
                    <th onClick={this.onClickAge}>Age</th>
                    <th>Salary</th>
                    <th>Address</th>
                    <th colSpan="2">Action</th>
                </tr>
                </thead>
                <tbody>
                { this.tabRow() }
                </tbody>
            </table>
        </div>
      );
    }
  }