import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/user';
import {Link,Redirect} from 'react-router-dom';

export class Login extends Component {
    state ={
        username:'',
        password:'',
    }
    onChange = event => this.setState({[event.target.name]: event.target.value});
    onSubmit = event => {
        event.preventDefault();
        const {username,password} = this.state;
        const user  = {username,password};
        this.props.loginUser(user)
    }
    render() {
        const {username,password} = this.state
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
          }
        return (
            <div className="container">
            <div className='"card card-body mt-4 mb-4"'>
            <h1>Login</h1>
            <form onSubmit = {this.onSubmit}>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" name="username" onChange={this.onChange} value ={username}></input>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={this.onChange} value ={password}></input>
                </div>
                <button type='submit' className = "btn btn-primary btn-sm">Login</button>
                <p>
                <Link to="/register">Sign up</Link> for an account
                </p>  
            </form>            
            </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
  });
export default connect(mapStateToProps,{loginUser})(Login)
