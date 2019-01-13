import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('http://localhost:4000/user/delete/'+this.props.obj._id)
            .then(()=>{
                console.log('Deleted')
                this.props.refresh()
            })
            .catch(err => console.log(err))
    }
  render() {
    return (
        <tr>
            <td>
                {this.props.obj.person_id}
            </td>
            <td>
                {this.props.obj.person_name}
            </td>
            <td>
                {this.props.obj.person_age}
            </td>
            <td>
                {this.props.obj.person_salary}
            </td>
            <td>
                {this.props.obj.person_address}
            </td>
            <td>
                <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
            </td>
            <td>
                <button onClick={this.delete} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    );
  }
}

export default TableRow;