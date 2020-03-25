import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/user';
import {Link, Redirect} from 'react-router-dom';

export class Register extends Component {
    state ={
        username:'',
        email: '',
        password:'',
        confirmed_passowrd: '',
    }
    onChange = event => this.setState({[event.target.name]: event.target.value});
    onSubmit = event => {
        event.preventDefault();
        const {username,email,password,confirmed_passowrd} = this.state;
        if (password==confirmed_passowrd) {
            const user  = {username,email,password};
            this.props.registerUser(user) 
        }
        else{
            console.log("your passwords don't match")
        }        
        
    }
    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
          }
        const {username,email,password,confirmed_passowrd} = this.state
        return (
            <div className='"card card-body mt-4 mb-4"'>
            <h1>Register</h1>
            <form onSubmit = {this.onSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" name="username" onChange={this.onChange} value ={username}></input>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control"  name="email" onChange={this.onChange} value ={email}></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"  name="password" onChange={this.onChange} value ={password}></input>
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control"  name="confirmed_passowrd" onChange={this.onChange} value ={confirmed_passowrd}></input>
                </div>
                <button type='submit' className = "btn btn-primary btn-sm">Register User</button>
                <p>
                Already have an account? <Link to="/login">Login</Link>
                </p> 
            </form>                    
            </div>            
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
  });
export default connect(mapStateToProps,{registerUser})(Register)
