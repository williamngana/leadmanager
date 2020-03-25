import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteLead, updateLead} from '../../actions/leads';
import { Accordion, Card} from 'react-bootstrap';



export class Lead extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        notes: '',  
        contacted: false,      
    }
    state = this.props.lead;

    static propTypes = {
        deleteLead: PropTypes.func.isRequired,
        updateLead: PropTypes.func.isRequired,
    };
    onChange = event => this.setState({[event.target.name]: event.target.value});
    handleChange = event =>  this.setState({contacted: !this.state.contacted});  
    onUpdate = event => {
        event.preventDefault();
        const {first_name,last_name,email,notes,contacted} = this.state;
        const lead  = {first_name,last_name,email,notes,contacted};
        this.props.updateLead(this.props.lead.id, lead)     
        //console.log(contacted)
    }

    render() {        
        const { id, first_name,last_name,email,notes,contacted } = this.state;
        return (
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={id}>
                        <div>
                            {first_name} {last_name}
                            <div className="text-right">
                                <label>Contacted</label>{' '}
                                <input type="checkbox" name="contacted" onChange={this.handleChange}  checked ={contacted}/>
                            </div>
                        </div>
                        
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={id}>
                        <Card.Body>
                            <form onSubmit = {this.onUpdate}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" name="first_name" onChange={this.onChange}  value ={first_name}></input>
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" name="last_name" onChange={this.onChange}  value ={last_name}></input>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" name="email" onChange={this.onChange}  value ={email}></input>
                                </div>
                                <div className="form-group">
                                    <label>Notes</label>
                                    <textarea className="form-control"  rows="3" name="notes" onChange={this.onChange}  value ={notes}></textarea>
                                </div>
                                <button className = "btn btn-danger btn-sm" onClick={this.props.deleteLead.bind(this,id)} >Delete</button>{'  '}
                                <button type="submit" className = "btn btn-primary btn-sm" >Save Changes</button>
                            </form>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>            
            </Accordion>
            
        );
    }


}
export default connect(null, { deleteLead, updateLead })(Lead);