import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangePersonId = this.onChangePersonId.bind(this)
    this.onChangePersonName = this.onChangePersonName.bind(this);
    this.onChangePersonAge = this.onChangePersonAge.bind(this);
    this.onChangePersonSalary = this.onChangePersonSalary.bind(this);
    this.onChangePersonAddress = this.onChangePersonAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        person_id: '',
        person_name: '',
        person_age: '',
        person_salary: '',
        person_address: ''
    }
  }

    componentDidMount() {
        axios.get('http://localhost:4000/user/edit/'+this.props.match.params.id)
            .then(response => {
                this.setState({ 

                    person_id: response.data.person_id,
                    person_name: response.data.person_name, 
                    person_age: response.data.person_age,
                    person_salary: response.data.person_salary,
                    person_address: response.data.person_address });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangePersonId(e) {
        this.setState({
        person_id: e.target.value
        });
    }

    onChangePersonName(e) {
        this.setState({
        person_name: e.target.value
        });
    }
    onChangePersonAge(e) {
        this.setState({
        person_age: e.target.value
        })  
    }
    onChangePersonSalary(e) {
        this.setState({
        person_salary: e.target.value
        });
    }
    onChangePersonAddress(e) {
        this.setState({
        person_address: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            person_id: this.state.person_id,
            person_name: this.state.person_name,
            person_age: this.state.person_age,
            person_salary: this.state.person_salary,
            person_address: this.state.person_address
        };
        axios.post('http://localhost:4000/user/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/index');
    }
 
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3 align="center">Update User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Add Id:  </label>
                        <input type="text" 
                        className="form-control"
                        value={this.state.person_id}
                        onChange={this.onChangePersonId}/>
                    </div>
                    <div className="form-group">
                        <label>Add Full Name: </label>
                        <input type="text" 
                        className="form-control"
                        value={this.state.person_name}
                        onChange={this.onChangePersonName}/>
                    </div>
                    <div className="form-group">
                        <label>Add Age: </label>
                        <input type="text" 
                        className="form-control"
                        value={this.state.person_age}
                        onChange={this.onChangePersonAge}/>
                    </div>
                    <div className="form-group">
                        <label>Add Salary: </label>
                        <input type="text" 
                        className="form-control"
                        value={this.state.person_salary}
                        onChange={this.onChangePersonSalary}/>
                    </div>
                    <div className="form-group">
                        <label>Add Address: </label>
                        <input type="text" 
                        className="form-control"
                        value={this.state.person_address}
                        onChange={this.onChangePersonAddress}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}