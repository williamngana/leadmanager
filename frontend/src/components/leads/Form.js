import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLead } from '../../actions/leads';


export class Form extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        notes: '',        
    }

    static propTypes = {
        addLead : PropTypes.func.isRequired,
    }

    onChange = event => this.setState({[event.target.name]: event.target.value});
    onSubmit = event => {
        event.preventDefault();
        const {first_name,last_name,email,notes} = this.state;
        const lead  = {first_name,last_name,email,notes};
        this.props.addLead(lead)
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            notes: '', 
        }     
    }
    render() {
        const { first_name,last_name,email,notes } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
                <h1>Add Leads</h1>
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <label>Frist Names</label>
                        <input type="text" className="form-control" name="first_name" onChange={this.onChange} value ={first_name}></input>
                    </div>
                    <div className="form-group">
                        <label>Last Names</label>
                        <input type="text" className="form-control"  name="last_name" onChange={this.onChange} value ={last_name}></input>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control"  name="email" onChange={this.onChange} value ={email}></input>
                    </div>
                    <div className="form-group">
                        <label>Notes</label>
                        <input type="text" className="form-control" name="notes" onChange={this.onChange} value ={notes}></input>
                    </div>
                    <button type='submit' className = "btn btn-primary btn-sm">ADD LEAD</button>
                </form>
            </div>
            
        )
    }


}

export default connect(null, {addLead})(Form); 