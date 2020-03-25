import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import {connect} from "react-redux";
import {logoutUser} from "../../actions/user"


export class Header extends Component {    
    render() {
    const { isAuthenticated, user } = this.props.user;
    const privateLinks = (
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-sm-2">
                        <li className='nav-item'> 
                        <button className = "btn btn-primary btn-sm" onClick={this.props.logoutUser} >Logout</button>
                        </li>  
                    </ul>
                </div>           
            )

    
    const publicLinks = (

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-sm-2">
                        <li className='nav-item'><Link to="/register" className="nav-link">Register</Link></li>
                        <li className='nav-item'><Link to="/login" className="nav-link">Login</Link></li>
                    </ul>
                </div>           
            )
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <a className="navbar-brand" href="#">Findspace Lead Manager</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {isAuthenticated ? privateLinks : publicLinks}                
            </nav>


            )
    }


}
const mapStateToProps = state => ({
    user: state.user
})
export default connect(mapStateToProps,{logoutUser})(Header)